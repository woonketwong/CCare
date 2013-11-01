var home = require('./controllers/index.js');
var user = require('./controllers/user.js');

module.exports = function(app, passport){
  app.get('/', home.index);
  app.post('/worker-signup-initial', home.workerSignupInitial);
  app.get('/worker-sign-up/checkEmail', home.checkEmailIfExists);
  app.get('/worker-signup-initial/:token', home.workerSignupVerify);
  //app.post('/worker-signup-complete', home.workerSignupComplete);
  app.get('/worker-signup', home.workerReadInfo);
  app.post('/worker-login', home.workerLogin);
  app.get('/collections/:collectionName', home.index);
};