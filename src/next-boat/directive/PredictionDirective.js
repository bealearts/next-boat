
module.directive('nbPrediction', function(){
	
	var directive = {
		restrict: 'E',
		replace: true,
		templateUrl: 'next-boat/directive/PredictionDirective.html',
		scope: {
			predictions: '='
		},
		controller: function($scope)
		{
			$scope.minutesUntil = function(time)
			{
				var now = new Date();
				var MINUTES = 60*1000;

				return Math.ceil( (time.getTime()-now.getTime()) / MINUTES);
			}
		}
	};

	return directive;
});
