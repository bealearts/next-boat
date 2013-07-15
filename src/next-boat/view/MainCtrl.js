
module.controller('MainCtrl', ['$scope', 'RiverBusPredictionsService', function ($scope, riverBusPredictionsService){

	$scope.topPier = new Pier('9300GLP', 'Greenland');
	$scope.bottomPier = new Pier('930CAW', 'Canary Wharf');


	$scope.topPierPredictions = riverBusPredictionsService.subscribe($scope.topPier);
	$scope.bottomPierPredictions = riverBusPredictionsService.subscribe($scope.bottomPier);

}]);