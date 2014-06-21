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

    // $scope.foo = 'foo';

    // $scope.submitForm = function() {
    //   if($scope.formData.name == 'pizza' || $scope.formData.name == 'okonomiyaki') {
    //       $('.prize').show();
    //   } else {
    //     alert('nope')
    //   }
    // };
    $('.lookatstuff').on('click', function(){
      $('.found-stuff-overlay.a').show();
    });
    $('.close.a').on('click', function(){
      $('.found-stuff-overlay.a').hide();
    });
    $('.lookatstuff').on('click', function(){
      $('.found-stuff-overlay.a').show();
    });
    $('.close.b').on('click', function(){
      $('.found-stuff-overlay.a').hide();
    });

});

angular.module('smokeCtrl', ['smokeCtrl']).controller('smokeCtrl', function($scope) {

    $scope.foo = 'smoking ctrl';

    // $scope.submitForm = function() {
    //   if($scope.formData.name == 'pizza' || $scope.formData.name == 'okonomiyaki') {
    //       $('.prize').show();
    //   } else {
    //     alert('nope')
    //   }
    // };

});

          







