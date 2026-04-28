'use strict';

const fs = require('fs');
const path = require('path');

const SEVERITY_RANK = { high: 3, medium: 2, low: 1 };

function rankResult(r) {
  if (!r.findings.length) return 0;
  return Math.max(...r.findings.map((f) => SEVERITY_RANK[f.severity] || 0));
}

function buildMarkdown(results, meta) {
  const flagged = results.filter((r) => r.findings.length > 0);
  flagged.sort((a, b) => rankResult(b) - rankResult(a) || a.adapter.name.localeCompare(b.adapter.name));

  const counts = {
    total: results.length,
    clean: results.length - flagged.length,
    THROWS: 0,
    TIMEOUT: 0,
    NON_ZERO_EXIT: 0,
    ZERO_TVL: 0,
    NO_TVL_BLOCK: 0,
    LEGACY_TVL_SIGNATURE: 0,
    MISSING_METHODOLOGY: 0,
  };
  for (const r of results) for (const f of r.findings) counts[f.code] = (counts[f.code] || 0) + 1;

  const lines = [];
  lines.push(`# Adapter Doctor scan — ${meta.scannedAt}`);
  lines.push('');
  lines.push(`Repo: \`${meta.repoPath}\` @ ${meta.repoCommit || 'HEAD'}`);
  lines.push(`Scanned: **${counts.total}** adapters · concurrency ${meta.concurrency} · timeout ${meta.timeoutMs / 1000}s`);
  lines.push(`Clean: **${counts.clean}** · Flagged: **${flagged.length}**`);
  lines.push('');
  lines.push('## Counts by check');
  lines.push('');
  lines.push('| Check | Count |');
  lines.push('|---|---:|');
  lines.push(`| THROWS / ERROR block | ${counts.THROWS} |`);
  lines.push(`| TIMEOUT | ${counts.TIMEOUT} |`);
  lines.push(`| NON_ZERO_EXIT | ${counts.NON_ZERO_EXIT} |`);
  lines.push(`| ZERO_TVL | ${counts.ZERO_TVL} |`);
  lines.push(`| NO_TVL_BLOCK | ${counts.NO_TVL_BLOCK} |`);
  lines.push(`| LEGACY_TVL_SIGNATURE | ${counts.LEGACY_TVL_SIGNATURE} |`);
  lines.push(`| MISSING_METHODOLOGY | ${counts.MISSING_METHODOLOGY} |`);
  lines.push('');

  // Group flagged by primary code
  const groups = new Map();
  for (const r of flagged) {
    const code = r.findings[0].code;
    if (!groups.has(code)) groups.set(code, []);
    groups.get(code).push(r);
  }

  // Order groups by severity
  const orderedCodes = ['THROWS', 'TIMEOUT', 'NON_ZERO_EXIT', 'ZERO_TVL', 'NO_TVL_BLOCK', 'LEGACY_TVL_SIGNATURE', 'MISSING_METHODOLOGY'];

  for (const code of orderedCodes) {
    const group = groups.get(code);
    if (!group || group.length === 0) continue;

    lines.push(`## ${code} — ${group.length} adapter${group.length === 1 ? '' : 's'}`);
    lines.push('');
    lines.push('| Adapter | Detail | Run time |');
    lines.push('|---|---|---:|');
    for (const r of group) {
      const detail = (r.findings[0].detail || '').replace(/\|/g, '\\|').slice(0, 200);
      const seconds = (r.runResult?.durationMs ? Math.round(r.runResult.durationMs / 1000) + 's' : '—');
      lines.push(`| \`${r.adapter.relativePath}\` | ${detail} | ${seconds} |`);
    }
    lines.push('');
  }

  if (flagged.length === 0) {
    lines.push('No adapters flagged. Nice clean repo!');
  }

  return lines.join('\n') + '\n';
}

function writeMarkdown(outputDir, results, meta) {
  const md = buildMarkdown(results, meta);
  const outPath = path.join(outputDir, 'report.md');
  fs.writeFileSync(outPath, md);
  return outPath;
}

module.exports = { writeMarkdown, buildMarkdown };
