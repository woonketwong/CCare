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
    $scope.doAddress = function(){
      var street = $scope.street.replace(/ /g,"+");
      var cityStateZip = $scope.cityStateZip.replace(/ /g,"+");
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + street + '+' + cityStateZip + '&sensor=true')
        .success(function(data) {
          console.log('http://maps.googleapis.com/maps/api/geocode/json?address=' + street + '+' + cityStateZip + '&sensor=true');
          workerProfile.preferences.latitude = data.results[0].geometry.location.lat;
          workerProfile.preferences.longitude = data.results[0].geometry.location.lng;
        })
    }
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
        workerProfile.preferences.catsOK = $scope.catsOk;
        workerProfile.preferences.dogsOk = $scope.dogsOk;
        workerProfile.preferences.smokeOk = $scope.smokeOk;
        workerProfile.preferences.lift25ok = $scope.lift25ok;
        if($scope.carAvailable === 'yes'){
          workerProfile.preferences.carAvailable = true;
        } else{
          workerProfile.preferences.carAvailable = false;
        }
      }catch(e){}
      
      $scope.doAddress();
      $location.path('/worker-registration3');
    }
    
  })
  .controller('reg3Ctrl',function($scope,$http, $location, workerProfile){
    $scope.processFormData = function(){
      workerProfile.preferences.education = $scope.education;
      workerProfile.preferences.yearsExperience = $scope.yearsExperience;
      workerProfile.preferences.employerName = $scope.employerName;
      workerProfile.preferences.certifications.PCA = $scope.PCA;
      workerProfile.preferences.certifications.CHHA = $scope.CHHA;
      workerProfile.preferences.certifications.CNA = $scope.CNA;
      workerProfile.preferences.certifications.LPN = $scope.LPN;
      workerProfile.preferences.languages.Arabic = $scope.Arabic
      workerProfile.preferences.languages.Chinese_Cantonese = $scope.Chinese_Cantonese
      workerProfile.preferences.languages.Chinese_Mandarin = $scope.Chinese_Mandarin
      workerProfile.preferences.languages.Farsi = $scope.Farsi
      workerProfile.preferences.languages.Filipino = $scope.Filipino
      workerProfile.preferences.languages.French = $scope.French;
      workerProfile.preferences.languages.Greek = $scope.Greek;
      workerProfile.preferences.languages.Hebrew = $scope.Hebrew;
      workerProfile.preferences.languages.Hindu = $scope.Hindu;
      workerProfile.preferences.languages.Italian = $scope.Italian;
      workerProfile.preferences.languages.Japanese = $scope.Japanese;
      workerProfile.preferences.languages.Korean = $scope.Korean;
      workerProfile.preferences.languages.Polish = $scope.Polish;
      workerProfile.preferences.languages.Russian = $scope.Russian;
      workerProfile.preferences.languages.Spanish = $scope.Spanish;
      workerProfile.preferences.languages.Swahili = $scope.Swahili;
      workerProfile.preferences.languages.Vietnamese = $scope.Vietnamese;
      workerProfile.preferences.specializations.Alzheimers = $scope.Alzheimers;
      workerProfile.preferences.specializations.Handicapped = $scope.Handicapped;
      workerProfile.preferences.specializations.Hospice = $scope.Hospice;
      workerProfile.preferences.specializations.Gastronomy = $scope.Gastronomy;
      workerProfile.preferences.specializations.Breathing = $scope.Breathing;
      workerProfile.preferences.specializations.Hoyer = $scope.Hoyer;
      workerProfile.preferences.specializations.SpecialMeal = $scope.SpecialMeal;
      workerProfile.preferences.specializations.ChildCare = $scope.ChildCare;
      workerProfile.preferences.specializations.Psychiatric= $scope.Psychiatric;
      workerProfile.preferences.specializations.Geriatric = $scope.Geriatric;
      workerProfile.preferences.specializations.Homecare = $scope.Homecare;
      workerProfile.preferences.specializations.AssistedLiving = $scope.AssistedLiving;
      workerProfile.preferences.specializations.Fingerprints = $scope.Fingerprints;
      workerProfile.preferences.specializations.AHCALevel2 = $scope.AHCALevel2;
      workerProfile.preferences.specializations.CPR = $scope.CPR;
      workerProfile.preferences.specializations.FirstAid = $scope.FirstAid;
      workerProfile.preferences.specializations.BLS = $scope.BLS;
      workerProfile.preferences.specializations.TBTest = $scope.TBTest;
      workerProfile.preferences.patientMatchScore = $scope.patientMatchScore
      workerProfile.preferences.scheduleMatchScore = $scope.scheduleMatchScore
      workerProfile.preferences.workCloseToHomeScore = $scope.workCloseToHomeScore
      workerProfile.preferences.workEnvironmentScore = $scope.workEnvironmentScore


      $location.path('worker-registration4')
    }
  })
  .controller('reg4Ctrl',function($scope,$http, workerProfile, $location){
    $scope.submit = function(){
      workerProfile.preferences.idealPatient = $scope.idealPatient
      workerProfile.preferences.idealWorkEnvironment = $scope.workEnvironment
      workerProfile.preferences.interests = $scope.interests

      $http.post('/worker-updateInfo', workerProfile);
      $location.path('workerPortal')
    }
  })
  .controller('empRegCtrl',function($scope,$http, workerApplication, $location){
    $scope.processFormData = function(){
      if($scope.name){
        $scope.error1 = ''
        if($scope.password1===$scope.password2 && $scope.password1){
          $scope.error2 = ''
          if($scope.email){
            $scope.submit();
          } else{$scope.error3 = 'Error: You must enter an email';}
        } else{$scope.error1 = 'Error: Your passwords do not match';}
      }else{$scope.error2 = 'Error: You must enter a company name';}
    };

    $scope.submit = function(){
      $http({
        method: 'GET',
        url: '/employer-sign-up/checkEmail', //REPLACE WITH CORRECT EMAIL
        params: {email: $scope.email}
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
      employerApplication = {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password1,
        phone: $scope.phone,
        comments: $scope.comments
      }
      $http.post('/employer-signup-initial', employerApplication)
        .success(function(data,status){
          $location.path('/verifyEmail');
      });
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
  .controller('eLoginCtrl'  ,function($scope, $http, $location){
    $scope.submit = function(){
      var obj = {
        email: $scope.email,
        password: $scope.password
      };
      $http.post('/employer-login', obj).success(function(data,data2){
        console.log(data)
        console.log(data2);
      })
    };
  })
  .controller('wPortalCtrl'  ,function($scope, $http, $location, serialize){
  })
  .controller('ePortalCtrl'  ,function($scope, $http, $location){
    $scope.getJobData = function(){
      $http.get('/jobPost').success(function(data){
        $scope.jobs = data;
      })
    };
    $scope.jobs = $scope.getJobData();
  })
  .controller('jobListCtrl'  ,function($scope, $http, $location, serialize){
    $scope.getJobData = function(){
      $http.get('/allJobPost').success(function(data){
        $scope.jobs = data;
      })
    };
    $scope.search = function(){
      var loc = $scope.loc.replace(/ /g,"+");
      var range = $scope.range.split(' ')[2]
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + loc +  '&sensor=true')
        .success(function(data) {
          var obj = {};
          obj.range = range;
          obj.lat = data.results[0].geometry.location.lat;
          obj.lng = data.results[0].geometry.location.lng;
          $http.get('/searchJobs?'+serialize(obj), {'aa': '123'})
            .success(function(data){
              $scope.jobs = data
          })
      })
    }
    $scope.jobs = $scope.getJobData();
  })
  .controller('postJobCtrl',function($scope, $http, $location){
    var job = {};
    job.experience = {};
    var longitude, latitude;

    $scope.submit = function(){
      var street = $scope.street.replace(/ /g,"+");
      var cityStateZip = $scope.cityStateZip.replace(/ /g,"+");
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + street + '+' + cityStateZip + '&sensor=true')
        .success(function(data) {
          console.log('http://maps.googleapis.com/maps/api/geocode/json?address=' + street + '+' + cityStateZip + '&sensor=true');
          latitude = data.results[0].geometry.location.lat;
          longitude = data.results[0].geometry.location.lng;
          $scope.postJob();
        })
    }

    $scope.postJob = function(){
      job.positionName = $scope.positionName;
      job.yearsExperience = $scope.yearsExperience
      job.hourlyRate = $scope.hourlyRate
      job.duties = $scope.duties;
      job.longitude = longitude;
      job.latitude = latitude;
      job.positionType = $scope.positionType;
      job.experience.education = $scope.education;
      job.experience.Alzheimers = $scope.Alzheimers;
      job.experience.Handicapped = $scope.Handicapped;
      job.experience.Hospice = $scope.Hospice
      job.experience.Gastronomy = $scope.Gastronomy
      job.experience.Breathing = $scope.Breathing;
      job.experience.Hoyer = $scope.Hoyer;
      job.experience.SpecialMeal = $scope.SpecialMeal;
      job.experience.ChildCare = $scope.ChildCare;
      job.experience.Psychiatric = $scope.Psychiatric;
      job.experience.Geriatric = $scope.Geriatric;
      job.experience.Homecare = $scope.Homecare;
      job.experience.AssistedLiving = $scope.AssistedLiving

      $http.post('/jobPost',job).success(function(){
        $location.path('/employerPortal');
      }).error(function(err){
        if(err) console.log(err);
      });
    }
  })
  .service('workerProfile', function () {
      //return object
    return {
      preferences: {
        jobType:{},
        certifications: {},
        specializations: {},
        languages: {}
      }};
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
  .factory('serialize',function(){
    return function(obj) {
        var str = [];
        for(var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      }

  });

myApp.config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
