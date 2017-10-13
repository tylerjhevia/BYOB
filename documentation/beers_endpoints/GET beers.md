# Beers Endpoint

```
GET beers
```

## Description

Returns _**all**_ of the beers in the database.

***

## Requires authentication

No authentication required for **GET beers** enpoints.

***

## Parameters

This endpoint can take a query parameter of **type**. This will return all beers of the specified type.

```
/api/v1/beers?type=Saison
```
***

## Errors

- **404 Not Found** — Could not find any beers of type [type]

***

## Return format

An array of objects with the following keys and values:

- **id** - ID given in table.
- **name** - Name of beer.
- **brewery** - Name of brewery that produces the beer.
- **type** - Type of beer.
- **breweryID** - Database ID of brewery that produces the beer.
- **created_at** — Date the record was created in the database.
- **updated_at** — Date the record was updated in the database.

***

## Example

**Request**

```
https://https://byob-db-th.herokuapp.com/api/v1/beers
```
**Response shortened for example**

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
        "id": 1095,
        "name": "Black Bottle Carlos",
        "brewery": "Black Bottle Brewery",
        "type": "Brown Ale",
        "breweryID": 37,
        "created_at": "2017-10-11T19:23:39.069Z",
        "updated_at": "2017-10-11T19:23:39.069Z"
    },
  {
        "id": 5262,
        "name": "Dillon Dam Sweet George's Brown (Rum Barrel)",
        "brewery": "Dillon Dam Brewery & Restaurant",
        "type": "Brown Ale",
        "breweryID": 108,
        "created_at": "2017-10-11T19:23:41.257Z",
        "updated_at": "2017-10-11T19:23:41.257Z"
    }
    
  ]
```