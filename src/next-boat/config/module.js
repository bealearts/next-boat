	
/* Module Config */
module.config(function ($routeProvider, $locationProvider){
	$routeProvider.when('/', {
		templateUrl: 'next-boat/view/MainView.html',
		controller: 'MainCtrl'
	});

	$locationProvider.html5Mode(true)
});