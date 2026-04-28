'use strict';

// Flags adapters whose `node test.js` invocation:
//   - exits non-zero (excluding clean timeout)
//   - prints "------ ERROR ------"
//   - times out (RPC dead, infinite loop, etc.)

function check({ runResult, parsed }) {
  const findings = [];

  if (runResult.timedOut) {
    findings.push({
      severity: 'high',
      code: 'TIMEOUT',
      detail: `test.js exceeded ${Math.round(runResult.durationMs / 1000)}s timeout`,
    });
  }

  if (parsed.hasError) {
    findings.push({
      severity: 'high',
      code: 'THROWS',
      detail: parsed.errorMessage || 'adapter emitted ------ ERROR ------ block',
    });
  }

  if (!runResult.timedOut && runResult.exitCode !== 0 && runResult.exitCode !== null) {
    findings.push({
      severity: 'high',
      code: 'NON_ZERO_EXIT',
      detail: `exit code ${runResult.exitCode}`,
    });
  }

  return findings;
}

module.exports = { check, name: 'throws' };
