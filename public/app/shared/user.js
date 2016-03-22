angular
	.module('app')
	.service('User', User);

User.$inject = ['$resource'];

function User($resource) {
	return $resource('/api/user/:id', null, {
		update: {
      		method: 'PUT'
    	},
    	delete: { 
    		method: 'DELETE', params: {id: 'id'} 
    	},
    	query: {
    		method: 'GET',
    		isArray: false
    	}
	});
}