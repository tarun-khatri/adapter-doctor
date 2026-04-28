'use strict';

// Flags adapters that ran cleanly but produced totalUsd of 0 (or no parseable
// total). Skipped if the run already errored or timed out (those are caught
// by the throws check). Does NOT flag legitimately empty / disabled adapters
// that throw deliberately.

function check({ runResult, parsed }) {
  if (runResult.timedOut) return [];
  if (parsed.hasError) return [];
  if (runResult.exitCode !== 0) return [];

  if (parsed.totalUsd === null) {
    return [{
      severity: 'medium',
      code: 'NO_TVL_BLOCK',
      detail: 'test.js completed but did not print a TVL block',
    }];
  }

  if (parsed.totalUsd === 0) {
    return [{
      severity: 'medium',
      code: 'ZERO_TVL',
      detail: 'total reported as 0 across all chains',
    }];
  }

  return [];
}

module.exports = { check, name: 'zeroTvl' };
