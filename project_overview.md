# BYOB - Build Your Own Backend


### Overview
This was a project for Turing School of Design and Software's Module 4 Front-End program. The goal of this project was to collect some data and build an API to access, manipulate, and delete the data. We collected Colorado brewery and beer data. The focus of this project was to solidify CRUD methods, querying a database, and responding with JSON data. This was a week-long project. 

[Live Link](https://byob-db-th.herokuapp.com/)

![Project Home](https://i.imgur.com/VT38K9D.png)

--

### Project Specs

##### Find a Data Source 

- Rebuild a backend from your personal project
- Work with and scrape new data from an API or website. - Some APIs and websites are easier to work with than others - you may not be able to pull off the thing you want to do - be prepared for that.
	- https://developer.nrel.gov/
	- https://sunlightfoundation.com/api/
	- https://developer.foursquare.com/data.world
- Parse CSVs or JSON files (Node has built-in modules for parsing CSVs)
- Create the data yourself. You must create a ‘seed file’ with a minimum of ~30 rows of data for each main table

##### Relationships

- At minimum, you must have at least 2 different tables with at least 1 relationship (e.g. one-to-one, one-to-many, many-to-many).

##### Required Enpoints
- 4 GET endpoints
	- 2 GET endpoints for all of one resource (i.e. ‘/api/v1/merchants’)	
	- 2 GET endpoints for a specific resource (i.e. ‘/api/v1/merchants/:id’)
- 2 POST endpoints
- 2 PUT OR PATCH endpoints
- 2 DELETE endpoints

##### Status Codes & Error Handling

All endpoints should respond with the minimum status code results:

- 200/201: Success
- 404: Not Found
If POST/PUT/PATCH request fails to save an entity due to bad information being sent from the client, you should respond with

- 422: Unprocessable Entity
If you have a critical server error, you should respond with

- 500: Internal Server Error
You are welcome to use other status codes.

In addition to responding with the appropriate status code, you are expected to send back clear, informative error messages when something goes wrong. Do not simply console.log ‘WHATEVER’. If a POST request fails because the request didn’t include a required parameter, respond with something like ‘Entity requires a but none was provided.'

##### Custom API Endpoints

- Developer must use query params on at least one endpoint, which would allow the user to narrow down the nature of their request or filter their results. So for example, you may have an endpoint like:

```GET api/v1/merchants?areacode=80202```

- Developer must secure at least 4 endpoints with a JWT. Though this project doesn’t have an explicit frontend, at the / root of your application, return an index.html file with a form that allows a user to request a JWT. The user must submit an email address and an app name. If the email address ends in @turing.io, the JWT should include admin privileges. Require a JWT with admin privileges for any ‘write’ requests (POST/PUT/PATCH/DELETE).

##### Documentation

- In the README, developer should provide documentation on the API endpoints that can be hit.

##### Testing and Linting

- All endpoints need to be tested for happy and sad paths. You should assert that proper status codes are being returned as well as appropriate response data and error messages.

- You are expected to use a linter on this project and have 0 linting errors. You are free to choose your own linting configuration that fits your style preferences, but your project must pass your linter. Bonus points for using a git hook that prevents you from committing any unlinted code.

##### Deployment

- Your application should be automatically deployed to Heroku via CircleCI
- CircleCI should be running your tests and linter
- You do not need a staging environment for this project

--

### Next Steps

- Issues have been made for each '**Next Step**' including:
	- adding endpoint handlers
	- adding more brewery and beer data
	- adding more columns to brewery and beer tables
	- Add count functionality within brewery/beer tables
	- Refactor
