
module.directive('nbPrediction', function(){
	
	var directive = {
		restrict: 'E',
		replace: true,
		templateUrl: 'next-boat/directive/PredictionDirective.html',
		scope: {
			predictions: '='
		}
	};

	return directive;
});
