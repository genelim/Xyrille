angular
    .module('app')
    .controller('SignInController', SignInController)

SignInController.$inject = ['$state', 'Auth'];

function SignInController($state, Auth){ 
    componentHandler.upgradeAllRegistered();
    var vm = this;
    vm.user = null;
    vm.login = login;
    
    function login(){
        toastr.clear()
        
        if( angular.isUndefined(vm.user) || vm.user === null){
            toastr.error('Please fill up the required field!')
            return;
        }
        if(!vm.user.email || !vm.user.password){
            toastr.error('Please fill up the required field!')
            return;
        }        
        
        Auth.login(vm.user)
        .then(function(){
            toastr.success('Welcome!')
            $state.go('dashboard.photos')
        })
        .catch(function (data) {
            if(data.status === 401){
                toastr.warning('Invalid username or password!')
            }else{
                toastr.error('Server Error!')
            }
        });
    }
}