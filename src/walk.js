'use strict';

const fs = require('fs');
const path = require('path');

const SKIP_DIRS = new Set([
  'helper',
  '_template',
  '_test',
  '__mocks__',
  '__tests__',
  'node_modules',
]);

function findAdapters(adaptersRepoPath) {
  const projectsDir = path.join(adaptersRepoPath, 'projects');
  if (!fs.existsSync(projectsDir)) {
    throw new Error(`projects/ not found at ${projectsDir}. Pass the DefiLlama-Adapters root.`);
  }

  const adapters = [];
  for (const entry of fs.readdirSync(projectsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (SKIP_DIRS.has(entry.name)) continue;
    if (entry.name.startsWith('.')) continue;

    const adapterPath = path.join(projectsDir, entry.name, 'index.js');
    if (fs.existsSync(adapterPath)) {
      adapters.push({
        name: entry.name,
        relativePath: path.posix.join('projects', entry.name, 'index.js'),
        absolutePath: adapterPath,
      });
    }
  }
  return adapters;
}

module.exports = { findAdapters };
