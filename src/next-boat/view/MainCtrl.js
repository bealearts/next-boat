
module.controller('MainCtrl', function ($scope, RiverBusPredictionsService){

	$scope.predictions = RiverBusPredictionsService();

	$scope.minutesUntil = function(time)
	{
		var now = new Date();
		var MINUTES = 60*1000;

		return Math.ceil( (time.getTime()-now.getTime()) / MINUTES);
	}

	$scope.filterPiers = function(prediction)
	{ 
		return prediction.pier.name == 'Canary Wharf' || prediction.pier.name == 'Greenland'; 
	}

});