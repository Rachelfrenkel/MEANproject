angular.module('viewRoutesSetUp',[])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: '/views/home.html',
			controller: 'homeController'
		});

		// home page
		$routeProvider.when('/home', {
			templateUrl: '/views/home.html',
			controller: 'homeController'
		});
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

		$routeProvider.when('/logout', {
			templateUrl: "views/logout.html",
			controller: "logoutController"
		});

		$routeProvider.when('/admin', {
			templateUrl: "views/admin.html",
			controller: "adminController"
		});
		
	$locationProvider.html5Mode(true);
}]);