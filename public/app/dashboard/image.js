angular
    .module('app')
    .controller('DashboardImageController', DashboardImageController)

DashboardImageController.$inject = ['$stateParams', 'Upload', 'Images', '$http', 'Ahdin'];

function DashboardImageController($stateParams, Upload, Images, $http, Ahdin){ 
    var vm = this;
    vm.upload = upload;
    vm.add_image = add_image;
    vm.get_album = get_album;
    vm.enable_preview = enable_preview;
    vm.remove_image = remove_image;
    vm.delete_image = delete_image;
    vm.update_caption = update_caption;
    vm.edit_caption = edit_caption;
    vm.total_images = 0;
    vm.caption = null;
    vm.caption_change = null;
    vm.temp_caption = null;
    vm.image_link = null;
    vm.temp_remove_image = null;
    vm.style = null
    vm.album = null;
    vm.uploaded = false;
    componentHandler.upgradeAllRegistered();
    
    get_album();

    function get_album(){
        $http.get('/api/image_album/'+$stateParams.id)
        .success(function(album){
            if(album.response === "Server Error"){
                toastr.error('Server Error')
            }else{
                vm.album = album.response;  
                vm.total_images = vm.album.image.length;
                setTimeout(function(){ 
                    componentHandler.upgradeAllRegistered(); 
                }, 10);                        
            }
        })
        .error(function(){
            toastr.error('Server Error')            
        })
    }
    
    function upload(files,path,index) {
        if (files) {
            console.log(files)
            if(files.length <= 1 && files.length > 0){
                console.log(files.length)
                var _URL = window.URL || window.webkitURL;
                img = new Image();
                img.onload = function () {
                    if(this.width > 500){
                        Upload.upload({url: '/api/upload', file: files[0]}).success(function (data, status, headers, config) {
                            vm.uploaded = true;
                            console.log(data)
                            vm.style = "url('"+data.url_thumbnail+"') center / cover";
                            vm.image_link = data;
                        });
                    }else{
                        toastr.warning('Image size must be atleast 500px');
                    }
                };
                img.src = _URL.createObjectURL(files[0]);
            }else{
                toastr.warning('Only accepts One Image at a time.');
            }            
        }else{
            toastr.warning('Image is not uploaded');
        }
    };
    
    function add_image(){
        if(vm.image_link){
            var data = {id: $stateParams.id, url: vm.image_link, caption: vm.caption}
            $http.post('/api/image', data)
            .success(function(image){
                if(image.response === "Server Error" || image.response === "No Album Found"){
                    toastr.error(image.response)
                }else{
                    toastr.success('Image Added')
                    get_album();                
                }
                vm.style = null;
                vm.uploaded = null;
                vm.caption = null;
            })
            .error(function(response) {
                toastr.error('Server Error')
            })
        }else{
            toastr.error('You must select an image');
        }
    }
    
    function enable_preview(image){
        for( var i = 0; i < vm.album.image.length; i++){
            vm.album.image[i].star = false;
        }
        image.star = true;
        $http.put('/api/image_album', vm.album)
        .success(function(result){
            toastr.success('Updated Star')
        })
        .error(function(){
            toastr.error('Server Error')
        })
    }
    
    var delete_image_dialog = document.querySelector('.delete_image_dialog');
    
    function remove_image(image){
        vm.temp_remove_image = image;
        if (! delete_image_dialog.showModal) {
            dialogPolyfill.registerDialog(delete_image_dialog);
        }   
        delete_image_dialog.showModal();
        delete_image_dialog.querySelector('.close').addEventListener('click', function() {
            vm.temp_remove_image = null
            delete_image_dialog.close()
        });        
    }
    
    function delete_image(){
        var index = null;
        var disallow = false;
        for( var i = 0; i < vm.album.image.length; i++){
            if(vm.temp_remove_image._id == vm.album.image[i]._id){
                if(!vm.album.image[i].star){
                    index = i;                    
                }else{
                    disallow = true;
                }
                break;
            }
        }
        if(disallow){
            toastr.error('You cannot delete a starred image')
        }else{
            vm.album.image.splice(index, 1);
            $http.put('/api/image_album', vm.album)
            .success(function(result){
                toastr.success('Successfully Deleted Image')
            })
            .error(function(){
                toastr.error('Server Error')
            })
        }
        vm.temp_remove_image = null;
        delete_image_dialog.close()     
    }
    
    var edit_image_dialog = document.querySelector('.edit_image_dialog');
    
    function edit_caption(caption){
        vm.temp_caption = caption
        if (! edit_image_dialog.showModal) {
            dialogPolyfill.registerDialog(edit_image_dialog);
        }   
        vm.caption_change = vm.temp_caption.caption
        edit_image_dialog.showModal();
        edit_image_dialog.querySelector('.close').addEventListener('click', function() {
            vm.temp_caption = null
            edit_image_dialog.close()
        });    
    }
    
    function update_caption(){
        for( var i = 0; i < vm.album.image.length; i++){
            if(vm.temp_caption._id == vm.album.image[i]._id){
                vm.album.image[i].caption = vm.caption_change
                break;
            }
        }
        $http.put('/api/image_album', vm.album)
        .success(function(result){
            toastr.success('Successfully Updated Caption')
        })
        .error(function(){
            toastr.error('Server Error')
        })
        vm.temp_caption = null;
        vm.caption_change = null;
        edit_image_dialog.close()     
    }
}


    // $("#gallery").justifiedGallery({
    //     rowHeight : 500,
    //     margins : 7}
    // );
    
// loadImage(
//                     imageUrl,
//                     function (img) {
//                         if(img.type === "error") {
//                             console.log("Error loading image " + imageUrl);
//                         } else {
//                             // document.body.appendChild(img);
//                             $("#gallery > a:nth-child(1)").html(img);
//                             setTimeout(function(){ 
//                                 $("#gallery").justifiedGallery({
//                                     rowHeight : 500,
//                                     margins : 7}
//                                 );
//                             }, 1000);
//                         }
//                     },
//                     {maxWidth: 600}
//                 );


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