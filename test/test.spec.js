const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");

describe("test", () => {
  it("should run tests", () => {
    let neat = true;
    neat.should.equal(true);
  });
});
