# Breweries Endpoint

```
DELETE breweries/:id
```

## Description

Delete a specific brewery in the database by its id. Admin access required.

***

## Requires authentication

- A valid [JSON Web Token](https://jwt.io/) is required in order to access this endpoint.
  - Token can be sent in the following formats:
    - **HTTP Request Header**
    - **HTTP Request Body**
    - **HTTP URL Query String**
- A registration email ending in '@turing.io' is valid to access this endpoint.

## Parameters


To delete a brewery, there are 4 required parameters that must be passed in as the request body:

- **token** — The granted JWT token for the particular user as a `string`.
- **email** — The email address of the user as a `string`.
- **appName** — The name of the app where data will be used as a `string`.
- **admin** — The access rights to post as a `boolean`.
***

## Errors

- **422 Unprocessable Entity** — The id parameter entered could not be found or the request body is missing keys.
- **403 Forbidden** — The token you have entered is expired, missing, incorrect, or does not have admin privileges. 

***

## Return format

A successful delete status code of **204 No-Content**

***

## Example

**Request**

```
https://https://byob-db-th.herokuapp.com/api/v1/breweries/698
```