angular
    .module('app')
    .controller('DashboardPhotosController', DashboardPhotosController)

DashboardPhotosController.$inject = ['Album','Auth', 'check_user', '$location'];

function DashboardPhotosController(Album, Auth, check_user, $location){ 
    componentHandler.upgradeAllRegistered();
    
    var vm = this;
    vm.add_album = add_album;
    vm.save_album = save_album;
    vm.edit_album = edit_album;
    vm.update_album = update_album;
    vm.remove_album = remove_album;
    vm.delete_album = delete_album;
    vm.navigate_album = navigate_album;
    vm.album_name = '';
    vm.album_detail = null;
    vm.user = null;
    vm.albums = [];
    
    get_album()    
    
    var dialog = document.querySelector('dialog');
    var edit_album_dialog = document.querySelector('.edit_album_dialog');
    var delete_album_dialog = document.querySelector('.delete_album_dialog');
    
    function add_album(){
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }   
        dialog.showModal();
        dialog.querySelector('.close').addEventListener('click', function() {
            vm.album_name = '';
            dialog.close();
        });
    }
    
    function get_album(){
        Album.get({ id: check_user._id}, function(albums){
            if(albums.response === "Server Error"){
                toastr.error('Server Error')
            }else{
                vm.albums = albums.response;       
                setTimeout(function(){ 
                    componentHandler.upgradeAllRegistered(); 
                }, 10);                        
            }
        }, function(){
            toastr.error('Server Error')
        })
    }

    function save_album(){        
        var album = {name: vm.album_name, user: check_user._id}
        var new_album = Album.save(album);
        
        new_album.$promise
        .then(function(album){
            if(album.response === "Server Error"){
                toastr.error('Server Error')
            }else{
                toastr.success(vm.album_name + ' Album Added')
                get_album();                
            }
        })
        .catch(function(response) {
            toastr.error('Server Error')
        })
        
        vm.album_name = '';
        dialog.close();
    }
    
    function edit_album(album){
        vm.album_detail = album;
        if (! edit_album_dialog.showModal) {
            dialogPolyfill.registerDialog(edit_album_dialog);
        }   
        edit_album_dialog.showModal();
        edit_album_dialog.querySelector('.close').addEventListener('click', function() {
            vm.album_detail = null
            edit_album_dialog.close()
        });
    }
    
    function update_album(){
        Album.update(vm.album_detail, function(result){
            var result = result.response
            if(result === "Server Error" || result === "No Album Found"){
                toastr.error(result)
            }else{
                toastr.success(vm.album_detail.name + " Successfully Updated")
            }
            get_album()             
            edit_album_dialog.close()
        });
    }
    
    function remove_album(album){
        vm.album_detail = album;
        if (! delete_album_dialog.showModal) {
            dialogPolyfill.registerDialog(delete_album_dialog);
        }   
        delete_album_dialog.showModal();
        delete_album_dialog.querySelector('.close').addEventListener('click', function() {
            vm.album_detail = null
            delete_album_dialog.close()
        });
    }
    
    function delete_album(){
        Album.delete({id: vm.album_detail._id},function(data){
            if(data.response === "Server Error"){
                toastr.error("Server Error")
            }else if(data.response.n === 1){
                toastr.success(vm.album_detail.name + " Album Successfully Deleted!")             
                vm.album_detail = null
                get_album()             
                delete_album_dialog.close()   
            }
        });
    }
    
    function navigate_album(album){
        $location.path('/dashboard/photos/'+album._id)
    }
}