const beers = require("../../../test-beer-data");
const breweries = require("../../../test-brewery-data");

exports.seed = (knex, Promise) => {
  return knex("beers")
    .del()
    .then(() => knex("breweries").del())
    .then(() => {
      let breweryPromises = [];

      breweries.forEach(brewery =>
        breweryPromises.push(createBrewery(knex, brewery))
      );
      return Promise.all(breweryPromises);
    })
    .then(breweryID => {
      let breweryPromises = [];

      beers.forEach(beer => {
        breweryPromises.push(
          createBeer(knex, {
            name: beer["beerName"],
            brewery: beer["breweryName"],
            type: beer["beerType"],
            breweryID: knex
              .select("id")
              .from("breweries")
              .where("name", beer["breweryName"])
          })
        );
      });
      return Promise.all(breweryPromises);
    })
    .then(() => {
      console.log("Seeding is complete.");
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

const createBrewery = (knex, brewery) => {
  return knex("breweries").insert({
    name: brewery.name,
    location: brewery.location,
    beerCount: parseInt(brewery.numOfBeers),
    year: parseInt(brewery.yearFounded)
  });
};

const createBeer = (knex, beer) => {
  return knex("beers").insert(beer);
};
