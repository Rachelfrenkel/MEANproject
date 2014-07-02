angular.module("logoutController", []).controller("logoutController", function($scope, $http) {
	$scope.tagline = "goodbye!";
	$http.get('/logout');
	$location.path("/home");
});
