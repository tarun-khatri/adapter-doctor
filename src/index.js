#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { findAdapters } = require('./walk');
const { runWithLimit } = require('./concurrency');
const { runAdapter } = require('./runners/runAdapter');
const { parseTestOutput } = require('./runners/parseOutput');
const { writeMarkdown } = require('./report/markdown');
const { writeJson } = require('./report/json');

const checks = [
  require('./checks/throws'),
  require('./checks/zeroTvl'),
  require('./checks/missingMethodology'),
  require('./checks/deprecatedSig'),
];

function parseArgs(argv) {
  const args = {
    command: null,
    repoPath: null,
    out: null,
    limit: null,
    concurrency: 4,
    timeoutMs: 120_000,
    only: null,
    skipRun: false,
  };

  let i = 0;
  if (argv[i] && !argv[i].startsWith('-')) args.command = argv[i++];

  for (; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--repo' || a === '-r') args.repoPath = argv[++i];
    else if (a === '--out' || a === '-o') args.out = argv[++i];
    else if (a === '--limit') args.limit = parseInt(argv[++i], 10);
    else if (a === '--concurrency' || a === '-c') args.concurrency = parseInt(argv[++i], 10);
    else if (a === '--timeout') args.timeoutMs = parseInt(argv[++i], 10) * 1000;
    else if (a === '--only') args.only = argv[++i].split(',').map((s) => s.trim());
    else if (a === '--skip-run') args.skipRun = true;
    else if (a === '--help' || a === '-h') {
      printHelp();
      process.exit(0);
    } else if (!args.repoPath && !a.startsWith('-')) {
      args.repoPath = a;
    }
  }
  return args;
}

function printHelp() {
  console.log(`adapter-doctor — audit DefiLlama adapters for silent failures

Usage:
  adapter-doctor scan <repo-path> [options]

Options:
  --repo, -r <path>       DefiLlama-Adapters repo (default: positional arg)
  --out, -o <dir>         Output directory for report.md / report.json (default: <cwd>/out)
  --limit <n>             Scan only first N adapters (alphabetical)
  --concurrency, -c <n>   Parallel test.js processes (default: 4)
  --timeout <s>           Per-adapter timeout in seconds (default: 120)
  --only <a,b,c>          Run only the named adapters (comma-separated)
  --skip-run              Skip dynamic runs; only do static checks (faster sanity pass)
  --help, -h              Show help
`);
}

function safeExecSync(cmd, opts) {
  try {
    return execSync(cmd, opts).toString().trim();
  } catch {
    return null;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.command || args.command !== 'scan') {
    printHelp();
    process.exit(args.command ? 1 : 0);
  }
  if (!args.repoPath) {
    console.error('error: missing <repo-path>');
    printHelp();
    process.exit(2);
  }

  const repoPath = path.resolve(args.repoPath);
  if (!fs.existsSync(path.join(repoPath, 'test.js'))) {
    console.error(`error: ${repoPath} doesn't look like DefiLlama-Adapters (no test.js)`);
    process.exit(2);
  }

  const outputDir = path.resolve(args.out || path.join(process.cwd(), 'out'));
  fs.mkdirSync(outputDir, { recursive: true });

  let adapters = findAdapters(repoPath);
  if (args.only && args.only.length) {
    const set = new Set(args.only);
    adapters = adapters.filter((a) => set.has(a.name));
  }
  if (args.limit && Number.isFinite(args.limit)) {
    adapters = adapters.slice(0, args.limit);
  }

  const repoCommit = safeExecSync('git rev-parse --short HEAD', { cwd: repoPath });
  const meta = {
    scannedAt: new Date().toISOString(),
    repoPath,
    repoCommit,
    concurrency: args.concurrency,
    timeoutMs: args.timeoutMs,
    totalAdapters: adapters.length,
    skipRun: args.skipRun,
  };

  console.log(`adapter-doctor scan`);
  console.log(`  repo:        ${repoPath}${repoCommit ? ' @ ' + repoCommit : ''}`);
  console.log(`  adapters:    ${adapters.length}`);
  console.log(`  concurrency: ${args.concurrency}`);
  console.log(`  out:         ${outputDir}`);
  if (args.skipRun) console.log('  mode:        static-only (no test.js runs)');
  console.log('');

  let completed = 0;
  const results = await runWithLimit(adapters, args.concurrency, async (adapter) => {
    let runResult = { exitCode: null, signal: null, timedOut: false, durationMs: 0, stdout: '', stderr: '' };
    let parsed = { hasError: false, errorMessage: null, tvlBreakdown: {}, totalUsd: null };

    if (!args.skipRun) {
      runResult = await runAdapter({
        adaptersRepoPath: repoPath,
        relativePath: adapter.relativePath,
        timeoutMs: args.timeoutMs,
      });
      parsed = parseTestOutput(runResult.stdout, runResult.stderr);
    }

    const findings = [];
    for (const c of checks) {
      try {
        const r = c.check({ adapter, runResult, parsed });
        if (r && r.length) findings.push(...r);
      } catch (err) {
        findings.push({ severity: 'low', code: 'CHECK_ERROR', detail: `${c.name}: ${err.message}` });
      }
    }

    completed += 1;
    const flag = findings.length ? '⚠ ' : '✓ ';
    const status = findings.length ? findings.map((f) => f.code).join(',') : 'clean';
    process.stdout.write(`[${completed}/${adapters.length}] ${flag}${adapter.name} — ${status}\n`);

    return {
      adapter,
      runResult: {
        exitCode: runResult.exitCode,
        signal: runResult.signal,
        timedOut: runResult.timedOut,
        durationMs: runResult.durationMs,
      },
      parsed: {
        hasError: parsed.hasError,
        errorMessage: parsed.errorMessage,
        totalUsd: parsed.totalUsd,
        chains: Object.keys(parsed.tvlBreakdown),
      },
      findings,
    };
  });

  const mdPath = writeMarkdown(outputDir, results, meta);
  const jsonPath = writeJson(outputDir, results, meta);

  const flagged = results.filter((r) => r.findings.length > 0).length;
  console.log('');
  console.log(`Done. Flagged ${flagged}/${results.length}.`);
  console.log(`Report: ${mdPath}`);
  console.log(`JSON:   ${jsonPath}`);
}

main().catch((err) => {
  console.error('adapter-doctor failed:', err);
  process.exit(1);
});
