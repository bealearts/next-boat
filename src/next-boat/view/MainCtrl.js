
module.controller('MainCtrl', ['$scope', 'RiverBusPredictionsService', function ($scope, riverBusPredictionsService){

	$scope.topPier = new Pier('9300GLP', 'Greenland');
	$scope.bottomPier = new Pier('930CAW', 'Canary Wharf');


	$scope.topPierPredictions = riverBusPredictionsService.subscribe($scope.topPier);
	$scope.bottomPierPredictions = riverBusPredictionsService.subscribe($scope.bottomPier);


	$scope.topPierPredictions.then(function (predictions) {
		if (predictions)
		{
			if (predictions.length == 0)
				$scope.topPier.status = null;
			else
				$scope.topPier.status = predictions[0].pier.status;
		}	
	});

	$scope.bottomPierPredictions.then(function (predictions) {
		if (predictions)
		{
			if (predictions.length == 0)
				$scope.bottomPier.status = null;
			else
				$scope.bottomPier.status = predictions[0].pier.status;
		}	
	});



	$scope.topPier.a = ['a'];
	console.log($scope.topPier);
	var im = Immutable.clone($scope.topPier);
	console.log(im);



}]);