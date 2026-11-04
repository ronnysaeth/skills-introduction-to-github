const http = require('node:http');

function createServer() {
  return http.createServer((request, response) => {
    const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;

    if (request.method === 'GET' && pathname === '/api/hello') {
      response.writeHead(200, {
        'content-type': 'application/json; charset=utf-8',
      });
      response.end(JSON.stringify({ message: 'Hello, GitHub!' }));
      return;
    }

    response.writeHead(404, {
      'content-type': 'application/json; charset=utf-8',
    });
    response.end(JSON.stringify({ error: 'Not found' }));
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  createServer().listen(port, () => {
    console.log(`Hello GitHub API listening on http://localhost:${port}`);
  });
}

module.exports = { createServer };
