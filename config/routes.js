var home = require('../controllers/index.js');
var user = require('../controllers/user.js');
var employer = require('../controllers/employer.js');
var jobPost = require('../controllers/jobPost.js');

module.exports = function(app,passport){
  app.get('/', home.index);
  app.post('/worker-signup-initial', home.workerSignupInitial);
  app.get('/worker-sign-up/checkEmail', home.checkEmailIfExists);
  app.get('/worker-signup-initial/:token', home.workerSignupVerify);
  app.get('/worker-signup', home.workerReadInfo);
  app.get('/worker-login-success', home.loginSuccess);
  app.get('/worker-login-fail', home.loginFail);

  app.get('/allJobPost', home.allJobsList);
  app.post("/worker-login", 
    passport.authenticate('jobApplicant',{
  	  successRedirect : "#/workerPortal",
  		failureRedirect : "#/worker-login-fail"
  	})
  );
  app.post('/worker-updateInfo', home.updateInfo);
  
  app.post('/employer-signup-initial', employer.employerSignupInitial);
  app.get('/employer-sign-up/checkEmail', employer.checkEmailIfExists);
  app.get('/employer-signup-initial/:token', employer.employerSignupVerify);
  app.get('/employer-signup', employer.employerReadInfo);
  app.get('/employer-login-success', employer.loginSuccess);
  app.get('/employer-login-fail', employer.loginFail);
  app.post("/employer-login", 
    passport.authenticate('employer',{
      successRedirect : "#/employerPortal",
      failureRedirect : "#/employer-login-fail"
    })
  );

  app.get('/listEmployers', employer.listEmployers)
  app.post('/employer-updateInfo', employer.updateInfo);
  app.get('/sessionData', home.sessionData)
  app.post('/jobPost', jobPost.write);
  app.get('/jobPost', jobPost.read);

  app.get('/searchJobs', jobPost.employeeRead);
};
