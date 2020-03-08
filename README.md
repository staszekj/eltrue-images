### Application Goal
Point of this appication is to provide boilerplate of master-detail image viewer.

### How to run application ?
Go to: http://images.eltrue.com

### How to run application in dev mode (server and client) ?
* git clone https://github.com/staszekj/eltrue-images.git
* npm install
* npm run start:srv
* npm run start

### How to build application ?
* npm install
* npm run build:srv
* npm run build

### How to run production mode ?
* build application
* npm run run:srv

### What was implemented ?
* 600 images link are fetched from https://unsplash.com/ (with query: 'dog')
#### master view
* downloading resized images (maxHeight: 300px, aspect ratio)
* lazy loading (only images which are in viewport)
* debounce searching to reduce communication with nodejs server
* deleting picture (on client and server side)
### detailed view
* progressive loading of full image
* cancel loading of full images (while user fast clickin)
* picture detail editing
