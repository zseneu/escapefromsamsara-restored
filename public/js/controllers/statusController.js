angular.module('statusController', []).controller('statusController', function($scope) {
   
    $scope.possesions = [
        {
            name: 'Money',
            value: 00000
        },
        {
            name: 'Dope',
            value: 0.2
        },
        {
            name: 'Cigs',
            value: 2
        },
        {
            name: 'Food',
            value: 5
        },
        {
            name: 'Water',
            value: 1 
        },
    ];

    $scope.healths = [
        {
            name: 'sobriety',
            value: '//////////'
        },
        {
            name: 'inspiration',
            value: '/////'
        },
        {
            name: 'physic power',
            value: '/////'
        },
        {
            name: 'sex drive',
            value: '///'
        },
        {
            name: 'rationality',
            value: '///'
        },
        {
            name: 'motor skills',
            value: '//////'
        },
        {
            name: 'motivation',
            value: '////////'
        },
        {
            name: 'sticking power',
            value: '//////////'
        },
        {
            name: 'strength',
            value: '////'
        },
        {
            name: 'clarity',
            value: '//////'
        }
    ];
    
});









