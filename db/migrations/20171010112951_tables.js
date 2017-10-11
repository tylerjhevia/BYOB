exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("breweries", table => {
      table.increments("id").primary();
      table.string("name");
      table.string("location");
      table.integer("beerCount");
      table.integer("year");

      table.timestamps(true, true);
    }),

    knex.schema.createTable("beers", table => {
      table.increments("id").primary();
      table.string("name");
      table.string("brewery");
      table.string("type");
      table.integer("breweryID");
      table.foreign("breweryID").references("breweries.id").onDelete("cascade");

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("beers"),
    knex.schema.dropTable("breweries")
  ]);
};
