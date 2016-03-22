angular
    .module('app')
    .controller('SignInController', SignInController)

SignInController.$inject = ['Login'];

function SignInController(Login){ 
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
        
        var new_user = Login.save(vm.user); 
        
        new_user.$promise
        .then(function(user){
            toastr.success('Welcome!')
        })
        .catch(function(response) {
            if(response.status === 401){
                toastr.warning('Invalid username or password!')
            }else{
                toastr.error('Server Error!')
            }
        })
    }
}