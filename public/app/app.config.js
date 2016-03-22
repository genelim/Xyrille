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
    .state('login', {
        url:'/login',
        templateUrl: 'app/user/login.html',
        controller: 'SignInController',
        controllerAs: 'vm'
    })
    .state('register', {
        url:'/register',
        templateUrl: 'app/user/register.html',
        controller: 'SignUpController',
        controllerAs: 'vm'
    })

    $locationProvider.html5Mode({
        enabled: true
    });
}