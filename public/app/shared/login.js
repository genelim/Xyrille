angular
	.module('app')
	.service('Login', Login);

Login.$inject = ['$resource'];

function Login($resource) {
	return $resource('/api/login');
}