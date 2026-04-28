'use strict';

// Static check: does the adapter source declare a `methodology:` field
// somewhere in its module.exports? Many older adapters omit this and the
// DefiLlama UI loses helpful copy as a result.

const fs = require('fs');

function check({ adapter }) {
  let src;
  try {
    src = fs.readFileSync(adapter.absolutePath, 'utf8');
  } catch {
    return [];
  }

  // Strip line comments and block comments to avoid false negatives where
  // "methodology:" only appears in commented-out code.
  const stripped = src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');

  if (/(^|[^A-Za-z_])methodology\s*:/m.test(stripped)) return [];

  return [{
    severity: 'low',
    code: 'MISSING_METHODOLOGY',
    detail: 'no methodology field found in adapter source',
  }];
}

module.exports = { check, name: 'missingMethodology' };
