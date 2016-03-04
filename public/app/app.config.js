angular
    .module('app')
    .config(config);

config.$inject = ['$urlRouterProvider','$stateProvider','$locationProvider'];

function config($urlRouterProvider,$stateProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('home', {
        url:'/',
        templateUrl: 'app/home/home.html'
    })

    $locationProvider.html5Mode({
        enabled: true
    });
}