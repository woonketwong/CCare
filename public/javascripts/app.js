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
    .when('/worker-registration4',{
          controller: 'reg4Ctrl',
          templateUrl: 'templates/worker-registration4.html'
        });
}).controller('reg1Ctrl',function($scope,$http, workerApplication, $location){
    $scope.processFormData = function(){
      if($scope.password1===$scope.password2 && $scope.password1){
        $scope.error1 = ''
        if($scope.name){
          $scope.error2 = ''
          if($scope.email){
            workerApplication['name'] = $scope.name;
            workerApplication['password'] = $scope.password1;
            workerApplication['email'] = $scope.email;
            $location.path('/worker-registration2');
          } else{$scope.error3 = 'Error: You must enter an email';}
        } else{$scope.error2 = 'Error: You must enter a name';}
      }else{$scope.error1 = 'Error: Your passwords do not match';}
      
    };
  })
  .controller('reg2Ctrl',function($scope,$http, workerApplication){
    
  })
  .controller('reg3Ctrl',function($scope,$http, workerApplication){
    
  })
  .controller('reg4Ctrl',function($scope,$http, workerApplication){
    $scope.submit = function(){
      console.log('submitted?');
      console.log(workerApplication);
      $http.post('/worker-signup', workerApplication);
    };
  })
  .controller('LoginController',function($scope, $http, $location, loginFactory){
    $scope.currentUser = loginFactory.getLoggedInUser();
    $scope.updateLocation = function(){
      $scope.urlHash = $location.url();
    };
  })
  .service('workerApplication', function () {
      //return object
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