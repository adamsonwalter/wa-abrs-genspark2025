const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: 'build',
    rewrites: [
      { source: '**/*', destination: '/index.html' }
    ]
  });
});

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`Retragreen Presentation server running on port ${port}`);
  console.log(`Access at http://localhost:${port}`);
});