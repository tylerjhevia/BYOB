const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
// const key = require("./key");
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || 'hops';
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

const checkAuth = (request, response, next) => {
  let token;

  if (!request.body.token && !request.query.token && !request.headers.authorization) {
    return response.status(403).json({ error: 'You must be authorized to hit this endpoint' });
  }

  if (request.body.token) {
    token = request.body.token;
  } else if (request.query.token) {
    token = request.query.token;
  } else {
    token = request.headers.authorization;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return response.status(403).json({ error: 'Token Invalid' });
    } else if (!decoded.appName || !decoded.email) {
      return response.status(400).json({ error: 'Missing Field' });
    } else if (request.body.admin === false) {
      return response.status(403).json({ error: 'No admin privileges' });
    }
  });
  next();
};

app.post('/api/v1/authenticate', (request, response) => {
  for (const keys of ['email', 'appName']) {
    if (!request.body[keys]) {
      return response.status(400).json({ error: 'Missing Keys' });
    }
  }

  const token = jwt.sign(request.body, secretKey, { expiresIn: '48h' });

  if (request.body.email.includes('@turing.io')) {
    return response.status(201).json(Object.assign({}, { token }, { admin: true }));
  }
  response.status(201).json(Object.assign({}, { token }, { admin: false }));
});

app.get('/api/v1/breweries', (request, response) => {
  if (request.query.location) {
    const { location } = request.query;
    return database('breweries')
      .select()
      .where('location', location)
      .then((breweries) => {
        breweries.length
          ? response.status(200).json(breweries)
          : response.status(404).json({
            error: `Could not find any breweries with location: ${location}`,
          });
      })
      .catch(error => response.status(500).json({ error }));
  }

  database('breweries')
    .select()
    .then((breweries) => {
      response.status(200).json(breweries);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/beers', (request, response) => {
  if (request.query.type) {
    const { type } = request.query;
    return database('beers')
      .select()
      .where('type', type)
      .then((beers) => {
        beers.length
          ? response.status(200).json(beers)
          : response.status(404).json({
            error: `Could not find any beers of type: ${type}. Check your format. `,
          });
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  }

  database('beers')
    .select()
    .then((beers) => {
      response.status(200).json(beers);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/breweries/:id', (request, response) => {
  const { id } = request.params;
  database('breweries')
    .select()
    .where('id', id)
    .then((brewery) => {
      brewery.length
        ? response.status(200).json(brewery[0])
        : response.status(404).json({ error: `Could not find a brewery with id: ${id}` });
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/beers/:breweryID', (request, response) => {
  const { breweryID } = request.params;
  database('beers')
    .select()
    .where('breweryID', breweryID)
    .then(beers => (beers.length ? response.status(200).json(beers) : response.sendStatus(404)))
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/breweries', checkAuth, (request, response) => {
  const requiredKeys = ['name', 'location', 'beerCount', 'year'];

  delete request.body.token;
  delete request.body.email;
  delete request.body.admin;
  delete request.body.appName;

  for (const keys of requiredKeys) {
    if (!request.body[keys]) {
      return response.status(400).json({ error: `Check your format. Missing key: ${keys}` });
    }
  }

  database('breweries')
    .insert(request.body, '*')
    .then(brewery => response.status(201).json(brewery[0]))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/beers', checkAuth, (request, response) => {
  const requiredKeys = ['name', 'brewery', 'type', 'breweryID'];

  delete request.body.token;
  delete request.body.email;
  delete request.body.admin;
  delete request.body.appName;

  for (const keys of requiredKeys) {
    if (!request.body[keys]) {
      return response.status(400).json({ error: `Check your format. Missing key: ${keys}` });
    }
  }

  database('beers')
    .insert(request.body, '*')
    .then((beer) => {
      response.status(201).json(beer[0]);
    })
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/breweries/:id', (request, response) => {
  database('breweries')
    .where('id', request.params.id)
    .update(
      {
        beerCount: request.body.beerCount,
      },
      '*')
    .then((update) => {
      if (!update.length) {
        response.status(404).json({
          error: `Cannot find a brewery with the id of ${request.params.id}`,
        });
      }
      response.status(200).json({ updatedBrewery: update[0] });
    })
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/beers/:id', (request, response) => {
  database('beers')
    .where('id', request.params.id)
    .update(
      {
        name: request.body.name,
      },
      '*')
    .then((update) => {
      if (!update.length) {
        response.status(404).json({
          error: `Cannot find a beer with the id of ${request.params.id}`,
        });
      }
      response.status(200).json({ updatedBeer: update[0] });
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/breweries/:id', checkAuth, (request, response) => {
  delete request.body.token;
  delete request.body.email;
  delete request.body.admin;
  delete request.body.appName;

  database('breweries')
    .del()
    .where('id', request.params.id)
    .then((length) => {
      console.log(length);
      return length > 0
        ? response.sendStatus(204)
        : response.status(422).send({
          error: `Nothing to delete with id of ${request.params.id}`,
        });
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/beers/:id', checkAuth, (request, response) => {
  delete request.body.token;
  delete request.body.email;
  delete request.body.admin;
  delete request.body.appName;

  database('beers')
    .del()
    .where('id', request.params.id)
    .then((length) => {
      console.log(length);
      return length > 0
        ? response.sendStatus(204)
        : response.status(422).send({
          error: `Nothing to delete with id of ${request.params.id}`,
        });
    })
    .catch(error => response.status(500).json({ error }));
});

module.exports = app;
