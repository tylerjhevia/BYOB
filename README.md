# BYOB API [![CircleCI](https://circleci.com/gh/tylerjhevia/BYOB.svg?style=svg)](https://circleci.com/gh/tylerjhevia/BYOB)
--
BYOB API provides access to information about Colorado breweries and beers with endpoints for GET, POST, PATCH, and DELETE. This API follows [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) principles and uses [JSON Web Tokens](https://jwt.io/) for authentication and authorization. 

The API contains two tables with access to `breweries` and `beers` and returns all data in JSON format. 

| **Breweries**        | **Beers**            |
| :------------------: | :------------------: |
| Name                 | Name                 |
| Location             | Type                 |
| Beer Count           | Brewery              |
| Year                 | Brewery ID           |


##Registration
You can generate a new access token by visiting our [registration page](https://byob-db-th.herokuapp.com/). A valid email and app-name are required. Access tokens will expire after 48 hours of being generated. POST and DELETE requests require Admin access. Contact us for details. 

![BYOB-registration-page](https://i.imgur.com/VT38K9D.png)

##Endpoints

####Brewery Endpoints

- **[`GET` breweries]()**
- **[`GET` breweries/:id]()**
- **[`POST` breweries]()**
- **[`PATCH` breweries/:id]()**
- **[`DELETE` breweries/:id]()**

####Beer Endpoints

- **[`GET` beers]()**
- **[`GET` beers/:breweryID]()**
- **[`POST` beers]()**
- **[`PATCH` beers/:id]()**
- **[`DELETE` beers/:id]()**