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
            console.log($scope.phone);
            workerApplication['phone'] = $scope.phone;
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
  .controller('reg2Ctrl',function($scope,$http, $location, workerProfile){
    $scope.caregiver = false;
    $scope.CHHA = false;
    $scope.STNA = false;
    $scope.PCA = false;
    $scope.LPN = false;
    $scope.CNA = false;

    $scope.processFormData = function(){
      
      try{
      if($scope.hourlyRate) workerProfile.preferences.hourlyRate = parseInt($scope.hourlyRate.replace('$',''));
      if($scope.dailyRate) workerProfile.preferences.dailyRate = parseInt($scope.dailyRate.replace('$',''))
      workerProfile.preferences.jobType.caregiver = $scope.caregiver
      workerProfile.preferences.jobType.CHHA = $scope.CHHA
      workerProfile.preferences.jobType.STNA = $scope.STNA
      workerProfile.preferences.jobType.PCA = $scope.PCA
      workerProfile.preferences.jobType.LPN = $scope.LPN
      workerProfile.preferences.jobType.CNA = $scope.CNA
      workerProfile.preferences.fullTime = $scope.fullTime
      workerProfile.preferences.partTime = $scope.partTime
      workerProfile.preferences.dayShift = $scope.dayShift
      workerProfile.preferences.nightShift = $scope.nightShift
      workerProfile.preferences.weekDays = $scope.weekDays
      workerProfile.preferences.weekEnds = $scope.weekEnds
      workerProfile.preferences.homeCare = $scope.homeCare
      workerProfile.preferences.facilityCare = $scope.facilityCare
      workerProfile.preferences.range = parseInt($scope.range.split(" ")[2])
      if($scope.carAvailable === 'yes'){
        workerProfile.preferences.carAvailable = true;
      } else{
        workerProfile.preferences.carAvailable = false;
      }
    }catch(e){}
      // console.log(workerProfile);
      $location.path('/worker-registration3');
    }
    
  })
  .controller('reg3Ctrl',function($scope,$http, $location, workerProfile){
    $scope.processFormData = function(){
      workerProfile.preferences.yearsExperience = $scope.yearsExperience;
      workerProfile.preferences.employerName = $scope.employerName;
      workerProfile.certifications.PCA = $scope.PCA;
      workerProfile.certifications.CHHA = $scope.CHHA;
      workerProfile.certifications.CNA = $scope.CNA;
      workerProfile.certifications.LPN = $scope.LPN;
      workerProfile.languages.Arabic = $scope.Arabic
      workerProfile.languages.Chinese_Cantonese = $scope.Chinese_Cantonese
      workerProfile.languages.Chinese_Mandarin = $scope.Chinese_Mandarin
      workerProfile.languages.Farsi = $scope.Farsi
      workerProfile.languages.Filipino = $scope.Filipino
      workerProfile.languages.French = $scope.French
      workerProfile.languages.Greek = $scope.Greek
      workerProfile.languages.Hebrew = $scope.Hebrew
      workerProfile.languages.Hindu = $scope.Hindu
      workerProfile.languages.Italian = $scope.Italian
      workerProfile.languages.Japanese = $scope.Japanese
      workerProfile.languages.Korean = $scope.Korean
      workerProfile.languages.Polish = $scope.Polish
      workerProfile.languages.Russian = $scope.Russian
      workerProfile.languages.Spanish = $scope.Spanish
      workerProfile.languages.Swahili = $scope.Swahili
      workerProfile.languages.Vietnamese = $scope.Vietnamese

      $location.path('worker-registration4')
    }
  })
  .controller('reg4Ctrl',function($scope,$http, workerProfile, $location){
    $scope.submit = function(){
      workerProfile.idealPatient = $scope.idealPatient
      workerProfile.idealWorkEnvironment = $scope.workEnvironment
      workerProfile.interests = $scope.interests

      $http.post('/12345', workerProfile);
      $location.path('workerPortal')
    }
  })
  .controller('LoginController',function($scope, $http, $location, loginFactory){
    $scope.currentUser = loginFactory.getLoggedInUser();
    $scope.updateLocation = function(){
      $scope.urlHash = $location.url();
    };
  })
  .controller('wLoginCtrl'  ,function($scope, $http, $location){
    $scope.submit = function(){
      var obj = {
        email: $scope.email,
        password: $scope.password
      };
      $http.post('/worker-login', obj).success(function(data,data2){
        console.log(data)
        console.log(data2);
      })
    };
  })
  .controller('wPortalCtrl'  ,function($scope, $http, $location){
    $scope.sessionData = function(){
      $http.get('/sessionData').success(function(data,data2){
        console.log(data)
        console.log(data2);
      })
    };
  })
  .service('workerProfile', function () {
      //return object
    return {
      preferences: {
        jobType:{}
      },
      certifications: {},
      languages: {}
    };
    
    })
  .service('workerPreferences', function () {
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