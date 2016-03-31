angular
	.module('app')
	.service('Auth', Auth);

Auth.$inject = ['$q', '$timeout', '$http', 'Login', 'Register'];

function Auth($q, $timeout, $http, Login, Register) {
    var user = null;    

    function getUserDetails() {
        var deferred = $q.defer();
        
        $http.post('/api/user/details')
        .success(function (data) {
            if(data.response){
                user = data.response;
                deferred.resolve(data.response);
            } else {
                user = false;
                deferred.reject(data.response);
            }
        })
        .error(function (data) {
            user = false;
            deferred.reject(data);
        });
            
        return deferred.promise;
    }

    function login(data) {
        
        var deferred = $q.defer();
        var login = Login.save(data)
            
        login.$promise
        .then(function(data){
            if(data){
                user = true;
                deferred.resolve();
            } else {
                user = false;
                deferred.reject(data.status);
            }
        })
        .catch(function(data) {
            user = false;
            deferred.reject(data);
        })

        return deferred.promise;
    }

    function logout() {

        var deferred = $q.defer();

        $http.post('/api/user/logout')
            .success(function (data) {
                user = false;
                deferred.resolve();
            })
            .error(function (data) {
                user = false;
                deferred.reject();
            });

        return deferred.promise;
    }

    function register(data) {
        
        var deferred = $q.defer();

        var new_user = Register.save(data); 
        
        new_user.$promise
        .then(function(user){
            deferred.resolve();
        })
        .catch(function(response) {
            deferred.reject(response);
        })

        return deferred.promise;
    }

    return ({
        getUserDetails: getUserDetails,
        login: login,
        logout: logout,
        register: register
    });  
}
