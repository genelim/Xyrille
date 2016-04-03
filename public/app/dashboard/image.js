angular
    .module('app')
    .controller('DashboardImageController', DashboardImageController)

DashboardImageController.$inject = ['$stateParams', 'Upload','Ahdin'];

function DashboardImageController($stateParams, Upload ,Ahdin ){ 
    var vm = this;
    vm.upload = upload;
    componentHandler.upgradeAllRegistered();
    console.log($stateParams)
    // $("#gallery").justifiedGallery({
    //     rowHeight : 500,
    //     margins : 7}
    // );
    var count = 1;
     
    function upload(files,path,index) {
        console.log(files)
        if (files && files.length) {
        //    loadImage(
        //         files[0],
        //         function (img) {
        //             // count ++;
        //             console.log('ll')
        //             img.removeAttribute("width");
        //             img.removeAttribute("height");
        //             $("#gallery > a:nth-child(1)").html(img);
                  
   
        //         //    document.body.appendChild(img);
        //         },
        //         {maxHeight: 600} // Options
        //     );
        Ahdin.compress({
        sourceFile: files[0],
        maxHeight: 500,
        outputFormat: 'png'
      }).then(function(compressedBlob) {
        console.log(compressedBlob)
        var urlCreator = window.URL || window.webkitURL;
        var i = urlCreator.createObjectURL( compressedBlob );
        console.log(i)
        var oImg=document.createElement("img");
oImg.setAttribute('src', i);
$("#gallery > a:nth-child(1)").html(oImg);
setTimeout(function(){ 
         $("#gallery").justifiedGallery({
        rowHeight : 500,
        margins : 7}
        
    );
    }, 1000);
      });
            // Upload.upload({url: '/api/upload', file: files[0]}).success(function (data, status, headers, config) {
            //     console.log(data.path)
            // });
        }else{
            // Materialize.toast('No file detected', 2000);
            // return
        }
    };

}