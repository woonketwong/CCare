var myApp =  angular.module('CCare',[])
  .config(function($routeProvider,$locationProvider){
  $routeProvider
    .when('/',{
          templateUrl: 'templates/index.html'
        })
    .when('/employer-registration',{
          controller: 'empRegCtrl',
          templateUrl: 'templates/employer-registration.html'
        })
    .when('/worker-registration',{
          controller: 'reg1Ctrl',
          templateUrl: 'templates/worker-registration.html'
        })
    .when('/aboutUs',{
          templateUrl: 'templates/aboutUs.html'
        })
    .when('/worker-registration2',{
          controller: 'reg2Ctrl',
          templateUrl: 'templates/worker-registration2.html'
        })
    .when('/worker-registration3',{
          controller: 'reg3Ctrl',
          templateUrl: 'templates/worker-registration3.html'
        })
    .when('/worker-login',{
          controller: 'wLoginCtrl',
          templateUrl: 'templates/worker-login.html'
        })
    .when('/worker-login-fail',{
          controller: 'wLoginCtrl',
          templateUrl: 'templates/worker-login-fail.html'
        })
    .when('/verifyEmail',{
          templateUrl: 'templates/verifyEmail.html'
        })
    .when('/workerPortal',{
          controller: "wPortalCtrl",
          templateUrl: 'templates/workerPortal.html'
        })
    .when('/worker-portal',{
          controller: 'reg4Ctrl',
          templateUrl: 'templates/worker-portal.html'
        })
    .when('/worker-registration4',{
          controller: 'reg4Ctrl',
          templateUrl: 'templates/worker-registration4.html'
        })
    .when('/employer-login',{
          controller: 'eLoginCtrl',
          templateUrl: 'templates/employer-login.html'
        })
    .when('/employer-login-fail',{
          controller: 'eLoginCtrl',
          templateUrl: 'templates/employer-login-fail.html'
        })
    .when('/employerPortal',{
          controller:'ePortalCtrl',
          templateUrl: 'templates/employerPortal.html'
        })
    .when('/postJob',{
          controller: 'postJobCtrl',
          templateUrl: 'templates/postJob.html'
        })
    .when('/listEmployers',{
          controller: 'listEmployersCtrl',
          templateUrl: 'templates/listEmployers.html'
        })
    .when('/admin',{
          controller: 'adminCtrl',
          templateUrl: 'templates/admin.html'
        })
    .when('/logout',{
          controller: 'logoutCtrl',
          templateUrl: 'templates/logout.html'
        })
    .when('/workerProfile',{
          controller: 'wProfileCtrl',
          templateUrl: 'templates/workerProfile.html'
        })
    .when('/jobProfile',{
          controller: 'jProfileCtrl',
          templateUrl: 'templates/jobProfile.html'
        })
    .when('/employerMyJobs',{
          controller: 'eJobListCtrl',
          templateUrl: 'templates/employerMyJobs.html'
        })
})


myApp.run(function($rootScope) {
  $rootScope.loggedIn = false;
  $rootScope.wLoggedIn = false;
  $rootScope.eLoggedIn = false;
});

myApp.config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
