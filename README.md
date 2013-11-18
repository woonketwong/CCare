Credentialed Care
=================


Purpose
-------

To create an online market place connecting in-home-caregivers with employers.

Tech Stack
----------

*Front End
  *Angular - http://angularjs.org/
*Back End
  *Server
    *Server Technology: Node.JS http://nodejs.org/
  *Node Packages:
    *Server Framework: Express, v3.4.3 - http://expressjs.com/
    *Server HTML Templating Engine: Jade - http://jade-lang.com/
    *Authentication Manager: Passport + Passport-Local  http://passportjs.org/
    *email-templates: Allows emails to be sent from the server utilizing HTML templates https://npmjs.org/package/email-templates
    *nodemailer:Allows emails to be sent from the server https://npmjs.org/package/nodemailer
    *password-hash: Password hashing module https://npmjs.org/package/password-hash
    *underscore: Utility library https://npmjs.org/package/underscore
    *Mocha - Testing suite for node http://visionmedia.github.io/mocha/
    *should.js - BDD style assertions for node.js -- test framework agnostic

*Database
  *Database: MongoDB - "http://www.mongodb.org/" http://www.mongodb.org/
  *Database ODM: Mongoose - "http://mongoosejs.com/" http://mongoosejs.com/


Deployment
----------

*Local
  *Clone the repo from github to your local machine via 'git clone {github repo address}'
  *Install Node.JS- http://nodejs.org/
  Install mongodb- http://www.mongodb.org/
  *From the terminal, execute 'npm install' while in the project directory
  *From the terminal, execute 'mongod' to start the database.  Note that this is a continuously running process, you will not be able to e this terminal window until you close mongo.
  *From a new terminal tab, execute 'node server.js' while in the project directorye
  *In your browser, go to http://localhost:5000
*Remote on Heroku
  *Sign up for a Heroku account.  Credentialed Care can be hosted on Heroku for free as long as there is minimal traffic visiting the site.
  *Follow the steps provided at https://devcenter.heroku.com/articles/getting-started-with-nodejs
    *An addon will need to be installed to host the database on Heroku.  MongoHQ was used for the Heroku development deployment, see https://addons.heroku.com/mongohq.
    *Note that the package.json and Procfile have already been created and are included in the projects base directory.  The deployment process should be centered around creating the app sandbox on Heroku (via 'heroku create'), uploading the app, and renaming the app
    *Renaming the app (it will be randomly named when created on Heroku via 'heroku create') can be done by following the directions here: https://devcenter.heroku.com/articles/renaming-apps.



