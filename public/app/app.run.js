angular
    .module('app')
    .run(runBlock);

runBlock.$inject = [];

function runBlock(){ 
    toastr.options = { "positionClass": "toast-bottom-right "}
}