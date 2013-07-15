
module.controller('PredictionDirectiveCtrl', ['$scope', function($scope)
{
	$scope.minutesUntil = function(time)
	{
		var now = new Date();
		var MINUTES = 60*1000;

		return Math.ceil( (time.getTime()-now.getTime()) / MINUTES);
	}
}]);