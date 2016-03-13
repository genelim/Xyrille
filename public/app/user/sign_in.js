angular
    .module('app')
    .controller('SignInController', SignInController)

SignInController.$inject = [];

function SignInController(){ 
    componentHandler.upgradeAllRegistered();
}