angular
	.module('app')
	.service('Register', Register);

Register.$inject = ['$resource'];

function Register($resource) {
	return $resource('/api/register');
}