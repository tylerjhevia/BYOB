const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

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


app.get('/api/v1/breweries', (request, response) => {
  database('breweries')
    .select()
    .then((breweries) => {
      response.status(200).json(breweries);
    })
    .catch((error) => {
      response.sendStatus(500).json({ error });
    });
});

app.get('/api/v1/beers', (request, response) => {
  database('beers')
    .select()
    .then((beers) => {
      response.status(200).json(beers);
    })
    .catch((error) => {
      response.sendStatus(500).json({ error });
    });
});

app.get('/api/v1/breweries/:id', (request, response) => {
  const { id } = request.params;

  database('breweries')
    .select()
    .where('id', id)
    .then((brewery) => {
      if (id !== num) {

      }
      else if (brewery.length === 0) {
        response.status(404).json({ error: `Could not find a brewery with that id: ${id}`})
      }

    })
})

module.exports = app;
