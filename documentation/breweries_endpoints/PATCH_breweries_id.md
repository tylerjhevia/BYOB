# Breweries Endpoint

```
PATCH breweries/:id
```

## Description

Change a brewery's beer count only. 
***

## Requires authentication

No authentication required for **PATCH breweries/:id** enpoints.
## Parameters


To change a brewery's beer count, there is 1 required parameter that must be passed in as the request body:

- **beerCount** — The new number of beers at the brewery as a `integer`.

***

## Errors

- **404 Not Found** — The id parameter did not match any brewery's id.  

***

## Return format

An object with a key of **updatedBrewery** with the following key/value pairs as its value:

- **id** - ID given in table.
- **name** - Name of brewery.
- **location** - City where brewery is located.
- **year** - Year brewery was founded.
- **beerCount** - Updated number of beers brewery produced by brewery.
- **created_at** — Date the record was created in the database.
- **updated_at** — Date the record was updated in the database.

***

## Example

**Request**

```
https://https://byob-db-th.herokuapp.com/api/v1/breweries/698
```
**Return shortened for example purpose**

```json
{
	"updatedBrewery": {
	    "id": 698,
	    "name": "Best Brewery Around",
	    "location": "Denver",
	    "beerCount": 500,
	    "year": 10000,
	    "created_at": "2017-10-13T04:40:25.181Z",
	    "updated_at": "2017-10-13T04:40:25.181Z"
	}
}
```