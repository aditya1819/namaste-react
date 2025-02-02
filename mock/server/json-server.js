const jsonServer = require('json-server');
const mock = require('../data/mockhotels.json');
const { readFileSync } = require('fs');
const path = require('path');
const { isBooleanObject } = require('util/types');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Add a custom route for /hotels
server.get('/hotels', (req, res) => {
  console.log('json-server :: /hotels');

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
            cloudinaryImageId: item.info.cloudinaryImageId,
            offerLabel: item.info.aggregatedDiscountInfoV3.header ?? ''
          }
        };
      })
    );
  }, 2000);
});

server.get('/hotel/:id', async (req, res) => {
  const id = req.params.id;

  const sortByCategory = req.query.sortByCategory ?? false;

  console.log(`Fetching data for hotel: ${id}`);

  let _path = __dirname.split('\\').slice(0, 4);
  _path = path.join(..._path, 'data', 'hoteldata', id);

  let data = [];
  try {
    data = await readFileSync(_path + '.json', 'utf8');

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
    let foodOptions = [];
    const foodIds = new Set();

    foodOptionsByCategory.forEach((foodOption) => {
      let items = foodOption.card.card.itemCards;
      if (items) {
        items = items.map((item) => {
          return { ...item, category: foodOption.card.card.title };
        });

        foodOptions.push(...items);
      }
    });

    foodOptions = foodOptions.filter((item) => {
      if (!foodIds.has(item.card.info.id)) {
        foodIds.add(item.card.info.id);
        return true;
      }
      return false;
    });

    data = { info, foodOptions };
  } catch (error) {
    console.error('Error while getting data:', error);
  }

  res.json(data);
});

const router = jsonServer.router({});

server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Mock JSON Server is running on port ${PORT}`);
});
