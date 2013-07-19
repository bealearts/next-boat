
module.directive('nbPier', [function(){
	
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'next-boat/directive/PierDirective.html',
		scope: {
			pier: '='
		}
	};

}]);