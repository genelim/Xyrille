angular
    .module('app')
    .controller('SignUpController', SignUpController)

SignUpController.$inject = ['User'];

function SignUpController(User){ 
    componentHandler.upgradeAllRegistered();
    var vm = this;
    vm.user = null;
    vm.signup = signup;
    function signup(){
        toastr.clear()
        var new_user = User.save(vm.user); 
        
        new_user.$promise
        .then(function(user){
            toastr.success('Congratulation, your account has been created!')
        })
        .catch(function(response) {
            if(response.status === 401){
                toastr.warning('Email Used')
            }else{
                toastr.error('Server Error')
            }
        })
    }
}