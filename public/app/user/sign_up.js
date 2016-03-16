angular
    .module('app')
    .controller('SignUpController', SignUpController)

SignUpController.$inject = [];

function SignUpController(){ 
    componentHandler.upgradeAllRegistered();
}