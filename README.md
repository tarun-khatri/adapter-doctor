# adapter-doctor

CLI that audits every adapter in [DefiLlama/DefiLlama-Adapters](https://github.com/DefiLlama/DefiLlama-Adapters) for silent failures, then writes a markdown + JSON report. Built so the team can spot adapters that are quietly broken — returning zero TVL, throwing on the latest block, using the deprecated SDK signature, or missing a `methodology` field — without having to look at each one by hand.

## Why

DefiLlama-Adapters has 4,600+ adapters. They drift. Protocols redeploy, RPCs change, helpers get updated. There's no central place to find the ones that have silently stopped working. This tool runs each adapter through `node test.js`, parses the result, and surfaces ranked findings.

Inspired by [DefiLlama/careers](https://github.com/DefiLlama/careers): *"if you identify something that could be improved you just go and improve it."*

## Checks (v0)

| Code | Severity | What it catches |
|---|---|---|
| `THROWS` | high | Adapter emits an `------ ERROR ------` block during `node test.js` (and stderr captures the exception message) |
| `TIMEOUT` | high | Adapter exceeded the per-run timeout (default 120s) |
| `NON_ZERO_EXIT` | high | `node test.js` exited non-zero without a parsed timeout |
| `ZERO_TVL` | medium | Adapter ran cleanly but reported `total = 0` across every chain |
| `NO_TVL_BLOCK` | medium | `node test.js` finished but never printed a `------ TVL ------` block |
| `LEGACY_TVL_SIGNATURE` | low | `tvl(timestamp, block, chainBlocks)` form instead of the modern `tvl(api)` |
| `MISSING_METHODOLOGY` | low | Adapter source has no `methodology:` field on `module.exports` |

## Usage

```bash
# Full dynamic scan (slow — every adapter spawns a real test.js)
node src/index.js scan /path/to/DefiLlama-Adapters --concurrency 6 --timeout 120

# Static-only sweep (fast — skips test runs, finds methodology / legacy-signature issues)
node src/index.js scan /path/to/DefiLlama-Adapters --skip-run

# Sample mode for iterating
node src/index.js scan /path/to/DefiLlama-Adapters --limit 50 --concurrency 4

# Run a specific subset
node src/index.js scan /path/to/DefiLlama-Adapters --only aave-v3,uniswap-v3,linx
```

Output goes to `out/report.md` (human) and `out/report.json` (machine, for follow-up automation).

## Implementation notes

- Uses `LLAMA_RUN_LOCAL=1` when invoking `test.js` so adapters whose folder names start with a digit or capital letter (which `test.js` normally rejects as input) can still be tested.
- Concurrency uses a manual semaphore in `src/concurrency.js`; default is 4 to avoid hammering RPCs.
- Static checks (`MISSING_METHODOLOGY`, `LEGACY_TVL_SIGNATURE`) read source files with regex; full-AST scanning is left for v1.
- `parseOutput.js` looks for the marker `------ ERROR ------` in stdout and pulls the actual stack from stderr (test.js writes them on different streams).

## Known limitations (v0)

- A flagged `THROWS` could be a transient RPC failure, not a real adapter bug. Re-run before opening a fix.
- A flagged `ZERO_TVL` could be a genuinely empty / abandoned protocol. Check `defillama.com/protocol/<name>` first.
- Static checks use regex; multi-line edge cases may slip past until v1 swaps in `@babel/parser`.

## Layout

```
src/
├── index.js                 CLI entry
├── walk.js                  enumerate projects/*/index.js
├── concurrency.js           semaphore for parallel runs
├── runners/
│   ├── runAdapter.js        spawn `node test.js <path>`, capture stdout/stderr/exit/duration
│   └── parseOutput.js       extract TVL block + error message from streams
├── checks/
│   ├── throws.js            high-severity dynamic check
│   ├── zeroTvl.js           medium-severity dynamic check
│   ├── missingMethodology.js   low-severity static check
│   └── deprecatedSig.js     low-severity static check
└── report/
    ├── markdown.js          human-readable report grouped by check
    └── json.js              machine-readable for automation
```

## Roadmap

- v1: full AST scan (replaces regex), retry logic for transient `THROWS`, "protocol active on DefiLlama" cross-check for `ZERO_TVL`
- v1: per-chain breakdown for the `THROWS` group (flag chains where the adapter is broken even when other chains run clean)
- v2: GitHub Action that scans daily, opens an issue with the diff vs yesterday's report
- v2: optional auto-fix PR for trivial classes (e.g., adding a `methodology` field with a stubbed sentence)

## License

MIT.
