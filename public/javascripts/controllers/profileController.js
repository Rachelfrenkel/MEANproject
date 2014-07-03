angular.module('profileController', []).controller("profileController", function($scope, $http, $rootScope) {
	$rootScope.showLogout = true;
	$scope.tagline = "Welcome to your profile page";
	$http.get('/profile').then(function(response) {
		console.log(response.data[0].name);
		//console.log(response.data);
		$scope.username = response.data[0].name;
	});

	// logout function
	$scope.terminateSesh = function() {
		console.log("executed termination");
		$http.get('/logout');
	};

});