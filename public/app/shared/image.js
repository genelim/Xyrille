angular
	.module('app')
	.service('Image', Image);

Image.$inject = ['$resource'];

function Image($resource) {
	return $resource('/api/image/:id', null, {
		update: {
      		method: 'PUT'
    	},
    	delete: { 
    		method: 'DELETE', params: {id: 'id'} 
    	}
	});
}