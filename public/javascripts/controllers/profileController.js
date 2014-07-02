angular.module('profileController', []).controller("profileController", function($scope, $http) {
	$scope.tagline = "Welcome to your profile page";
	// $scope.displayProfile = function() {
	// 	$http.get('/profile').then(function(response) {
	// 		$scope.tagline = response.data;
	// 		console.log('user object: ' + angular.toJson(response.data));
	// 		console.log(response.data[0]);
	// 	});
	// };d
	$http.get('/profile').then(function(response) {
		console.log(response.data[0].name);
		//console.log(response.data);
		$scope.username = response.data[0].name;
	});
});