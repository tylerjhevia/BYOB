# Breweries Endpoint

```
GET beers/:breweryID
```

## Description

Returns all of the beers in the database whose breweryID matches the request parameter.

***

## Requires authentication

No authentication required for **GET breweries** endpoints.

***

## Parameters

This endpoint takes a path parameter of breweryID. It will return all beers produced by a brewery with the given id.

```
/api/v1/beers/6
```
***

## Errors

- **404 Not Found** — The request parameter did not match any breweryID in the beers database.

***

## Return format

An array of objects with the following keys and values:

- **id** - ID given in table.
- **name** - Name of beer.
- **brewery** - Name of brewery that produces the beer.
- **type** - Type of the beer.
- **breweryID** - Database ID of the brewery that produces the beer.
- **created_at** — Date the record was created in the database.
- **updated_at** — Date the record was updated in the database.

***

## Example

**Request**

```
https://https://byob-db-th.herokuapp.com/api/v1/beers/14
```
**Return shortened for example**

```json
[
   {
        "id": 342,
        "name": "Amicas Big S Brown",
        "brewery": "Amicas Pizza & Microbrew",
        "type": "Brown Ale",
        "breweryID": 14,
        "created_at": "2017-10-11T19:23:38.699Z",
        "updated_at": "2017-10-11T19:23:38.699Z"
    },
    {
        "id": 354,
        "name": "Amicas Doublewide Oatmeal Stout",
        "brewery": "Amicas Pizza & Microbrew",
        "type": "Sweet Stout",
        "breweryID": 14,
        "created_at": "2017-10-11T19:23:38.705Z",
        "updated_at": "2017-10-11T19:23:38.705Z"
    },
    {
        "id": 366,
        "name": "Amicas Honey Bourbon Imperial Brown",
        "brewery": "Amicas Pizza & Microbrew",
        "type": "American Strong Ale",
        "breweryID": 14,
        "created_at": "2017-10-11T19:23:38.711Z",
        "updated_at": "2017-10-11T19:23:38.711Z"
    }
]