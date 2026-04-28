'use strict';

// test.js prints a section like:
//   ------ TVL ------
//   ethereum                  1.07 M
//   borrowed                  196.63 k
//   ...
//   total                    1.83 M
//
// Some adapters also print "------ ERROR ------". We extract:
//   - hasError      : did the output contain "------ ERROR ------"?
//   - tvlBreakdown  : { chain: numericValue }  (parsed magnitudes)
//   - totalUsd      : numeric value of the "total" line, or null
//   - errorMessage  : trimmed first line of the ERROR section if present

const SUFFIX = { '': 1, k: 1e3, K: 1e3, M: 1e6, B: 1e9, T: 1e12 };

function parseAmount(str) {
  const m = String(str).trim().match(/^([\d.,]+)\s*([kKMBT]?)/);
  if (!m) return null;
  const n = parseFloat(m[1].replace(/,/g, ''));
  if (!Number.isFinite(n)) return null;
  const mult = SUFFIX[m[2]] ?? 1;
  return n * mult;
}

function parseTestOutput(stdout, stderr = '') {
  const result = {
    hasError: false,
    errorMessage: null,
    tvlBreakdown: {},
    totalUsd: null,
  };

  if (!stdout && !stderr) return result;

  // test.js prints "------ ERROR ------" to stdout but the actual exception
  // message goes to stderr (uncaught Error from Node). So look in stdout for
  // the marker, then pull the error text from stderr.
  const errorIdx = stdout ? stdout.indexOf('------ ERROR ------') : -1;
  if (errorIdx !== -1) result.hasError = true;

  const stderrTrim = (stderr || '').trim();
  if (stderrTrim) {
    // First non-empty line of stderr is usually the most informative.
    const stderrLines = stderrTrim.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const filtered = stderrLines.filter((l) => !/^at\s/.test(l) && !/^node:/.test(l));
    const msg = (filtered[0] && filtered.slice(0, 2).join(' | ')) || stderrLines[0] || null;
    if (msg) result.errorMessage = msg.slice(0, 300);
    // If stderr looks like a real Error stack, we treat the run as errored
    // even if stdout never printed the ERROR marker (rare but possible).
    if (!result.hasError && /^(Error|TypeError|RangeError|SyntaxError):/m.test(stderrTrim)) {
      result.hasError = true;
    }
  }

  if (errorIdx !== -1 && !result.errorMessage) {
    // Fallback: try to extract from the stdout block too.
    const errorBlock = stdout.slice(errorIdx);
    const lines = errorBlock.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    result.errorMessage = lines.slice(1, 3).join(' | ').slice(0, 300) || null;
  }

  if (!stdout) return result;

  const tvlIdx = stdout.lastIndexOf('------ TVL ------');
  if (tvlIdx === -1) return result;

  const tvlBlock = stdout.slice(tvlIdx);
  const lines = tvlBlock.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('-')) continue;

    // Lines look like "ethereum                  1.07 M"
    const m = line.match(/^(\S+)\s+([\d.,]+\s*[kKMBT]?)\s*$/);
    if (!m) continue;
    const key = m[1];
    const amount = parseAmount(m[2]);
    if (amount == null) continue;

    if (key === 'total') {
      result.totalUsd = amount;
    } else {
      result.tvlBreakdown[key] = amount;
    }
  }

  return result;
}

module.exports = { parseTestOutput, parseAmount };
