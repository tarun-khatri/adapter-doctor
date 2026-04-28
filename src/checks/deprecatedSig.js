'use strict';

// Static check: does the adapter still use the legacy positional signature
//   async function tvl(timestamp, block, chainBlocks)
//   async function tvl(_, block, chainBlocks)
// instead of the modern
//   async function tvl(api)
// Modern API gives access to api.call/multiCall/sumTokens etc. The legacy
// form still works through the SDK shim but loses ergonomics and is
// inconsistent.

const fs = require('fs');

const LEGACY_PATTERNS = [
  /\b(?:async\s+)?function\s+tvl\s*\(\s*(?:_|timestamp|ts|now)\s*,\s*(?:_|block|blockNumber)\s*,\s*(?:_|chainBlocks)/i,
  /\btvl\s*=\s*async\s*\(\s*(?:_|timestamp|ts|now)\s*,\s*(?:_|block|blockNumber)\s*,\s*(?:_|chainBlocks)/i,
];

function check({ adapter }) {
  let src;
  try {
    src = fs.readFileSync(adapter.absolutePath, 'utf8');
  } catch {
    return [];
  }

  for (const pattern of LEGACY_PATTERNS) {
    if (pattern.test(src)) {
      return [{
        severity: 'low',
        code: 'LEGACY_TVL_SIGNATURE',
        detail: 'tvl uses (timestamp, block, chainBlocks) form; modern adapters use tvl(api)',
      }];
    }
  }

  return [];
}

module.exports = { check, name: 'deprecatedSig' };
