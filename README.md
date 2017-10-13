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


## Registration
You can generate a new access token by visiting our [registration page](https://byob-db-th.herokuapp.com/). A valid email and app-name are required. Access tokens will expire after 48 hours of being generated. POST and DELETE requests require Admin access. Contact us for details. 

![BYOB-registration-page](https://i.imgur.com/VT38K9D.png)

## Endpoints

#### Brewery Endpoints

- **[`GET` breweries](https://github.com/tylerjhevia/BYOB/blob/master/documentation/breweries_endpoints/GET_breweries.md)**
- **[`GET` breweries/:id](https://github.com/tylerjhevia/BYOB/blob/master/documentation/breweries_endpoints/GET_breweries_id.md)**
- **[`POST` breweries](https://github.com/tylerjhevia/BYOB/blob/master/documentation/breweries_endpoints/POST_breweries.md)**
- **[`PATCH` breweries/:id](https://github.com/tylerjhevia/BYOB/blob/master/documentation/breweries_endpoints/PATCH_breweries_id.md)**
- **[`DELETE` breweries/:id](https://github.com/tylerjhevia/BYOB/blob/master/documentation/breweries_endpoints/DELETE_breweries_id.md)**

#### Beer Endpoints

- **[`GET` beers](https://github.com/tylerjhevia/BYOB/blob/master/documentation/beers_endpoints/GET%20beers.md)**
- **[`GET` beers/:breweryID](https://github.com/tylerjhevia/BYOB/blob/master/documentation/beers_endpoints/GET%20beers:id.md)**
- **[`POST` beers](https://github.com/tylerjhevia/BYOB/blob/master/documentation/beers_endpoints/POST%20beers.md)**
- **[`PATCH` beers/:id](https://github.com/tylerjhevia/BYOB/blob/master/documentation/beers_endpoints/PATCH%20beers:id.md)**

- **[`DELETE` beers/:id](https://github.com/tylerjhevia/BYOB/blob/master/documentation/beers_endpoints/DELETE%20beers:id.md)**

