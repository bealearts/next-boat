
module.directive('nbPredictions', [function(){
	
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'next-boat/directive/PredictionsDirective.html',
		scope: {
			pier: '=',
			predictions: '=',
			direction: '@',
		},
		controller: 'PredictionsDirectiveCtrl'
	};

}]);
