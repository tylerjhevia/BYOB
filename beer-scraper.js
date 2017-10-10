const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
const fs = require("fs");

nightmare
  .goto("https://www.ratebeer.com/brewers/105-west-brewing-company/25013/")
  .wait("body")
  //   .click("tbody tr td a")
  .evaluate(() => {
    const beerInfo = [];
    let breweryName = document.querySelector("h1").innerText;
    let beerTable = document.querySelector("tbody");
    let beers = beerTable.querySelectorAll("tr");

    for (let k = 0; k < beers.length; k++) {
      let beerName = beers[k].querySelector("a").innerText;
      let beerType = beers[k].querySelector("span").innerText;

      beerInfo.push({ breweryName, beerName, beerType });
    }
    return beerInfo;
  })
  .end()
  .then(res => {
    console.log("one", res);
    let output = JSON.stringify(res);
    fs.writeFile(`./${res[0].breweryName}.json`, output, "utf8", err => {
      if (err) {
        return console.error(err);
      }
    });
  })
  .catch(error => console.log(error));
