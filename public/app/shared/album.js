angular
	.module('app')
	.service('Album', Album);

Album.$inject = ['$resource'];

function Album($resource) {
	return $resource('/api/album/:id', null, {
		update: {
      		method: 'PUT'
    	},
    	delete: { 
    		method: 'DELETE', params: {id: 'id'} 
    	}
	});
}