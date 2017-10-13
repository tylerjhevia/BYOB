# Breweries Endpoint

```
GET breweries/:id
```

## Description

Returns information about a specific brewery.
***

## Requires authentication

No authentication required for **GET breweries/:id** enpoints.

## Parameters

This endpoint does not take any query parameters.
***

## Errors

- **404 Not Found** — The id parameter entered did not match any brewery ids. 

***

## Return format

One object with the following keys and values:

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
https://https://byob-db-th.herokuapp.com/api/v1/breweries/1
```
**Return shortened for example purpose**

```json
{
	"location": "Castle Rock",
	"name": "105 West Brewing Company",
	"beerCount": 20,
	"year": 2015
}
```