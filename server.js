const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.env.PORT || 3000);
app.locals.title = "BYOB";

app.listen(app.get("port"), () => {
  console.log(`${app.locals.title} is running on ${app.get("port")}.`);
});

app.get("/api/v1/breweries", (request, response) => {
  if (request.query.location) {
    const { location } = request.query;
    return database("breweries")
      .select()
      .where("location", location)
      .then(breweries => {
        breweries.length
          ? response.status(200).json(breweries)
          : response.status(404).json({
              error: `Could not find any breweries with location: ${location}`
            });
      })
      .catch(error => response.sendStatus(500).json({ error }));
  }

  database("breweries")
    .select()
    .then(breweries => {
      response.status(200).json(breweries);
    })
    .catch(error => {
      response.sendStatus(500).json({ error });
    });
});

app.get("/api/v1/beers", (request, response) => {
  if (request.query.type) {
    const { type } = request.query;
    return database("beers")
      .select()
      .where('type', type)
      .then(beers => {
        beers.length
        ? response.status(200).json(beers)
        : response.status(404).json({ error: `Could not find any beers of type: ${type}. Check your format. ` })
      })
      .catch(error => {
        response.sendStatus(500).json({ error });
      });
  }

  database("beers")
    .select()
    .then(beers => {
      response.status(200).json(beers);
    })
    .catch(error => {
      response.sendStatus(500).json({ error });
    });
});

app.get("/api/v1/breweries/:id", (request, response) => {
  const { id } = request.params;
  database("breweries")
    .select()
    .where("id", id)
    .then(brewery => {
      brewery.length
        ? response.status(200).json(brewery[0])
        : response
            .status(404)
            .json({ error: `Could not find a brewery with id: ${id}` });
    })
    .catch(error => {
      response.sendStatus(500).json({ error });
    });
});

app.get("/api/v1/beers/:breweryID", (request, response) => {
  const { breweryID } = request.params;
  database("beers")
    .select()
    .where("breweryID", breweryID)
    .then(beers => {
      beers.length
        ? response.status(200).json(beers)
        : response
            .status(404)
            .json({ error: `Could not find any beers with breweryID: ${id}` });
    })
    .catch(error => {
      response.sendStatus(500).json({ error });
    });
});


app.post('/api/v1/breweries', (request, response) => {
  const requiredKeys = ['name', 'location', 'beerCount', 'year'];

  for (let keys of requiredKeys) {
    if (!request.body[keys]) {
      return response.status(400).json({ error: `Check your format. Missing key: ${keys}` })
    }
  }

  database('breweries')
    .insert(request.body, '*')
    .then(brewery => response.status(201).json(brewery[0]))
    .catch(error => response.status(500).json({ error }));
})

app.post('/api/v1/beers', (request, response) => {
  const requiredKeys = ['name', 'brewery', 'type', 'breweryID'];

  for (let keys of requiredKeys) {
    if (!request.body[keys]) {
      return response.status(400).json({ error: `Check your format. Missing key: ${keys}` })
    }
  }

  database('beers')
    .insert(request.body, '*')
    .then(beer => {
    response.status(201).json(beer[0])
  })
    .catch(error => response.status(500).json({ error }));
})

app.patch('/api/v1/breweries/:id', (request, response) => {
  database('breweries')
    .where('id', request.params.id)
    .update({
      beerCount: request.body.beerCount
    }, '*')
    .then((update) => {
      if (!update.length) {
        response.status(404).json({ error: `Cannot find a brewery with the id of ${request.params.id}`})
      }
      response.status(200).json({ updatedBrewery: update[0] })
    })
    .catch((error) => response.status(500).json({ error }))
  })

app.patch('/api/v1/breweries/:id', (request, response) => {

})
module.exports = app;
