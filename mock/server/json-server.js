const jsonServer = require('json-server');
const mock = require('../data/mockhotels.json');
const { readFile } = require('fs');
const path = require('path');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Add a custom route for /hotels
server.get('/hotels', (req, res) => {
  console.log('json-server :: /hotels');

  const data =
    // Introduce a delay using setTimeout
    setTimeout(() => {
      console.log('json-server :: 2s Timeout completed');
      res.json(
        mock.map((item) => {
          return {
            info: {
              id: item.info.id,
              name: item.info.name,
              avgRating: item.info.avgRating,
              cuisines: item.info.cuisines,
              sla: item.info.sla,
              cloudinaryImageId: item.info.cloudinaryImageId
            }
          };
        })
      );
    }, 2000);
});

server.get('/hotel/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);

  let data;

  let _path = __dirname.split('\\').slice(0, 4);
  _path = path.join(..._path, 'data', 'hoteldata', id);
  console.log(_path);

  // Read the JSON file
  readFile(_path + '.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    try {
      // Parse the JSON data
      data = JSON.parse(data);
      let info = data.data.cards[0].card.card.info;

      info = {
        id: info.id,
        name: info.name,
        city: info.city,
        cloudinaryImageId: info.cloudinaryImageId,
        areaName: info.areaName,
        cost: info.costForTwoMessage,
        cuisines: info.cuisines,
        avgRating: info.avgRating,
        veg: info.veg,
        feesDetails: info.feesDetails,
        sla: {
          deliveryTime: info.sla.deliveryTime
        }
      };

      let foodOptionsByCategory =
        data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;

      foodOptionsByCategory = foodOptionsByCategory.slice(1);

      // add category in data object instead of key
      const foodOptions = [];

      foodOptionsByCategory.forEach((foodOption) => {
        let items = foodOption.card.card.itemCards;
        if (items) {
          items = items.map((item) => {
            return { ...item, category: foodOption.card.card.title };
          });

          foodOptions.push(...items);
        }
      });

      data = { info, foodOptions };
      console.log(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

  res.json(data);
});

const router = jsonServer.router({});

server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Mock JSON Server is running on port ${PORT}`);
});
