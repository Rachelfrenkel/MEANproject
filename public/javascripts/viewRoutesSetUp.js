angular.module('viewRoutesSetUp',[])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: '/views/home.html',
			controller: 'homeController'
		});

		//nerds index page
		$routeProvider.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginController'
		});

		$routeProvider.when('/createacc', {
			templateUrl: 'views/createAcc.html',
			controller: 'createAccController'
		});

		$routeProvider.when('/profile', {
			templateUrl: "views/profile.html",
			controller: "profileController"
		});
	$locationProvider.html5Mode(true);
}]);