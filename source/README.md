# Job Kiosk Web Service

Based on https://github.com/go-hse/multiuser-template

Includes
- a simple [Node](https://nodejs.org "Node.js") server for based on express [Express](http://expressjs.com/ "Express Framework") 
- [gulp](http://gulpjs.com/) with [jshint](http://jshint.com/)
- integrated [jasmine](http://jasmine.github.io/) testing framework
- a simple monitor that restarts the server on files changes
- views with [Jade](http://jade-lang.com/) template engine
- a user DB with [MongooseJs](http://mongoosejs.com/) and [MongoDB](https://www.mongodb.org/)
- authentification with [Passport](http://passportjs.org/)

## Pre-Requisites
- Node.js
- MongoDB
- ImageMagick (to convert PDF to PNG)

## Environment Variables
- CHROME - path to chrome-browser executable for auto-(re-)start
- IMGMAG - path to convert 

## Start
In Directory source:

Install node packages:
	npm install

Start MongoDB

Start Gulp tast runner
	gulp

