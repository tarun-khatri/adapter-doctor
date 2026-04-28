'use strict';

const fs = require('fs');
const path = require('path');

function writeJson(outputDir, results, meta) {
  const outPath = path.join(outputDir, 'report.json');
  fs.writeFileSync(
    outPath,
    JSON.stringify({ meta, results }, null, 2)
  );
  return outPath;
}

module.exports = { writeJson };
