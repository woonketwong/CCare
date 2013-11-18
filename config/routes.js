var home = require('../controllers/index.js');
var user = require('../controllers/user.js');
var jobApplicant = require('../controllers/jobApplicant.js');
var employer = require('../controllers/employer.js');
var jobPost = require('../controllers/jobPost.js');
var admin = require('../controllers/admin.js')
var ensureEmployerAuthenticated = require('../middleware/auth/middleware.js').ensureEmployerAuthenticated;
var ensureJobApplicantAuthenticated = require('../middleware/auth/middleware.js').ensureJobApplicantAuthenticated;

module.exports = function(app,passport){
  //***************************************************
  // Configure to ensure authentication on this route
  //***************************************************
  app.all('/worker/*',ensureJobApplicantAuthenticated,function(req,res,next){
    next();
  });
  app.all('/employer/*',ensureEmployerAuthenticated,function(req,res,next){
    next();
  });

  //**********************************
  // define general routes that are accessible 
  // by both job applicant and employer 
  // (no authentication is required)
  //**********************************
  app.get('/', home.index);

  app.post("/worker-login", 
    passport.authenticate('jobApplicant', {failureRedirect : "#/worker-login-fail"}),
    function(req,res) {
      req.session.passport.userType = "jobApplicant";
      res.redirect("#/workerPortal");
    }
  );

  app.get('/logout', function(req, res){
    console.log("Before Logout Session:", req.session);
    req.logout();
    // Also destroy the req.session.passport.userType
    delete req.session.passport.userType
    console.log("After Logout Session:", req.session);
    res.writeHead(200);
    res.end();
  });

  app.post("/employer-login", 
    passport.authenticate('employer', {failureRedirect : "#/employer-login-fail"}),
    function(req,res) {
      req.session.passport.userType = "employer";
      res.redirect("#/employerPortal");
    }
  );

  app.get('/', home.index);
  app.post('/worker-signup-initial', home.workerSignupInitial);
  app.get('/worker-sign-up/checkEmail', home.checkEmailIfExists);
  app.get('/worker-signup-initial/:token', home.workerSignupVerify);
  app.post('/employer-signup-initial', employer.employerSignupInitial);
  app.get('/employer-sign-up/checkEmail', employer.checkEmailIfExists);
  app.get('/employer-signup-initial/:token', employer.employerSignupVerify);

  //**********************************
  // define protected worker routes
  //**********************************
  app.get('/worker/allJobPost', jobApplicant.allJobsList);
  app.get('/worker/jobPost', jobPost.read);
  app.get('/worker/searchJobs', jobPost.search);
  app.post('/worker/worker-updateInfo', jobApplicant.updateInfo);
  // app.get('/worker-signup', home.workerReadInfo);
  // app.get('/worker-login-success', home.loginSuccess);
  // app.get('/worker-login-fail', home.loginFail);
  // app.get('/sessionData', home.sessionData)

  //**********************************
  // define protected employer routes
  //**********************************
  app.get('/employer/searchEmployees', employer.search);
  app.post('/employer/jobPost', jobPost.write);
  app.get('/employer/jobPost', jobPost.read);
  // app.post('/employer-updateInfo', employer.updateInfo);
  // app.get('/listEmployers', employer.listEmployers)
  // app.get('/employer-login-success', employer.loginSuccess);
  // app.get('/employer-login-fail', employer.loginFail);
  // app.get('/employer-signup', employer.employerReadInfo);

  //**********************************
  // define admin routes
  //**********************************
  app.get('/adminPanel', admin.allInfo)
  app.post('/deleteEntry', admin.deleteEntry);

};
