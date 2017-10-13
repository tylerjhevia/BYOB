# Beers Endpoint

```
PATCH beers/:id
```

## Description

Updates the name of a beer in the database.

***

## Requires authentication

No authentication required for **PATCH beers** endpoint.

***

## Parameters

This endpoint takes beer id as a path parameter.

```
/api/v1/beers/23
```

***

## Errors

- **404 Not Found** - Error text: `Cannot find a beer with the id of [id]`
- **500 Internal Server Error** 

***

## Return format

An object with a property of updatedBeer whose value is an object with the following properties:

- **id** - ID in beers database.
- **name** - Updated name of the beer.
- **brewery** - Name of brewery that produces the beer.
- **type** - Type of the beer.
- **breweryID** - Database ID of brewery that produces the beer.
- **created_at** — Date the record was created in the database.
- **updated_at** — Date the record was updated in the database.

***

## Example

**Request**

```
https://https://byob-db-th.herokuapp.com/api/v1/beers/15
```

**Body**

    {
    	"name": "New Beer"
    }
**Return**

```json
{updatedBeer: 
	{
		"id": 5,
		"name": "Sweet Action",
	    "brewery": "Tasty Beers",
	    "type": "India Pale Ale",
	    "breweryID": 500,
	    "created_at": "2017-10-11T19:23:38.524Z",
	    "updated_at": "2017-11-11T19:22:15.324Z"
	}
}
```