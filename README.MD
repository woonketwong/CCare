Initial Commit

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