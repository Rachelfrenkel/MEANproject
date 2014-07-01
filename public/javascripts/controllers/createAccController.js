angular.module('createAccController',[]).controller('createAccController', function($scope, $http, $location) {

	$scope.tagline = 'Create an account';	

	$scope.addUser= function(){
		var user = {
			name: this.name,
			email: this.email,
			password: this.password
		};	
		$http.post('/createAcc', user).then(function(response) {
				$scope.tagline = "Success, you now have an account.";
				$location.path("/profile");
			} ,
			function(response) {
				$scope.tagline = "Sorry, failed to create user, username already exists.";
			}
		);	
	};
});