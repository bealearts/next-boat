(function(){

	"use strict";

	var module = angular.module('next-boat', []);
	
	// Setup Module
	module.config(function ($routeProvider, $locationProvider){
		$routeProvider.when('/', {
			templateUrl: 'next-boat/view/MainView.html',
			controller: 'MainCtrl'
		});

		$locationProvider.html5Mode(true)
	});

	/* Controllers */
	<!--(bake view/MainCtrl.js)-->

	/* Services */
	<!--(bake service/RiverBusPredictionsService.js)-->

}());