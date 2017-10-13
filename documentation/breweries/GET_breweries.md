# Breweries Endpoint

```
GET breweries
```

## Description

Returns _**all**_ of the breweries in the database.

***

## Requires authentication

No authentication required for **GET breweries** enpoints.

- A valid [JSON Web Token](https://jwt.io/) is required in order to access this endpoint.
  - Token can be sent in the following formats:
    - **HTTP Request Header**
    - **HTTP Request Body**
    - **HTTP URL Query String**
- Any registration email is valid to access this endpoint.
***

## Parameters

This endpoint can take a query parameter of **location**. This will return all breweries at the specified location.

```
/api/v1/breweries?location=Denver
```
***

## Errors

- **404 Not Found** — The query parameter entered did not match any brewery locations. 

***

## Return format

An array of objects with the following keys and values:

- **id** - ID given in table.
- **name** - Name of brewery.
- **location** - City where brewery is located.
- **year** - Year brewery was founded.
- **beerCount** - Number of beers brewery produced by brewery.
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
[
  {
    "location": "Castle Rock",
    "name": "105 West Brewing Company",
    "beerCount": 20,
    "year": 2015
  },
  {
    "location": "Louisville",
    "name": "12 Degree Brewing",
    "beerCount": 54,
    "year": 2013
  },
  {
    "location": "Castle Rock",
    "name": "Castle Rock Beer Company",
    "beerCount": 24,
    "year": 2016
  }
]
```