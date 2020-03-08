### Application Goal
Point of this appication is to provide boilerplate of master-detail image viewer.

### How to run application ?
Go to: http://images.eltrue.com
(eltrue.com is my private domain, application is deplyed on my private RaspberryPi)

### How to run application in dev mode (server and client) ?
* git clone https://github.com/staszekj/eltrue-images.git
* npm install
* npm run start:srv
* npm run start

### How to run unit tests ?
* npm run test

### How to build application ?
* npm install
* npm run build:srv
* npm run build

### How to run built application ?
* build application
* npm run run:srv

### What was implemented ?
* 600 image links are fetched from https://unsplash.com/ (with query: 'dog')
* application is implemented with strict type checking in TypeScript (client and server)
* simple nodejs app with search/delete/update endpoints
* example of unit test file `one-image-component.test.jsx`

#### master view
* downloading resized (small) images (maxHeight: 300px with aspect ratio)
* lazy loading of small images (downloading images which are in viewport only)
* debounce searching to reduce communication with nodejs server
* deleting image feature (on client and server side)

#### detailed view
* progressive loading of full image
* cancel loading of full images (while user fast clicking forward/backward buttons)
* picture details editing (client and server side)

### What was NOT implemented but IMHO is worth to implement
#### Improve user experiance
* scroll to element after switching from detail view to master view
* use http2 for downloading images (request multiplexing over a single TCP connection)
* use infinite scroll in master view
* virtual scrolling (restrict amount of dom elements for huge search result)

### Improve code quality
* introduce ESLint/Prettier rules
* more unit tests
* end-2-end tests with Cypress or similar tool
