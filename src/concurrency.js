'use strict';

function createSemaphore(limit) {
  let active = 0;
  const queue = [];

  function acquire() {
    return new Promise((resolve) => {
      const tryAcquire = () => {
        if (active < limit) {
          active += 1;
          resolve(release);
        } else {
          queue.push(tryAcquire);
        }
      };
      tryAcquire();
    });
  }

  function release() {
    active -= 1;
    const next = queue.shift();
    if (next) next();
  }

  return { acquire };
}

async function runWithLimit(items, limit, fn) {
  const sem = createSemaphore(limit);
  return Promise.all(
    items.map(async (item, idx) => {
      const release = await sem.acquire();
      try {
        return await fn(item, idx);
      } finally {
        release();
      }
    })
  );
}

module.exports = { runWithLimit };
