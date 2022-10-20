# Ng Chrome Extension Example

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

![Screenshot](https://github.com/merih-sakarya/ng-chrome-extension/blob/master/src/assets/images/ng-chrome-extension.gif)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Chrome Extension Architecture

An extension's architecture will depend on its functionality, but all extensions must have a manifest.<br/>

**The manifest**

> The manifest file, titled manifest.json, gives the browser information about the extension, such as the most important files and the capabilities the extension might use.

**Service worker (Background script)**

> Extensions are event-based programs used to modify or enhance the Chrome browsing experience. Events are browser triggers, such as navigating to a new page, removing a bookmark, or closing a tab. Extensions monitor these events using scripts in their background service worker, which then react with specified instructions.

**Content scripts**

> Content scripts are files that run in the context of web pages. By using the standard Document Object Model (DOM), they are able to read details of the web pages the browser visits, make changes to them, and pass information to their parent extension.

**Popup**

> An action's popup will be shown when the user clicks on the extension's action button in the toolbar. The popup can contain any HTML contents you like, and will be automatically sized to fit its contents. The popup cannot be smaller than 25x25 and cannot be larger than 800x600.

## Angular Chrome Extension Settings

1. Include the `manifest.json` file in the assets. (angular.json)

```
"projects": {
    "example-app": {
      ...
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            ...
            "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/manifest.json"
            ],
            ...
          },
          ...
```

2. Install @angular-builders/custom-webpack

```
npm i -D @angular-builders/custom-webpack
```

3. Create a custom webpack config in the root folder (webpack.config.ts)

```
import type { Configuration } from 'webpack';

module.exports = {
  entry: {
    "background": { import: 'src/background.ts', runtime: false },
    "content-script": { import: 'src/content-script.ts', runtime: false }
  },
} as Configuration;
```

4. Add custom-webpack in your angular.json

```
"projects": {
  ...
  "example-app": {
    ...
    "architect": {
      ...
      "build": {
        "builder": "@angular-builders/custom-webpack:browser"
        "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.ts"
            },
          ...
        }
```

5. Disable output hashing

```
"outputHashing": "none"
```

6. Install the types for Chrome API

```
npm add -D @types/chrome
```

7. Include `chrome` to types array in tsconfig.app.json

```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": ["chrome"]
  },
  ...
}
```

8. Include `background.ts` and `content-script.ts` to types array in tsconfig.app.json

```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    ...
  },
  "files": [
    ...
    "src/background.ts",
    "src/content-script.ts"
  ]
  ...
}
```

9. To avoid the following error;

```
Refused to execute inline event handler because it violates the following Content Security Policy directive: "script-src 'self'".Either the 'unsafe-inline'
keyword, a hash('sha256-...'), or a nonce('nonce-...') is required to enable inline execution.Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.
```

Disable inlineCritical in the optimizations. (angular.json)

```
"architect": {
  "build": {
      ...
      "optimization": {
        "styles": {
          "inlineCritical": false
        }
      }
    }
    ...
  }
  ...
}
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

**Loading the extension into Chrome**

1. Open Chrome.
2. Open the Extensions Management page by navigating to chrome://extensions.
3. Enable Developer Mode by toggling the switch next to Developer Mode.
4. Click the Load unpacked button and select the extension directory
   (dist/ng-chrome-extension).

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
