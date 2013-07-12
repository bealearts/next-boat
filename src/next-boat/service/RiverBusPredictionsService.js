	
module.factory('RiverBusPredictionsService', function ($http, $log, $q){

	var URL = '/service/';
	
	return function()
	{
		var deferred = $q.defer();

		// + 'StopCode2=930CAW,9300GLP'

		var http = $http({
			method: 'GET',
			url: URL,
			transformResponse: function(data)
			{
				// Clean up TFL JSON
				var result = data.replace(/\]/g, '],');
				result = '[' + result.replace(/\],$/, ']]');

				return JSON.parse(result);
			}	
		});

		http.success(function(data, status, headers, config) {
			$log.info(data);

			var predictions = [];

			for (var i = 1; i<data.length; i++)
			{
				var item = data[i];
				var prediction = new Prediction();

				prediction.pier.id = item[2];
				prediction.pier.name = item[1];
				prediction.pier.status = item[3];
				prediction.boat.direction = item[4] == 1 ? 'East': 'West';
				prediction.boat.destination = item[5];
				prediction.expectedTime = new Date(item[6]);

				predictions.push(prediction);
			}	

			deferred.resolve(predictions);
		});

		http.error(function(data, status, headers, config) {
			$log.error(data);
			
			deferred.reject();
		});	

		return deferred.promise;
	};
});