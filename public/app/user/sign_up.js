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
        var new_user = User.save(vm.user); 
        
        new_user.$promise.then(function(user){
            console.log(user)
        })
    }
    
}