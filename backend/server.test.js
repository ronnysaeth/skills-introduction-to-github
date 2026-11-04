const assert = require('node:assert/strict');
const { test } = require('node:test');
const { createServer } = require('./server');

test('GET /api/hello returns the greeting and unknown paths return 404', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));

  const { port } = server.address();
  const baseUrl = `http://localhost:${port}`;
  const greetingResponse = await fetch(`${baseUrl}/api/hello`);
  assert.equal(greetingResponse.status, 200);
  assert.deepEqual(await greetingResponse.json(), {
    message: 'Hello, GitHub!',
  });

  const notFoundResponse = await fetch(`${baseUrl}/unknown`);
  assert.equal(notFoundResponse.status, 404);
  assert.deepEqual(await notFoundResponse.json(), { error: 'Not found' });
});
