	
module.factory('RiverBusPredictionsService', function ($http, $log, $q, $timeout){

	var URL = '/service/';
	
	var RiverBusPredictionsService = function()
	{
		/* PUBLIC */

		this.subscribe = function(pier) 
		{
			if (!pierToDeferMap[pier.id])
			{
				pierToDeferMap[pier.id] = $q.defer();
				pierToPredictionsMap[pier.id] = [];
			}

			if (!dataRequestInProgress)
			{
				getData();
			}

			return pierToDeferMap[pier.id].promise;
		}

		this.unsubscribe = function(pier)
		{
			delete pierToDeferMap[pier.id];
			delete pierToPredictionsMap[pier.id];
		}


		/* PRIVATE */

		var pierToDeferMap = {};

		var pierToPredictionsMap = {};

		var dataRequestInProgress = false;

		var pollingPromise;


		function getData() 
		{
			dataRequestInProgress = true;

			clearPredictions();

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

					var predictions = pierToPredictionsMap[item[2]];	

					if (predictions)
					{
						var prediction = new Prediction();

						prediction.pier.id = item[2];
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
			});	
		}	


		function clearPredictions()
		{
			for (var pierId in pierToPredictionsMap)
			{
				pierToPredictionsMap[pierId] = [];
			}
		}


	};


	return new RiverBusPredictionsService();
});