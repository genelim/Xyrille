angular
    .module('app')
    .controller('DashboardImageController', DashboardImageController)

DashboardImageController.$inject = ['$stateParams', 'Upload'];

function DashboardImageController($stateParams, Upload  ){ 
    var vm = this;
    vm.upload = upload;
    vm.image = '';
    componentHandler.upgradeAllRegistered();
    console.log($stateParams)
    // $("#gallery").justifiedGallery({
    //     rowHeight : 500,
    //     margins : 7}
    // );
    
    function upload(files,path,index) {
        console.log(files)
        if (files && files.length) {
           loadImage(
                files[0],
                function (img) {
                    $("#gallery > a:nth-child(1)").html(img);
                   console.log(vm.image)
                   console.log(img)
                   $("#gallery").justifiedGallery({
        rowHeight : 500,
        margins : 7}
    );
                //    document.body.appendChild(img);
                },
                {maxHeight: 600} // Options
            );
            // Upload.upload({url: '/api/upload', file: files[0]}).success(function (data, status, headers, config) {
            //     console.log(data.path)
            // });
        }else{
            // Materialize.toast('No file detected', 2000);
            // return
        }
    };

}