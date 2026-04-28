'use strict';

const { spawn } = require('child_process');
const path = require('path');

function runAdapter({ adaptersRepoPath, relativePath, timeoutMs = 120_000 }) {
  return new Promise((resolve) => {
    const start = Date.now();
    const child = spawn('node', ['test.js', relativePath], {
      cwd: adaptersRepoPath,
      // LLAMA_RUN_LOCAL=1 bypasses test.js's "module must start with lowercase" guard,
      // letting us run adapters whose folder begins with a digit or uppercase letter.
      // NO_COLOR keeps stdout parseable.
      env: { ...process.env, NO_COLOR: '1', LLAMA_RUN_LOCAL: '1' },
      shell: false,
    });

    let stdout = '';
    let stderr = '';
    let killed = false;

    const killTimer = setTimeout(() => {
      killed = true;
      child.kill('SIGKILL');
    }, timeoutMs);

    child.stdout.on('data', (d) => {
      stdout += d.toString();
      if (stdout.length > 400_000) stdout = stdout.slice(-200_000);
    });
    child.stderr.on('data', (d) => {
      stderr += d.toString();
      if (stderr.length > 200_000) stderr = stderr.slice(-100_000);
    });

    child.on('close', (code, signal) => {
      clearTimeout(killTimer);
      resolve({
        exitCode: code,
        signal,
        timedOut: killed,
        durationMs: Date.now() - start,
        stdout,
        stderr,
      });
    });

    child.on('error', (err) => {
      clearTimeout(killTimer);
      resolve({
        exitCode: -1,
        signal: null,
        timedOut: false,
        durationMs: Date.now() - start,
        stdout,
        stderr: stderr + '\n[spawn error] ' + err.message,
      });
    });
  });
}

module.exports = { runAdapter };
