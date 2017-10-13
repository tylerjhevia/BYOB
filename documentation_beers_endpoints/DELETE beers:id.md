# Beers Endpoint

```
DELETE beers/:id
```

## Description

Deletes a beer from the database.

***

## Requires authentication

- A valid [JSON Web Token](https://jwt.io/) is required in order to access this endpoint.
  - Token can be sent in the following formats:
    - **HTTP Request Header**
    - **HTTP Request Body**
    - **HTTP URL Query String**
- A registration email and an app name are required to access this endpoint.

***

## Parameters

This endpoint takes beer ID as a path parameter.

```
/api/v1/beers/100
```

This endpoint can take a JSON Web Token as a query parameter.

```
/api/v1/beers?token=fwwa34D34jde3L4jefw
```
***

## Errors

- **400 Missing Field** 
- **403 Token Invalid** - Invalid JSON Web Token.
- **403 No Admin Privileges** - JSON Web Token does not include admin privileges.
- **422** - Error text: `Nothing to delete with id of [id]`


## Return format

An empty object.

***

## Example

**Request**

```
https://https://byob-db-th.herokuapp.com/api/v1/beers/3
```

  
**Return**

```json
{}
```
