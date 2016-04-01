angular
    .module('app')
    .controller('DashboardImageController', DashboardImageController)

DashboardImageController.$inject = ['$stateParams', 'Upload'];

function DashboardImageController($stateParams, Upload){ 
    var vm = this;
    vm.upload = upload;
    componentHandler.upgradeAllRegistered();
    console.log($stateParams)
    $("#gallery").justifiedGallery({
        rowHeight : 600,
        margins : 7}
    );
    
    function upload(files,path,index) {
        console.log(files)
        if (files && files.length) {
            Upload.upload({url: '/api/upload', file: files[0]}).success(function (data, status, headers, config) {
                console.log(data.path)
            });
        }else{
            // Materialize.toast('No file detected', 2000);
            // return
        }
    };

}