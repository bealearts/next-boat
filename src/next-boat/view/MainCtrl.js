
module.controller('MainCtrl', function ($scope, RiverBusPredictionsService){

	$scope.predictions = RiverBusPredictionsService();



});