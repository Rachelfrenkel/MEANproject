angular.module("logoutController", []).controller("logoutController", function($scope, $http) {
	$scope.tagline = "goodbye!";

	$scope.logout = function() {
		console.log("called logout from angular side");
		$http.get('/logout');
	};
});
