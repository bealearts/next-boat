"use strict";

angular.module('next-boat', []).config(function ($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'next-boat/view/main.html'
	});
});