var escapeApp=angular.module('escapeApp', [   'ui.router','level001Controller', 'watchsometvController']);
// angular.module('scotchTodo', []);
escapeApp.config(function($stateProvider, $urlRouterProvider, $uiViewScrollProvider,$anchorScrollProvider) {
    
    $urlRouterProvider.otherwise('/level');
    $uiViewScrollProvider.useAnchorScroll();
    $anchorScrollProvider.disableAutoScrolling();
    
    $stateProvider
    .state('eat', {
        url: '/eat',
        templateUrl: '/views/level001/eat/lookinkitchen.html', // this can be in injected with a variable later 
    })
    .state('smoke', {
        url: '/smoke',
        templateUrl: '/views/level001/smoke/smokesomepot.html', // this can be in injected with a variable later 
    })
    .state('consume', {
        url: '/consume',
        templateUrl: '/views/level001/consume/watchsometv.html', // this can be in injected with a variable later 
        controller: 'watchsometvController',
    });

});

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

