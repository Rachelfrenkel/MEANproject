 angular.module('homeController',[]).controller('homeController', function($scope, $http, $rootScope) {


	// display all users and determines whether or not to show logout link
	$scope.display = function() {
		console.log("executed display all from home controller.");
		$http.get('/home').then(function(response) {
			if (response.data.current != null) {
				$scope.userSeshExists = true;
				$scope.showLogout = true;
				$scope.currentUser = response.data.current;
			} else {
				$scope.showLogout = false;
				$scope.userSeshExists = false;
			}
			$scope.allUsers = response.data.otherNames;
		});
	};
	$scope.display();

});