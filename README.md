# Basel

## Developing

Run the following to get an instance of Basel running locally.

```
npm install && npm run dev
```

Basel uses the [azure static web apps (swa) cli](https://azure.github.io/static-web-apps-cli/) to run. If you don't have it installed, you may need to run the following to get it installed globally.

`npm install -g @azure/static-web-apps-cli`

### Authentication

Basel uses SWA auth. With local development you'll be met with a login screen and you'll enter the following details in the form.

```
User ID: f7224c43998572237a1dc841964cb3bf
Username: <email> // Use whatever email you want but make sure to replace below too in userDetails.
User's Claims:
[{
  "identityProvider": "aad",
  "userId": "f7224c43998572237a1dc841964cb3bf",
  "userDetails": "<email>",
  "userRoles": ["anonymous", "authenticated"],
  "claims": [{
    "typ": "name",
    "val": "Azure Static Web Apps"
  }]
}]
```
