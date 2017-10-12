const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");
const environment = process.env.NODE_ENV || "test";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

let adminToken;
let nonAdminToken;

const makeToken = (email, appName) => {
  chai
    .request(server)
    .post("/api/v1/authenticate")
    .send({
      email: email,
      appName: appName
    })
    .end((error, response) => {
      return response.body.admin
        ? (adminToken = response.body)
        : (nonAdminToken = response.body);
      done();
    });
};

chai.use(chaiHttp);

describe("test", () => {
  it("should run tests", () => {
    let neat = true;
    neat.should.equal(true);
  });
});

describe("DOM", () => {
  it("should display the home page", done => {
    chai.request(server).get("/").end((error, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.text.exists;
      done();
    });
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
    makeToken("david", "cool app");
    makeToken("tyler@turing.io", "Awesome");
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
        response.body.length.should.equal(3);
        response.body
          .filter(brewery => brewery.name === "105 West Brewing Company")
          .length.should.equal(1);
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

  describe("GET /api/v1/breweries/?location", () => {
    it("should fetch breweries based on location", done => {
      chai
        .request(server)
        .get("/api/v1/breweries/?location=Castle Rock")
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a("array");
          response.body.length.should.equal(2);
          response.body
            .every(brewery => brewery.location === "Castle Rock")
            .should.equal(true);
          done();
        });
    });

    it("should return a 404 if no breweries were found", done => {
      chai
        .request(server)
        .get("/api/v1/breweries/?location=Narnia")
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.error.should.equal(
            "Could not find any breweries with location: Narnia"
          );
          done();
        });
    });
  });

  describe("GET /api/v1/breweries/:id", (request, response) => {
    it("should fetch a brewery by ID", done => {
      chai.request(server).get("/api/v1/breweries/1").end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a("object");
        response.body.id.should.equal(1);
        response.body.name.should.equal("105 West Brewing Company");
        response.body.location.should.equal("Castle Rock");
        response.body.beerCount.should.equal(20);
        response.body.year.should.equal(2015);
        done();
      });
    });

    it("should return a 404 if no breweries with an ID are found", done => {
      chai.request(server).get("/api/v1/breweries/10").end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.error.should.equal(
          "Could not find a brewery with id: 10"
        );
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
        response.body.length.should.equal(101);
        response.body
          .filter(beer => beer.name === "12 Degree Pink Panther")
          .length.should.equal(1);
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

    it("should return all the beers of a type", done => {
      chai
        .request(server)
        .get("/api/v1/beers?type=Belgian Ale")
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.length.should.equal(13);
          response.body[0].type.should.equal("Belgian Ale");
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
          response.body
            .filter(beer => beer.type !== "Belgian Ale")
            .length.should.equal(0);
          done();
        });
    });

    it("should return a 404 if no beers of type were found", done => {
      chai
        .request(server)
        .get("/api/v1/beers?type=Tylers uber duber special beer")
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.error.should.equal(
            "Could not find any beers of type: Tylers uber duber special beer."
          );
          done();
        });
    });

    it("should return all beers of a given brewery id", done => {
      chai.request(server).get("/api/v1/beers/1").end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a("array");
        response.body.length.should.equal(20);
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
        response.body
          .filter(beer => beer.breweryID !== 1)
          .length.should.equal(0);
        response.body
          .filter(beer => beer.name === "105 West Berliner Weisse")
          .length.should.equal(1);
        done();
      });
    });

    it("should return a 404 if no beers of a brewery were found", done => {
      chai.request(server).get("/api/v1/beers/10").end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe("POST /api/v1/authenticate", () => {
    it("should return an object with a token and admin equal to false", done => {
      chai
        .request(server)
        .post("/api/v1/authenticate")
        .send({
          email: "tyl@er",
          appName: "relyt"
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.have.property("token");
          response.body.token.should.be.a("string");
          response.body.should.have.property("admin");
          response.body.admin.should.be.a("boolean");
          response.body.admin.should.equal(false);
          done();
        });
    });

    it("should return an object with a token and admin equal to true", done => {
      chai
        .request(server)
        .post("/api/v1/authenticate")
        .send({
          email: "tyl@turing.io",
          appName: "relyt"
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.have.property("token");
          response.body.token.should.be.a("string");
          response.body.should.have.property("admin");
          response.body.admin.should.be.a("boolean");
          response.body.admin.should.equal(true);
          done();
        });
    });

    it("should not return an object if missing input and have a message", done => {
      chai
        .request(server)
        .post("/api/v1/authenticate")
        .send({
          email: "",
          appName: "relyt"
        })
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.json;
          response.body.error.should.equal("Missing Keys");
          done();
        });
    });
  });

  describe("POST /api/v1/breweries", () => {
    it("should add a new brewery to database", done => {
      chai.request(server).get("/api/v1/breweries").end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(3);
      });

      chai
        .request(server)
        .post("/api/v1/breweries")
        .set("Authorization", adminToken)
        .send({
          name: "Tyler's Beer Kingdom",
          location: "Port Charlotte",
          beerCount: 420,
          year: 1993,
          email: "tyler@turing.io",
          appName: "Awesome",
          token: adminToken.token,
          admin: adminToken.admin
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.body.id.should.equal(4);
          response.body.name.should.equal("Tyler's Beer Kingdom");
          response.body.location.should.equal("Port Charlotte");
          response.body.beerCount.should.equal(420);
          response.body.year.should.equal(1993);
          done();
        });

      chai.request(server).get("/api/v1/breweries").end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(4);
      });
    });

    it("should not add a new brewery to database if admin is false", done => {
      chai.request(server).get("/api/v1/breweries").end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(3);
      });

      chai
        .request(server)
        .post("/api/v1/breweries")
        .set("Authorization", nonAdminToken)
        .send({
          name: "Tyler's Beer Kingdom",
          location: "Port Charlotte",
          beerCount: 420,
          year: 1993,
          email: "tyler@turing.io",
          appName: "Awesome",
          token: nonAdminToken.token,
          admin: nonAdminToken.admin
        })
        .end((error, response) => {
          console.log(response.status);
          response.should.have.status(403);
          response.should.be.json;
          response.body.error.should.equal("No admin privileges");
          done();
        });

      chai.request(server).get("/api/v1/breweries").end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(3);
      });
    });

    it("should return an error message if request body is missing required keys", done => {
      chai
        .request(server)
        .post("/api/v1/breweries")
        .set("Authorization", adminToken)
        .send({
          name: "Tyler's Beer Kingdom",
          location: "Port Charlotte",
          year: 1993,
          email: "tyler@turing.io",
          appName: "Awesome",
          token: adminToken.token,
          admin: adminToken.admin
        })
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.json;
          response.body.error.should.equal(
            "Check your format. Missing key: beerCount"
          );
          done();
        });
    });
  });

  describe("POST /api/v1/beers", () => {
    it("should add a new beer to database", done => {
      chai.request(server).get("/api/v1/beers").end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(101);
      });

      chai
        .request(server)
        .post("/api/v1/beers")
        .set("Authorization", adminToken)
        .send({
          name: "Fun beer",
          brewery: "105 West Brewing Company",
          breweryID: 1,
          type: "beer",
          email: "tyler@turing.io",
          appName: "Awesome",
          token: adminToken.token,
          admin: adminToken.admin
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.body.id.should.equal(102);
          response.body.name.should.equal("Fun beer");
          response.body.brewery.should.equal("105 West Brewing Company");
          response.body.breweryID.should.equal(1);
          response.body.type.should.equal("beer");
          done();
        });

      chai.request(server).get("/api/v1/beers").end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(101);
      });
    });

    it("should not add a new beer to database if admin is false", done => {
      chai.request(server).get("/api/v1/breweries").end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(101);
      });

      chai
        .request(server)
        .post("/api/v1/breweries")
        .set("Authorization", nonAdminToken)
        .send({
          name: "Fun beer",
          brewery: "105 West Brewing Company",
          breweryID: 1,
          type: "beer",
          email: "tyler",
          appName: "Awesome",
          token: nonAdminToken.token,
          admin: nonAdminToken.admin
        })
        .end((error, response) => {
          response.should.have.status(403);
          response.should.be.json;
          response.body.error.should.equal("No admin privileges");
          done();
        });

      chai.request(server).get("/api/v1/beers").end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(101);
      });
    });

    it("should return an error message if request body is missing required keys", done => {
      chai
        .request(server)
        .post("/api/v1/beers")
        .set("Authorization", adminToken)
        .send({
          name: "Fun beer",
          breweryID: 1,
          type: "beer",
          email: "tyler@turing.io",
          appName: "Awesome",
          token: adminToken.token,
          admin: adminToken.admin
        })
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.json;
          response.body.error.should.equal(
            "Check your format. Missing key: brewery"
          );
          done();
        });
    });
  });

  describe('PATCH /api/v1/breweries/:id', () => {
    it('should patch a brewery with a specific id', (done) => {
      chai.request(server)
        .patch('/api/v1/breweries/1')
        .send({
          beerCount: 0
        })
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.updatedBrewery.should.be.a('object');
          response.body.updatedBrewery.beerCount.should.equal(0);
          done();
        })

        chai.request(server)
          .get('/api/v1/breweries/1')
          .end((error, response) => {
            response.body[0].beerCount.should.equal(0)
            done()
          })
    })

    it('should return a 404 status if id cannot be found', (done) => {
      chai.request(server)
        .patch('/api/v1/breweries/10')
        .send({
          beerCount: 0
        })
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.error.should.equal('Cannot find a brewery with the id of 10');
          done();
        })
    })

    it('should return a 500 status if wrong key value pair', (done) => {
      chai.request(server)
        .patch('/api/v1/breweries/10')
        .send({
          wrongKey: 'Wrong Value'
        })
        .end((error, response) => {
          response.should.have.status(500);
          response.should.be.json;
          done();
        })
    })
  })

  describe('PATCH /api/v1/beers/:id', () => {
    it('should patch a beer with a specific id', (done) => {
      chai.request(server)
        .patch('/api/v1/beers/1')
        .send({
          name: 'Tylers SWEET ACTION beer'
        })
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.updatedBeer.should.be.a('object');
          response.body.updatedBeer.name.should.equal('Tylers SWEET ACTION beer');
          done();
        })
    })

    it('should return a 404 status if id cannot be found', (done) => {
      chai.request(server)
        .patch('/api/v1/beers/200')
        .send({
          name: 'Tylers SWEET ACTION beer'
        })
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.error.should.equal('Cannot find a beer with the id of 200');
          done();
        })
    })

    it('should return a 500 status if wrong key value pair', (done) => {
      chai.request(server)
        .patch('/api/v1/beers/10')
        .send({
          wrongKey: 'Wrong Value'
        })
        .end((error, response) => {
          response.should.have.status(500);
          response.should.be.json;
          done();
        })
    })
  })


});

after(() => {
  process.exit();
});
