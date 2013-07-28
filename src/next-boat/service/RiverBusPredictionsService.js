	
module.factory('RiverBusPredictionsService', ['$http', '$log', 'StreamingPromise', '$timeout', function ($http, $log, streamingPromise, $timeout){

	var URL = '/service/';
	
	var RiverBusPredictionsService = function()
	{
		/* PUBLIC */

		this.subscribe = function(pier) 
		{
			$log.info('Subscribing to predictions for pier:', pier.id);

			if (!pierToSubscriptionMap[pier.id])
			{
				pierToSubscriptionMap[pier.id] = new Subscription(pier, streamingPromise.defer());
			}

			//if (!dataRequestInProgress)
			{
				getData();
			}

			return pierToSubscriptionMap[pier.id].deferrer.promise;
		}

		this.unsubscribe = function(pier)
		{
			$log.info('Unsubscribing from predictions for pier "' + pier.id + '"');

			delete pierToSubscriptionMap[pier.id];
		}


		/* PRIVATE */

		var pierToSubscriptionMap = {};	// The Subscribed to Piers

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
				url: getSearchUrl(),
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
						var prediction = new Prediction(
							new Pier(pierId, item[1], item[3]),
							new Boat(item[4] == 1 ? 'East': 'West', item[5]),
							new Date(item[6])
						);

						predictions.push(prediction);
					}
				}	

				// Update Promises
				for (var pierId in pierToSubscriptionMap)
				{
					pierToSubscriptionMap[pierId].deferrer.resolve(pierToPredictionsMap[pierId]);
				}

				clearPredictions();

				// Start polling
				pollingPromise = $timeout(getData, 30000, false);
			});

			http.error(function(data, status, headers, config) 
			{
				$log.error(data);
				
				dataRequestInProgress = false;

				for (var pierId in pierToSubscriptionMap)	
				{
					pierToSubscriptionMap[pierId].deferrer.reject([]);
				}

				clearPredictions();
			});	
		}	


		function clearPredictions()
		{
			pierToPredictionsMap = {};
		}


		function getSearchUrl()
		{
			var result = URL + '?StopPointName=';

			for (var pierId in pierToSubscriptionMap)
			{
				result += pierToSubscriptionMap[pierId].pier.name + ',';
			}

			return result;
		}


	};


	var Subscription = function (pier, deferrer)
	{
		this.pier = pier;
		this.deferrer = deferrer;
	}

	return new RiverBusPredictionsService();
}]);