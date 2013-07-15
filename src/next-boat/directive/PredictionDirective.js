
module.directive('nbPrediction', [function(){
	
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'next-boat/directive/PredictionDirective.html',
		scope: {
			predictions: '='
		},
		controller: 'PredictionDirectiveCtrl'
	};

}]);
