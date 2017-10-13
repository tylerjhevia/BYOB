# Breweries Endpoint

```
POST breweries
```

## Description

Create a new brewery in the database. Admin access required.

***

## Requires authentication

- A valid [JSON Web Token](https://jwt.io/) is required in order to access this endpoint.
  - Token can be sent in the following formats:
    - **HTTP Request Header**
    - **HTTP Request Body**
    - **HTTP URL Query String**
- A registration email ending in '@turing.io' is valid to access this endpoint.

## Parameters


To create a new brewery, there are 8 required parameters that must be passed in as the request body:

- **name** — The name of the new brewery as a `string`.
- **beerCount** — The number of beers at the brewery as a `integer`.
- **location** — The location of the new brewery as a `string`.
- **year** — The year the new brewery was established as a `integer`.
- **token** — The granted JWT token for the particular user as a `string`.
- **email** — The email address of the user as a `string`.
- **appName** — The name of the app where data will be used as a `string`.
- **admin** — The access rights to post as a `boolean`.
***

## Errors

- **400 Bad Request** — The parameters entered could not be understood by server due to missing keys or improper syntax. 
- **403 Forbidden** — The token you have entered is expired, missing, incorrect, or does not have admin privileges. 

***

## Return format

An object with the following keys and values:

- **id** - ID given in table.
- **name** - Name of new brewery.
- **location** - City where new brewery is located.
- **year** - Year new brewery was founded.
- **beerCount** - Number of beers new brewery produced by brewery.
- **created_at** — Date the record was created in the database.
- **updated_at** — Date the record was updated in the database.

***

## Example

**Request**

```
https://https://byob-db-th.herokuapp.com/api/v1/breweries
```
**Return shortened for example purpose**

```json
  {
  	"id": "698",
    "location": "Castle Rock",
    "name": "105 West Brewing Company",
    "beerCount": 10000,
    "year": 2017,
    "created_at": "2017-10-13T04:40:25.181Z",
    "updated_at": "2017-10-13T04:40:25.181Z"
  }
```