angular
    .module('app')
    .config(config);

config.$inject = ['$urlRouterProvider','$stateProvider','$locationProvider'];

function config($urlRouterProvider,$stateProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('/dashboard', '/dashboard/photos');
    
    $stateProvider
    .state('home', {
        url         : '/',
        templateUrl : 'app/home/home.html',
        controller  : 'HomeController',
        controllerAs: 'vm',
        resolve     : {
            check_user : accessible
        }
    })
    .state('login', {
        url         : '/login',
        templateUrl : 'app/user/login.html',
        controller  : 'SignInController',
        controllerAs: 'vm',
        resolve     : {
            check_user : accessible
        }
    })
    .state('register', {
        url         : '/register',
        templateUrl : 'app/user/register.html',
        controller  : 'SignUpController',
        controllerAs: 'vm',
        resolve     : {
            check_user : accessible
        }
    })
    .state('dashboard', {
        url         : '/dashboard',
        templateUrl : 'app/dashboard/home.html',
        controller  : 'DashboardHomeController',
        controllerAs: 'vm',
        resolve     : {
            check_user : check_user
        }
    })
    .state('dashboard.photos', {
        url         : '/photos',
        templateUrl : 'app/dashboard/photos.html',
        controller  : 'DashboardPhotosController',
        controllerAs: 'vm',
        resolve     : {
            check_user : check_user
        }
    })
    .state('dashboard.image', {
        url         : '/photos/:id',
        templateUrl : 'app/dashboard/image.html',
        controller  : 'DashboardImageController',
        controllerAs: 'vm',
        resolve     : {
            check_user : check_user
        }
    })
    .state('dashboard.settings', {
        url         : '/settings',
        templateUrl : 'app/dashboard/settings.html',
        controller  : 'DashboardSettingsController',
        controllerAs: 'vm',
        resolve     : {
            check_user : check_user
        }
    })
    
    $locationProvider.html5Mode({
        enabled: true
    });
}

function check_user($location, Auth){
    return Auth.getUserDetails()
    .then(function(data){
        return data;
    })
    .catch(function(){
        $location.path('/')
    })
}

function accessible($location, Auth){
    Auth.getUserDetails()
    .then(function(){
        $location.path('/dashboard')  
    })
}