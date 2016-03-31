angular
    .module('app')
    .controller('MainController', MainController)

MainController.$inject = ['$rootScope', 'Auth', '$location'];

function MainController($rootScope, Auth, $location){ 
    var vm = this;
    vm.user = null;
    vm.logout = logout;
    
    $rootScope.$on('$stateChangeStart', function () {
        Auth.getUserDetails()
        .then(function(data){
            vm.user = true;
        })
        .catch(function(){
            vm.user = false;
        })
    });
    
    function logout(){
        Auth.logout()
        .then(function () {
            $location.path('/');
        });
    }
}