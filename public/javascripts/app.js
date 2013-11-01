angular.module('CCare',[])
  .config(function($routeProvider,$locationProvider){
  $routeProvider
    .when('/',{
          templateUrl: 'templates/index.html'
        })
    .when('/worker-registration',{
          controller: 'reg1Ctrl',
          templateUrl: 'templates/worker-registration.html'
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
    .when('/verifyEmail',{
          templateUrl: 'templates/verifyEmail.html'
        })
    .when('/worker-portal',{
          controller: 'reg4Ctrl',
          templateUrl: 'templates/worker-portal.html'
        })
    .when('/worker-registration4',{
          controller: 'reg4Ctrl',
          templateUrl: 'templates/worker-registration4.html'
        });
}).controller('reg1Ctrl',function($scope,$http, workerApplication, $location){
    $scope.processFormData = function(){
      if($scope.name){
        $scope.error1 = ''
        if($scope.password1===$scope.password2 && $scope.password1){
          $scope.error2 = ''
          if($scope.email){
            workerApplication['name'] = $scope.name;
            workerApplication['password'] = $scope.password1;
            workerApplication['email'] = $scope.email;
            $scope.submit();
          } else{$scope.error3 = 'Error: You must enter an email';}
        } else{$scope.error1 = 'Error: Your passwords do not match';}
      }else{$scope.error2 = 'Error: You must enter a name';}
    };

    $scope.submit = function(){
      $http({
        method: 'GET',
        url: '/worker-sign-up/checkEmail', 
        params: {email: workerApplication.email}
      })
        .success(function(data,status){
          console.log(data)
          if(data){
            $scope.finalizeSignup();
          } else{
            $scope.error1 = 'Error: that email is already in use'
          }
        });
    };

    $scope.finalizeSignup = function(){
      $http.post('/worker-signup-initial', workerApplication)
        .success(function(data,status){
          $location.path('/verifyEmail');
      });      
    }

  })
  .controller('reg2Ctrl',function($scope,$http, workerApplication){
    $scope.caregiver = false;
    $scope.CHHA = false;
    $scope.STNA = false;
    $scope.PCA = false;
    $scope.LPN = false;
    $scope.CNA = false;

    $scope.processFormData = function(){
      // debugger;
      // workerApplication.preferences['hourlyRate'] = parseInt($scope.hourlyRate.replace('$',''));
      // workerApplication.preferences.dailyRate = parseInt($scope.dailyRate.replace('$',''))
      // workerApplication.preferences.jobType.caregiver = $scope.caregiver
      // workerApplication.preferences.jobType.CHHA = $scope.CHHA
      // workerApplication.preferences.jobType.STNA = $scope.STNA
      // workerApplication.preferences.jobType.PCA = $scope.PCA
      // workerApplication.preferences.jobType.LPN = $scope.LPN
      // workerApplication.preferences.jobType.CNA = $scope.CNA



      console.log(workerApplication);
      // $location.path('/worker-registration3');
    }
    
  })
  .controller('reg3Ctrl',function($scope,$http, workerApplication){
    
  })
  .controller('reg4Ctrl',function($scope,$http, workerApplication){

  })
  .controller('LoginController',function($scope, $http, $location, loginFactory){
    $scope.currentUser = loginFactory.getLoggedInUser();
    $scope.updateLocation = function(){
      $scope.urlHash = $location.url();
    };
  })
  .controller('wLoginCtrl'  ,function($scope, $http, $location){
    $scope.submit = function(){
      console.log('submitting something!');
      var obj = {
        email: $scope.email,
        password: $scope.password
      };
      $http.post('/worker-login', obj);
    };
  })
  .service('workerApplication', function () {
      //return object
    var obj = {};
    obj.preferences = {};
    obj.certifications = {};
    obj.languages = {};
    return {};
    
    })
  .factory('loginFactory', function($http, $q) {
    var factory = {};

    factory.getLoggedInUser = function(){
      var deferred = $q.defer();
      $http.get('/_/loggedin/user').success(function(data){
        factory.currentUser = data;
        deferred.resolve(data);
      });
      return deferred.promise;
    };
    return factory;
  })
  ;