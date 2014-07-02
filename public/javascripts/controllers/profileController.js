angular.module('profileController', []).controller("profileController", function($scope, $http) {
	$scope.tagline = "Welcome to your profile page";
	console.log("stufffff");
	// $scope.displayProfile = function() {
	// 	$http.get('/profile').then(function(response) {
	// 		$scope.tagline = response.data;
	// 		console.log('user object: ' + angular.toJson(response.data));
	// 		console.log(response.data[0]);
	// 	});
	// };
	$http.get('/profile').then(function(response) {
			$scope.tagline = "Hi " + response.data.user[0].name + ", this is your profile page";
	});
});