'use strict';

angular.module('drwn', ['ui.router', 'ngResource'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
    //Defining States
    $stateProvider
    .state('page1', {
        url: '/',
        views: {
            'content': {
                templateUrl: './views/page1.html',
                controller: 'myController'
            }
        }
    })
    .state('page2', {
        url: '/list',
        views: {
            'content': {
                templateUrl: './views/page2.html',
                controller: 'myController'
            }
        }
    })
    .state('page3', {
        url: '/keyword/:key',
        views: {
            'content': {
                templateUrl: './views/page3.html',
                controller: 'myController'
            }
        }
    });
    
    $urlRouterProvider.otherwise('/');
    
    $locationProvider.hashPrefix('');
}]);