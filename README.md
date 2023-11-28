# Cypress Test Web Site

This project contains end-to-end tests for the web site overdrive.cl. The tests are implemented using Cypress.

## Install dependencies:

```sh
npm install
```
## Configuration

Open cypress.env.json and set the variables with valid credentials to enter the website with your user account.

```json
{
    "USERNAME": "your_user",
    "PASSWORD": "your_password"
}
```

## Running Tests
To run the tests with cypress, use the following command:
```sh
npm run cypress
```