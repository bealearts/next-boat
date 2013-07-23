
module.controller('PredictionsDirectiveCtrl', ['$scope', function($scope)
{
	$scope.minutesUntil = function(time)
	{
		var now = new Date();
		var MINUTES = 60*1000;

		return Math.ceil( (time.getTime()-now.getTime()) / MINUTES);
	}

	$scope.predictionFilter = function(prediction)
	{
		return prediction.boat.direction === $scope.direction && prediction.pier.status < 2;
	}

}]);