angular.module('level001Controller', ['eatsomefoodController','watchsometvController','smokesomepotController']).controller('level001Controller', function($scope, $http) {
   

});


angular.module('eatsomefoodController', []).controller('eatsomefoodController', function($scope) {
   
    $scope.formData = {};


    $scope.submitForm = function() {
      if($scope.formData.name == 'pizza' || $scope.formData.name == 'okonomiyaki') {
          $('.prize').show();
      } else {
        alert('nope')
      }
    };
});

angular.module('watchsometvController', []).controller('watchsometvController', function($scope, $http) {
   
    $scope.channels = ['football','films','culture'];
    $scope.formData = {};
    $scope.books = ['On Exactitude in Science'];
    $scope.dostuff = function(){
      var something = $scope.formData.name;
      var foourl = '/formhandler/'+something;
    $http.get(foourl)
    .success(function(data) {
      // $scope.todos = data;
      if(data.answer == 'correct'){
        $('#level001-watchsometv').html("<img src='"+data.url+"'/>");

      } else {
        $scope.books.push(data.attempt);
        // alert('nope');
      }
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  }

    $scope.submitForm = function() {
      var something = $scope.formData.name;
      var foourl = '/formhandler/'+something;
      $http({
          method  : 'GET',
          url     : foourl,
          data    : $.param($scope.formData),  // pass in data as strings
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      })
      .success(function(data) {
          console.log(data);

          if (!data.success) {
            // if not successful, bind errors to error variables
              $scope.errorName = data.errors.name;
              $scope.errorSuperhero = data.errors.superheroAlias;
          } else {
            // if successful, bind success message to message
              $scope.message = data.message;
          }
      });
    }
});

angular.module('smokesomepotController', []).controller('smokesomepotController', function($scope) {
   
    $scope.formData = {};


    $scope.submitForm = function() {
      if($scope.formData.name == 'pizza' || $scope.formData.name == 'okonomiyaki') {
          $('.prize').show();
      } else {
        alert('nope')
      }
    };



});

// ilikeweed.config(function($stateProvider, $urlRouterProvider, $uiViewScrollProvider,$anchorScrollProvider) {
    
//     // $urlRouterProvider.otherwise('/level');
//     $uiViewScrollProvider.useAnchorScroll();
//     $anchorScrollProvider.disableAutoScrolling();

//     $stateProvider
//     .state('eat', {
//         url: '/eat',
//         templateUrl: '/views/level001/eat/lookinkitchen.html', // this can be in injected with a variable later 
//     })
//     .state('smoke', {
//         url: '/smoke',
//         templateUrl: '/views/level001/smoke/smokesomepot.html', // this can be in injected with a variable later 
//     })
//     .state('consume', {
//         url: '/consume',
//         templateUrl: '/views/level001/consume/watchsometv.html', // this can be in injected with a variable later 
//         controller: 'watchsometvController',
//     });
// });






