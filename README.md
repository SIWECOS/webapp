# siwecos-webapp

> Webapp for siwecos.de

## Purpose of the component
This component is the browser-based userinterface for Siwecos.de. It allows a user to create and manage and account, login, add domains and retrieve and view scan results.

## Prerequisits
### Building the app:
* node.js > 8.4.0
* npm

### Running the app:
* up-to-date browser (IE 11, IE edge, up-to-date versions of Chrome and Firefox)
* working internet connection with firewall configured to allow HTTPs connections to the APIs
* working SIWECOS REST APIs (ca and bla)

### OS- or Hardware requirements
It's a browser-based software, so no requirements

## Datastructures
The app does not use any local databases to store domain- or account data. Only the user's auth-token is stored in the browser's local storage if the "remember me" feature is enabled.

## Information flows
Any data (domain, scans, user etc.) is retrieved with asychronus background calls. The user's browser directly calls the API endpoint's, no information is tunneled or proxied through other servers.

## Installation
``` bash
# install node dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Configuration
* Adjust the used API-servernames in src/services/api.js
* Adjust the recaptcha client-key in src/components/Register.vue (sitekey)

## Translation
Find the translatable strings in src/i18n/index.js

## Build Setup
``` bash
# install dependencies
npm install

# build for production with minification
npm run build
```
This command creates 3 js files (app.js, manifest.js, vendor.js) in /dist/js and one css file (app.css) in /dist/css. On top of that, an index.html with the root-element for the app (<div id=app></div>) is created in the /dist folder.

## How to monitor
It run's in a users browser, no way to monitor that ;)