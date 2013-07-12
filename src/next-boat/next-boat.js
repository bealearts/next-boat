(function(){

	"use strict";

	var module = angular.module('next-boat', []);
	
	/* Module Config */
	module.config(function ($routeProvider, $locationProvider){
		$routeProvider.when('/', {
			templateUrl: 'next-boat/view/MainView.html',
			controller: 'MainCtrl'
		});

		$locationProvider.html5Mode(true)
	});


	/* Domain Objects */
	<!--(bake domain/Pier.js)-->
	<!--(bake domain/Boat.js)-->
	<!--(bake domain/Prediction.js)-->


	/* Directives */


	/* Controllers */
	<!--(bake view/MainCtrl.js)-->


	/* Services */
	<!--(bake service/RiverBusPredictionsService.js)-->

}());