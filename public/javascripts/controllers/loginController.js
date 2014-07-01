angular.module("loginController", []).controller("loginController", function($scope, $http, $location) {
	$scope.tagline = "WELCOME TO THE LOGIN PAGE";

	$scope.loginAttmpt = function() {
		var userCreds = {
			name: this.name,
			password: this.password
		};

		console.log('user creds = ' + angular.toJson(userCreds));

		// $scope.tagline = 'hello';

		$http.post('/login', userCreds).then(function(response) {
			console.log('successful login');
				$scope.tagline = "successful login";
				$location.path("/profile");
				//sessionService.sessID = name; // set the session id
			} , 
			function(response) {
				console.log('failed login');
				$scope.tagline = "Password or username invalid, try again.";
				$location.path("/login");
			}
		);
	};
});



