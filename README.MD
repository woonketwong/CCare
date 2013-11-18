
Credentialed Care - Tech Stack

Front End
   Angular - http://angularjs.org/
Back End
   Server
      Server Technology: Node.JS http://nodejs.org/
   Node Packages:
      Server Framework: Express, v3.4.3 - http://expressjs.com/
      Server HTML Templating Engine: Jade - http://jade-lang.com/
      Authentication Manager: Passport + Passport-Local  http://passportjs.org/
      email-templates: Allows emails to be sent from the server utilizing HTML templates https://npmjs.org/package/email-templates
      nodemailer:Allows emails to be sent from the server https://npmjs.org/package/nodemailer
      password-hash: Password hashing module https://npmjs.org/package/password-hash
      underscore: Utility library https://npmjs.org/package/underscore
      Mocha - Testing suite

Database
   Database: MongoDB - "http://www.mongodb.org/" http://www.mongodb.org/
   Database ODM: Mongoose - "http://mongoosejs.com/" http://mongoosejs.com/


Tools:
express - web application framework for node
nodemon - nodemon will watch the files in the directory that nodemon was started, and if they change, it will automatically restart your node application. For use during development of a node.js based application.
mocha - Mocha is a feature-rich JavaScript test framework running on node and the browser, making asynchronous testing simple and fun
mongoddb - MongoDB (from "humongous") is a scalable, high-performance, open source NoSQL database
mongoose - elegant mongodb object modeling for node.js
Passport - Simple, unobtrusive authentication for Node.js
should.js - BDD style assertions for node.js -- test framework agnostic
superagent - SuperAgent is a small progressive client-side HTTP request library, and Node.js module with the same API, sporting many high-level HTTP client features.

Database:
To initialize the database, first execute "mongod" on a command line. Then, open a new tab, and execute "mongo". 

App ENV:
The NODE_ENV environment variable specifies the setup of the app. There are three environment setting here:
1) Production
   In this setting, the NODE_ENV is set to "Production". This should be set when the app is deployed to Heroku. This is done by executing the following command:

   $ heroku config:set NODE_ENV=production

2) Development
   The NODE_ENV is set to "Development" while developing features locally. This is done with:

   NODE_ENV=development nodemon server.js

3) Testing
   The NODE_ENV is set to "test" while running tests under the ./test directory. This environment variable is used to select the test database (instead of production or development database) while in testing mode. This is configured in ./package.json:

   ...
   ...
   ...
   "scripts": {
     "test": "NODE_ENV=test node_modules/.bin/mocha -w"
   }
   ...
   ...
   ...

   The tool used for testing is MOCHA. Its spec is at https://npmjs.org/package/mocha. 
   Its configuration is stored at ./test/mocha.opts.

   The command to run the test suite is:
   >npm test

   This will start a test runner. Any time a file is changed it will run the test suite.

