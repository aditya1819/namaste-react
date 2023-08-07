const jsonServer = require('json-server');
const mock = require('../data/mockhotels.json');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Add a custom route for /hotels
server.get('/hotels', (req, res) => {
  console.log('json-server :: /hotels');

  // Introduce a delay using setTimeout
  setTimeout(() => {
    console.log('json-server :: 2s Timeout completed');
    res.json(mock);
  }, 2000);
});

const router = jsonServer.router({});

server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Mock JSON Server is running on port ${PORT}`);
});
