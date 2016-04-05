angular
	.module('app')
	.service('Images', Images);

Images.$inject = ['$resource'];

function Images($resource) {
	return $resource('/api/image/:id', null, {
		update: {
      		method: 'PUT'
    	},
    	delete: { 
    		method: 'DELETE', params: {id: 'id'} 
    	}
	});
}