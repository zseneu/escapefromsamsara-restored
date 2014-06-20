angular.module('level001Controller', ['eatsomefoodController']).controller('level001Controller', function($scope, $http) {
   
    $scope.dostuff = 'take some e';
});

angular.module('watchsometvController', []).controller('watchsometvController', function($scope) {
   
    $scope.channels = ['football','films','culture'];
});

angular.module('eatsomefoodController', []).controller('eatsomefoodController', function($scope) {
   
    $scope.formData = {};

    $scope.submitForm = function() {
      if($scope.formData.name == 'pizza' || $scope.formData.name == 'okonomiyaki') {

          // alert('correct');
          $('.prize').show();
      } else {
        alert('nope')
      }
        // var trouble = $scope.formData;
        // if($scope.fromData == $scope.formData) {
        // }
    };
});





