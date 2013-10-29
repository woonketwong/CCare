angular.module('CCare',[])
  .config(function($routeProvider){
  $routeProvider.when('/',{
    controller: 'formCtrl',
    templateUrl: 'templates/index.html'
  });
}).controller('formCtrl',function($scope,$http){
    $scope.submit = function(){
      $http.post('/formInput', [$scope.user,$scope.password]);
    };
  });