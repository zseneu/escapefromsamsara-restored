var escapeApp = angular.module('escapeApp', ['ui.router', 'mainController']);

angular.module('mainController', [
  'gameBoardController' ,
  'actionsController',
  'plotController',
  'itemsController',
  'healthController'
  ]).controller('mainController', function($scope, $http) {
});

angular.module('actionsController', ['moveLeftController']).controller('actionsController', function($scope) {
    $scope.information = 'this will hold the controls to interact with with the gameBoardController';
    $scope.actions = [
      {
      "name" : 'Move Left',
      "class" : 'move-left',
      "function":'moveLeft'
      },
            {
      "name" : 'Move Right',
      "class" : 'move-right',
      "function":'leftRight'
      },
            {
      "name" : 'Move Up',
      "class" : 'move-up',
      "function":'moveUp'
      },
            {
      "name" : 'Move Down',
      "class" : 'move-down',
      "function":'moveDown'
      },
    ];
    $scope.hues = ['red','green','blue'];
});
angular.module('moveLeftController', []).controller('moveLeftController', function($scope) {

});

angular.module('plotController', []).controller('plotController', function($scope) {
    $scope.information = 'this will contain additional plot interactivity';
});
angular.module('itemsController', []).controller('itemsController', function($scope) {
   
    $scope.information = 'this will contain the items you have collected';
    // index=1 ">001</a> // needs a higher scope for click handler?

  
});
var healthController = angular.module('healthController', []).controller('healthController', function($scope) {
   
    $scope.information = 'this will contain health info';
    $scope.healths = [
      {
      "name" : 'juice',
      "class" : 'health-juice',
      "value" : '10'
      },
            {
      "name" : 'pollon',
      "class" : 'health-pollon',
      "value":'10'
      },
            {
      "name" : 'strength',
      "class" : 'health-strength',
      "value" : '10'
      },
    ];
});

var gameBoardController = angular.module('gameBoardController', ['ui.router']).controller('gameBoardController', function($scope) {
    $scope.information = "You wake up. You're too weak to get out of bed";
    $scope.actions = [
      {
      "name" : 'default',
      "class" : 'action-default',
      },
            {
      "name" : 'exercise',
      "class" : 'action-exercise',
      }
    ];
    $scope.findaplant = function(){
      $scope.information = "you find a plant with a controller";
    } // remember that angular overrides links and buttons are better
    // angular models are controller specific and do not relate to api models?


});



gameBoardController.config(function($stateProvider, $urlRouterProvider, $uiViewScrollProvider,$anchorScrollProvider) {
    $urlRouterProvider.otherwise('/smoke');
    $uiViewScrollProvider.useAnchorScroll();
    $anchorScrollProvider.disableAutoScrolling();

  $stateProvider
    .state('work', {
      url: '/work',
      templateUrl: '/views/level-001/work.html', // this can be in injected with a variable later 
        // controller: 'smokesomepotController',
  })
  .state('exercise', {
      url: '/exercise',
      templateUrl: '/views/level-001/exercise.html', // this can be in injected with a variable later 
        // controller: 'smokesomepotController',
  })
  .state('getup', {
      url: '/getup',
      templateUrl: '/views/level-001/getup.html', // this can be in injected with a variable later 
        // controller: 'smokesomepotController',
  });
});
// )};
//     .state('smoke.some', {
//         url: '/some',
//         // templateUrl: '/views/level001/consume/watchsometv.html',
//         controller: 'smokeCtrl',
//         controller: function($scope) {
//             $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
//         }
//     });

//   // // nested list with just some random string data
//   //   .state('smoke.mescaline', {
//   //       url: '/eat',
//   //       template: 'I could sure use a drink right now.'
//   //   })
//   //   .state('smoke.tobacco', {
//   //       url: '/eat',
//   //       template: 'I could sure use a drink right now.'
//   //   });
// });

//         // // nested list with just some random string data
//         // .state('home.paragraph', {
//         //     url: '/paragraph',
//         //     template: 'I could sure use a drink right now.'
//         // })
        
//         // // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
//         // .state('about', {
//         //     url: '/about',
//         //     views: {

//         //         // the main template will be placed here (relatively named)
//         //         '': { templateUrl: 'views/partial-about.html' },

//         //         // the child views will be defined here (absolutely named)
//         //         'columnOne@about': { template: 'Look I am a column!' },

//         //         // for column two, we'll define a separate controller 
//         //         'columnTwo@about': { 
//         //             templateUrl: 'views/table-data.html',
//         //             controller: 'statusController'
//         //         }
//         //     }
//         // });
        
// });

// var escapeStatus = angular.module('escapeStatus', [ 
//                                                     'escapeStatusController',
//                                                     'ui.router'
//                                                   ]);

// escapeStatus.config(function($stateProvider, $urlRouterProvider, $uiViewScrollProvider,$anchorScrollProvider) {
//   // refactor oportunity
// }

// unit testing : does it work once?

