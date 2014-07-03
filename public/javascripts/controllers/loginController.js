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
				// check to see if admin is logged in
				console.log("this is the username coming from the login controller: " + angular.toJson(response.data));
				if (response.data == "admin") {
					$location.path("/admin");
				} else {
					$location.path("/profile");
				}
				//sessionService.sessID = name; // set the session id
			} , 
			function(response) {
				console.log('failed login');
				$scope.tagline = "Password or username invalid, try again.";
				$location.path("/login");
			}
		);
	};

	$http.get("login");
});



