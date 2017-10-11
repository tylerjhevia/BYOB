const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");
const environment = process.env.NODE_ENV || "test";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

chai.use(chaiHttp);

describe("test", () => {
  it("should run tests", () => {
    let neat = true;
    neat.should.equal(true);
  });
});

describe("API routes", () => {
  beforeEach(done => {
    database.migrate
      .rollback()
      .then(() => database.migrate.latest())
      .then(() => done())
      .catch(error => console.log(error));
  });

  beforeEach(done => {
    database.seed
      .run()
      .then(() => {
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  describe("GET /api/v1/breweries", () => {
    it("should fetch all breweries", done => {
      chai.request(server).get("/api/v1/breweries").end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a("array");
        response.body.length.should.equal(2);
        response.body[0].should.have.property("name");
        response.body[0].name.should.be.a("string");
        response.body[0].should.have.property("location");
        response.body[0].location.should.be.a("string");
        response.body[0].should.have.property("beerCount");
        response.body[0].beerCount.should.be.a("number");
        response.body[0].should.have.property("year");
        response.body[0].year.should.be.a("number");
        response.body[0].should.have.property("id");
        response.body[0].id.should.be.a("number");
        response.body[0].should.have.property("created_at");
        response.body[0].created_at.should.be.a("string");
        response.body[0].should.have.property("updated_at");
        response.body[0].updated_at.should.be.a("string");
        done();
      });
    });
  });

  describe("GET /api/v1/beers", () => {
    it("should fetch all beers", done => {
      chai.request(server).get("/api/v1/beers").end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a("array");
        response.body.length.should.equal(77);
        response.body[0].should.have.property("name");
        response.body[0].name.should.be.a("string");
        response.body[0].should.have.property("type");
        response.body[0].type.should.be.a("string");
        response.body[0].should.have.property("brewery");
        response.body[0].brewery.should.be.a("string");
        response.body[0].should.have.property("breweryID");
        response.body[0].breweryID.should.be.a("number");
        response.body[0].should.have.property("id");
        response.body[0].id.should.be.a("number");
        response.body[0].should.have.property("created_at");
        response.body[0].created_at.should.be.a("string");
        response.body[0].should.have.property("updated_at");
        response.body[0].updated_at.should.be.a("string");
        done();
      });
    });
  });
});
