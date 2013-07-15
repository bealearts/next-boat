	
module.factory('RiverBusPredictionsService', ['$http', '$log', 'StreamingPromise', '$timeout', function ($http, $log, streamingPromise, $timeout){

	var URL = '/service/';
	
	var RiverBusPredictionsService = function()
	{
		/* PUBLIC */

		this.subscribe = function(pier) 
		{
			$log.info('Subscribing to predictions for pier:', pier.id);

			if (!pierToDeferMap[pier.id])
			{
				pierToDeferMap[pier.id] = streamingPromise.defer();
			}

			if (!dataRequestInProgress)
			{
				getData();
			}

			return pierToDeferMap[pier.id].promise;
		}

		this.unsubscribe = function(pier)
		{
			$log.info('Unsubscribing from predictions for pier "' + pier.id + '"');

			delete pierToDeferMap[pier.id];
		}


		/* PRIVATE */

		var pierToDeferMap = {};

		var pierToPredictionsMap = {};

		var dataRequestInProgress = false;

		var pollingPromise;


		function getData() 
		{
			dataRequestInProgress = true;

			// + 'StopCode2=930CAW,9300GLP'

			$log.info('Fetching data from server');

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

			http.success(function(data, status, headers, config) 
			{
				dataRequestInProgress = false;	

				// Process Server Response
				for (var i = 1; i<data.length; i++)
				{
					var item = data[i];
					var pierId = item[2];

					if (!pierToPredictionsMap[pierId])
					{
						pierToPredictionsMap[pierId] = [];
					}	

					var predictions = pierToPredictionsMap[pierId];	

					if (predictions)
					{
						var prediction = new Prediction();

						prediction.pier.id = pierId;
						prediction.pier.name = item[1];
						prediction.pier.status = item[3];
						prediction.boat.direction = item[4] == 1 ? 'East': 'West';
						prediction.boat.destination = item[5];
						prediction.expectedTime = new Date(item[6]);

						predictions.push(prediction);
					}
				}	

				// Update Promises
				for (var pierId in pierToDeferMap)
				{
					pierToDeferMap[pierId].resolve(pierToPredictionsMap[pierId]);
				}

				clearPredictions();

				// Start polling
				pollingPromise = $timeout(getData, 30000, false);
			});

			http.error(function(data, status, headers, config) 
			{
				$log.error(data);
				
				dataRequestInProgress = false;

				for (var pierId in pierToDeferMap)	
				{
					pierToDeferMap[pierId].reject([]);
				}

				clearPredictions();
			});	
		}	


		function clearPredictions()
		{
			pierToPredictionsMap = {};
		}


	};


	return new RiverBusPredictionsService();
}]);