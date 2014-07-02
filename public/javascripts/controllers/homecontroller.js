 angular.module('homeController',[]).controller('homeController', function($scope, $http) {

	// display all users
	$http.get('/home').then(function(response) {
		console.log(response.data);
		console.log(response.data.allOthers);
		console.log(response.data.allOthers[0].name);
		console.log(response.data.current.name);
		//console.log(response.data[1]);
		//console.log(response.data[1].allOther);
		$scope.currentUser = response.data.current.name;
		$scope.allUsers = response.data.allOthers;
	});
});