# Heartbeat

This is a React application built with Vite

## Setup instructions

`yarn`

`yarn dev`

view the running application at the address specified in your terminal, for example:
http://localhost:5173/

## Tech notes

Fitbit authorization is achieved with [PKCE Code Grant Flow](https://dev.fitbit.com/build/reference/web-api/developer-guide/authorization/). The codes and tokens are generated, fetched and put into the React Context with the library [react-oauth2-code-pkce](https://github.com/soofstad/react-oauth2-pkce)
Access to FitBit data is currently limited to my personal account. Awaiting FitBit to grant me access to up to 10 unique FitBit users.

## Testing

The end to end tests are run with Cypress

Ensure the application is running as per above instructions.
`npx cypress open`
For examples of writing tests in Cypress see https://github.com/cypress-io/cypress/tree/develop/npm/react/cypress/component/basic
