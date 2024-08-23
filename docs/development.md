# Development

Run the following to get an instance of Basel running locally.

```
npm install && npm run dev
```

Basel uses the [azure static web apps (swa) cli](https://azure.github.io/static-web-apps-cli/) to run. If you don't have it installed, you may need to run the following to get it installed globally.

`npm install -g @azure/static-web-apps-cli`

### Authentication

Basel uses SWA auth. With local development you'll be met with a login screen and you'll enter the following details in the form.

```
User ID: 9a400d60-9ddf-4781-9af7-b8c33973eff1
Username: nitish.sachar@gmail.com // Use whatever email you want but make sure to replace below too in userDetails.
User's Claims:
[
  {
    "typ": "emails",
    "val": "nitish.sachar@gmail.com"
  },
  {
    "typ": "extension_FullName",
    "val": "Nitish Sachar"
  },
  {
    "typ": "extension_Onboarded",
    "val": "true"
  }
]
```

### Debugging in Azure Static Web Apps

The instance of basel has application insights configured. By going to app-basel-dev application insights instance, you can enter a query such as the below to find more information about your query:

```
traces
| where message contains "[Basel]"
| order by timestamp desc
```

### Querying Entities

Basel uses [SWA DB Connections](https://learn.microsoft.com/en-us/azure/static-web-apps/database-overview) with a mssql backend. We also have an API project exposed in the `/api` folder for azure functions. The intent is to use azure functions to manage more complex tasks. Given that there is some level of re-use between the /api layer and the server side rendered svelte code, we have a `/src/common` folder for common database entities and for client side models.

### Icon Usage

We prefer importing icons with `import MyIcon from 'flowbite-svelte-icons/MyIcon.svelte`. This leads to faster compilation as mentioned here: https://flowbite-svelte.com/icons/svelte-4#Faster_compiling
