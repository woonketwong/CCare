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
}).controller('reg1Ctrl',function($scope,$http, workerApplication){
    $scope.processFormData = function(){
      debugger;
      workerApplication['username'] = $scope.username;
      workerApplication['password'] = $scope.password1;
      workerApplication['email'] = $scope.email;
    };
  }).controller('reg2Ctrl',function($scope,$http, workerApplication){
    
  }).controller('reg3Ctrl',function($scope,$http, workerApplication){
    
  }).controller('reg4Ctrl',function($scope,$http, workerApplication){
    $scope.submit = function(){
      console.log('submitted?');
      console.log(workerApplication);
      // $http.post('/formInput', [$scope.user,$scope.password]);
    }
  
  }).service('workerApplication', function () {
        return {};
    });