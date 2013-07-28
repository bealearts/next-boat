
(function (global) {

	if (!global.Immutable)
	{
		global.Immutable = {};


		/* Immutable */


		global.Immutable.create = function (protoFunc, properties)
		{
			if (typeof(protoFunc) === 'function')
				var obj = new protoFunc(properties);
			else	
				var obj = Object.create(proto, properties);
			
			makeImmutable(obj);
			return obj; 
		};


		global.Immutable.clone = function (obj, properties)
		{
			var result = deepClone(obj);


			// Modify properties
			if (properties)
			{
				for (member in properties)
				{
					result[member] = properties[member];
				}
			}


			makeImmutable(result);
			return result;
		};



		/* Immutable Array */


		global.Immutable.Array = function ()
		{
			var immutableArray = Object.create( Array.prototype );

			immutableArray = Array.apply(immutableArray, arguments);

			return immutableArray;
		};

		global.Immutable.Array.isImmutable = function (array)
		{

		}

		// Override mutating functions
		var funcs = ['push', 'unshift', 'reverse', 'splice'];
		funcs.forEach(function(name) {
		    global.Immutable.Array.prototype[name] = function() {
		        var clone = global.Immutable.clone(this);
		        var args = Array.prototype.slice.call(arguments, 0);
		        
		        clone[name].apply(clone, args);
		        
		        return clone;
		    }
		});




		/* PRIVATE */


		function makeImmutable(obj)
		{
			Object.freeze(obj);
		}


		// Deep property Clone while maintining 'type'
		function deepClone(obj)
		{
			return JSON.parse(JSON.stringify(obj), function(prop, value) { 
				if (value && typeof(value) === 'object') 
				{
					if (Array.isArray(value))
						var typed = new global.Immutable.Array();
					else	
						var typed = new obj.constructor;
					
					var typedRef = typed;
					
					Object.keys(value).forEach(function(prop) {
						if (typeof(value[prop]) !== 'function')  
							typedRef[prop] = value[prop];				
					});

					typedRef = null;
					return typed;
				}
				else
					return value; 
			});			
		}

	}
	
}.call({}, this));