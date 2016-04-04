angular
    .module('app')
    .controller('DashboardImageController', DashboardImageController)

DashboardImageController.$inject = ['$stateParams', 'Upload', 'Image'];

function DashboardImageController($stateParams, Upload, Image){ 
    var vm = this;
    vm.upload = upload;
    vm.caption = ''
    vm.image_link = ''
    vm.add_image = add_image
    vm.uploaded = false;
    vm.style = ''
    componentHandler.upgradeAllRegistered();

    function upload(files,path,index) {
        // if (! add_caption_dialog.showModal) {
        //     dialogPolyfill.registerDialog(add_caption_dialog);
        // }   
        // add_caption_dialog.showModal();
        // add_caption_dialog.querySelector('.close').addEventListener('click', function() {
        //     dialog.close();
        // });
        if (files && files.length) {
            Upload.upload({url: '/api/upload', file: files[0]}).success(function (data, status, headers, config) {
                vm.uploaded = true;
                vm.style = "url('"+data.path+"') center / cover";
                vm.image_link = data.path;
            });
        }else{
            
        }
    };
    
    function add_image(){
        if(vm.image_link){
            var data = {id: $stateParams.id, url: vm.image_link, caption: vm.caption}
            var new_image = Image.save(data)
            
            new_image.$promise
            .then(function(image){
                if(image.response === "Server Error" || image.response === "No Album Found"){
                    toastr.error(image.response)
                }else{
                    toastr.success('Image Added')
                    // get_album();                
                }
            })
            .catch(function(response) {
                toastr.error('Server Error')
            })
        
            
        }else{
            toastr.error('You must select an image');
        }
    }

}

// Ahdin.compress({
//     sourceFile: files[0],
//     maxHeight: 500,
//     outputFormat: 'png'
// }).then(function(compressedBlob) {
//     console.log(compressedBlob)
//     var urlCreator = window.URL || window.webkitURL;
//     var i = urlCreator.createObjectURL( compressedBlob );
//     console.log(i)
//     var oImg=document.createElement("img");
//     oImg.setAttribute('src', i);
//     $("#gallery > a:nth-child(1)").html(oImg);
//     setTimeout(function(){ 
//         $("#gallery").justifiedGallery({
//             rowHeight : 500,
//             margins : 7}
//         );
//     }, 1000);
// });