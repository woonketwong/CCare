
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
      Mocha - Testing suite for node http://visionmedia.github.io/mocha/
      should.js - BDD style assertions for node.js -- test framework agnostic
Database
   Database: MongoDB - "http://www.mongodb.org/" http://www.mongodb.org/
   Database ODM: Mongoose - "http://mongoosejs.com/" http://mongoosejs.com/


Project Setup:
   Database
      MongoDB must first be installed on the server machine.  For local testing, install mongoDB from http://www.mongodb.org/.  After installing, the database can be started by executing "mongod" from the terminal.  The database CLI can be opened by executing "mongo".  Once the CLI has been started, the following commands will help exploring the database: http://docs.mongodb.org/manual/reference/mongo-shell/.
   Node
      Node must be installed on the server machine. See http://nodejs.org/ to install.  Once node has been installed, the server may be started on a local machine using "node server.js" from the terminal while in the project directory.
   NPM
      NPM, Node's package manager, will be installed alongside Node.JS.  Credentialed Care uses many NPM modules that must be installed prior to running the server.  To install these modules, execute the command "npm install" from the project base directory.  A list of modules that will be installed can be found in the "package.json" file located in the project's base directory.


Deployment
   ...Local
      -Clone the repo from github to your local machine via 'git clone {github repo address}'
      -Install Node.JS- http://nodejs.org/
      -Install mongodb- http://www.mongodb.org/
      -From the terminal, execute 'npm install' while in the project directory
      -From the terminal, execute 'mongod' to start the database.  Note that this is a continuously running process, you will not be able to use this terminal window until you close mongo.
      -From a new terminal tab, execute 'node server.js' while in the project directory
      -In your browser, go to http://localhost:5000
   ...Remote on Heroku
      -Sign up for a Heroku account.  Credentialed Care can be hosted on Heroku for free as long as there is minimal traffic visiting the site.
      -Follow the steps provided at https://devcenter.heroku.com/articles/getting-started-with-nodejs
         -An addon will need to be installed to host the database on Heroku.  MongoHQ was used for the Heroku development deployment, see https://addons.heroku.com/mongohq.  
         -Note that the package.json and Procfile have already been created and are included in the projects base directory.  The deployment process should be centered around creating the app sandbox on Heroku (via 'heroku create'), uploading the app, and renaming the app
            -Renaming the app (it will be randomly named when created on Heroku via 'heroku create') can be done by following the directions here: https://devcenter.heroku.com/articles/renaming-apps.


Environment Variables & Config
   -The config.js file inside the /config/ folder contains several configuration variables.
      -The email verification feature currently uses a regular gmail account to send out emails.  The email credentials (username and password) are visible to anyone with access to the repo.  Because of this, we recommend marking the config.js to not be uploaded to github via the .gitignore file.  The config.js file can then be uploaded to your hosting service manually.  See https://help.github.com/articles/ignoring-files
      -For discussion regarding the 'ENV' variable, see below.


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

