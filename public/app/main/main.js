angular
    .module('app')
    .controller('MainController', MainController)

MainController.$inject = [];

function MainController(){ 
    var vm = this;
    var dialog = document.querySelector('dialog');
    vm.signin_modal_open = signin_modal_open;
    vm.signin_modal_close = signin_modal_close;
    
    
    function signin_modal_open(){
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
    }
    
    function signin_modal_close(){
        // if (! dialog.showModal) {
        //     dialogPolyfill.registerDialog(dialog);
        // }
        dialog.close();
    }
}