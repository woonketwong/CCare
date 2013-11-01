var home = require('../controllers/index.js');
var user = require('../controllers/user.js');

module.exports = function(app,passport){
  app.get('/', home.index);
  app.post('/worker-signup-initial', home.workerSignupInitial);
  app.get('/worker-sign-up/checkEmail', home.checkEmailIfExists);
  app.get('/worker-signup-initial/:token', home.workerSignupVerify);
  //app.post('/worker-signup-complete', home.workerSignupComplete);
  app.get('/worker-signup', home.workerReadInfo);
  app.get('/worker-login-success', home.loginSuccess);
  app.get('/worker-login-fail', home.loginFail);
  // app.get('/getProfile', home.getProfile);
  //app.post('/worker-login', home.workerLogin);
  app.post("/worker-login", 
    passport.authenticate('local',{
  	  successRedirect : "#/workerPortal",
  		failureRedirect : "#/worker-login-fail"
  	})
  );
  app.get('/collections/:collectionName', home.index);
};