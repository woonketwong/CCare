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

   $NODE_ENV=test nodemon server.js

3) Testing
   The NODE_ENV is set to "test" while running tests under the ./test directory. This is done with:

   NODE_ENV=test mocha test -R spec