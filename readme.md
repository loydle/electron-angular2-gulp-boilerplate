
# BoilerPlate

## Technologies
* BackEnd 
	* NodeJS
* FrontEnd
	* TypeScript
	* sass
* Task Runner
	* Gulp

## Libraries & frameworks
* BackEnd
	* Electron
* FrontEnd
	* Angular2


## Install
`$ npm install`

## Run build

`$ npm start`

## Deploy build

`$ npm run deploy`

## Release new version

MacOS

`$ npm run package-mac`

Windows

`$ npm run package-win`

## Important files & folders

```bash

.
├──  README.md
├──  dist
├──  e2e
├──  gulpfile.js
├──  karma.conf.js
├──  node_modules
├──  package-lock.json
├──  package.json
├──  protractor.conf.js
├──  releases
├──  src
└──  tslint.json

5 directories, 8 files

```

dist/
> compiled release, this folder is automatically build
> don't try to modify files here 

node_modules/
> store node packages installed from `$ npm install`

releases/
> store executable app form `$ npm run package-[mac,win]`

src/
> store the source code of the app

src/app/
> store angular2 components

src/assets/
> store raw assets
> see gulpfile.js for more info on deploy tasks (minify, images compression, transpiling,..)

src/electron/
> store core electron backend app

src/tsconfig.json
> describe how to transpile TypeScript files

environments/
> store env variables

index.html
> root page used for rendering angular components

gulpfile.js
> config gulp tasks

# Angular Components

# Create

> Use angular-cli to create new components

`$ npm install -g angular-cli`

> Generate component.css, component.html, component.spec.ts, component.ts
> & automatically import component to app.module.ts

`$ ng generate component [name]`

# Remove

> manualy remove src/app/[component] & remove import and references in app.module.ts



