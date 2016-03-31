angular
    .module('app')
    .controller('SignUpController', SignUpController)

SignUpController.$inject = ['Auth', 'Email_Validation'];

function SignUpController(Auth, Email_Validation){ 
    componentHandler.upgradeAllRegistered();
    var vm = this;
    vm.user = null;
    vm.register = register;
    
    function register(){
        toastr.clear();
        
        if( angular.isUndefined(vm.user) || vm.user === null){
            toastr.error('Please fill up the required field!')
            return;
        }
        if(!vm.user.email || !vm.user.password){
            toastr.error('Please fill up the required field!')
            return;
        }        
        if(!Email_Validation.check(vm.user.email)){
            toastr.error('Invalid Email')
            return;
        }
        
        Auth.register(vm.user)
        .then(function () {
            toastr.success('Congratulation, your account has been created!')
        })
        .catch(function (data) {
            if(data.status === 401){
                toastr.warning('Email existed!')
            }else{
                toastr.error('Server Error!')
            }
        });
    }
}