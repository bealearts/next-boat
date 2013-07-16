
/**
 * A Streaming implementation of the $q.defer() and Promise mechanisms
 */
module.factory('StreamingPromise', ['$rootScope', function ($rootScope) {

	var StreamingPromise = function()
	{
		var self = this;

		this.defer = function() 
		{
			var callbacks = [], pending = true;
			var value, deferred;

			deferred = {

			  resolve: function(val) 
			  {
			    pending = false;

			    if (callbacks) {
			      value = ref(val);

			      if (callbacks.length) {
			        $rootScope.$evalAsync(function() {
			          var callback;
			          for (var i = 0, ii = callbacks.length; i < ii; i++) {
			            callback = callbacks[i];
			            value.then(callback[0], callback[1]);
			          }
			        });
			      }
			    }
			  },


			  reject: function(reason) {
			    deferred.resolve(reject(reason));
			  },


			  promise: {
			    then: function(callback, errback) {
			      var result = self.defer();

			      var wrappedCallback = function(value) {
			        try {
			          result.resolve((callback || defaultCallback)(value));
			        } catch(e) {
			          exceptionHandler(e);
			          result.reject(e);
			        }
			      };

			      var wrappedErrback = function(reason) {
			        try {
			          result.resolve((errback || defaultErrback)(reason));
			        } catch(e) {
			          exceptionHandler(e);
			          result.reject(e);
			        }
			      };

			      callbacks.push([wrappedCallback, wrappedErrback]);

			      if (!pending) 
			      {
			        value.then(wrappedCallback, wrappedErrback);
			      }

			      return result.promise;
			    }
			  }
			};

			return deferred;
		};


	/* PRIVATE */

	var ref = function(value) 
	{
		if (value && value.then) return value;
		return {
		  then: function(callback) {
		    var result = self.defer();
		    $rootScope.$evalAsync(function() {
		      result.resolve(callback(value));
		    });
		    return result.promise;
		  }
		};
		};
	}
	
	return new StreamingPromise;
}]);