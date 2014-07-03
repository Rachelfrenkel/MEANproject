angular.module("adminController", []).controller("adminController", function($scope, $http) {

	$scope.checkAuth = function(){
		$http.get('/admin').then(function(response) {
			if (response.status == 401) {
				$location.path('/home');
				//$http.get('/home'); // prevent access to admin page for unauthorized 
			} else {
				$scope.tagline = "Behold, the POWER!";
			}
		});
	}
});