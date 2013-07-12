
module.controller('MainCtrl', function ($scope, RiverBusPredictionsService){

	$scope.topPier = new Pier('9300GLP', 'Greenland');
	$scope.bottomPier = new Pier('930CAW', 'Canary Wharf');


	$scope.topPierPredictions = RiverBusPredictionsService.subscribe($scope.topPier);
	$scope.bottomPierPredictions = RiverBusPredictionsService.subscribe($scope.bottomPier);


	$scope.minutesUntil = function(time)
	{
		var now = new Date();
		var MINUTES = 60*1000;

		return Math.ceil( (time.getTime()-now.getTime()) / MINUTES);
	}

});