angular
    .module('app')
    .config(config);

config.$inject = ['$urlRouterProvider','$stateProvider','$locationProvider'];

function config($urlRouterProvider,$stateProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('home', {
        url:'/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
    })
    .state('sign_in', {
        url:'/sign_in',
        templateUrl: 'app/user/sign_in.html',
        controller: 'SignInController',
        controllerAs: 'vm'
    })
    .state('sign_up', {
        url:'/sign_up',
        templateUrl: 'app/user/sign_up.html',
        controller: 'SignUpController',
        controllerAs: 'vm'
    })

    $locationProvider.html5Mode({
        enabled: true
    });
}