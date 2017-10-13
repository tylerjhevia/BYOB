# Beers Endpoint

```
POST beers
```

## Description

Adds a new beer to the beers database.

***

## Requires authentication

- A valid [JSON Web Token](https://jwt.io/) is required in order to access this endpoint.
  - Token can be sent in the following formats:
    - **HTTP Request Header**
    - **HTTP Request Body**
    - **HTTP URL Query String**
- A registration email and an app name is required to access this endpoint.

***

## Parameters

This endpoint can take a JSON Web Token as a query parameter.

```
/api/v1/beers?token=fwwa34D34jde3L4jefw
```
***

## Errors

- **400 Bad Request** - Error text: ` Missing key: [key name]`
- **403 Token Invalid** - Invalid JSON Web Token.
- **403 No Admin Privileges** - JSON Web Token does not include admin privileges.

***

## Return format

A beer object with the following information:

- **id** - ID in beers database.
- **name** - Name of the beer.
- **brewery** - Name of brewery that produces the beer.
- **type** - Type of the beer.
- **breweryID** - Database ID of brewery that produces the beer.
- **created_at** — Date the record was created in the database.
- **updated_at** — Date the record was updated in the database.

***

## Example

**Request**

```
https://https://byob-db-th.herokuapp.com/api/v1/beers
```

**Request Body**

    {
    	"name": "Sweet Action",
    	"brewery": "Pretty Cool Brewery",
    	"type": "Fruit Ale",
    	"breweryID": 400,
    	"token": "agi56O3N4N23fe7",
    	"admin": true,
    	"email": "tyler@turing.io",
    	"app name": "BYOB" 
    }
**Return**

```json
{
	"id": 50000,
	"name": "Sweet Action",
    "brewery": "Pretty Cool Brewery",
    "type": "Fruit Ale",
    "breweryID": 400,
    "created_at": "2017-10-11T19:23:38.524Z",
    "updated_at": "2017-10-11T19:23:38.524Z"
}
```
