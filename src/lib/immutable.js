
(function (global) {

	if (!global.Immutable)
	{
		global.Immutable = {};


		/* Immutable */


		/**
		 * Create an Immutable Object from either;
		 * 		a Prototype Object and optional Object Definition Object
		 * 		or a Constructor Function and optional arguments Array
		 */
		global.Immutable.create = function (protoFunc, properties)
		{
			if (typeof(protoFunc) === 'function')
				var obj = new protoFunc(properties);
			else	
				var obj = Object.create(proto, properties);
			
			makeImmutable(obj);
			return obj; 
		};


		/**
		 * Clone an Immutable (or Mutable) Object returning an Immutable Object with
		 * optionaly changing any property defined in properties
		 */
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


		/**
		 * Construct an imutable object within a Constructor Function
		 */
		global.Immutable.construct = function(obj)
		{
			if (!cloneing) 
				makeImmutable(obj);
		}



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

		var cloneing = false;


		function makeImmutable(obj)
		{
			Object.freeze(obj);
		}


		// Deep property Clone while maintining 'type'
		function deepClone(obj)
		{
			cloneing = true;

			var result = JSON.parse(JSON.stringify(obj), function(prop, value) { 
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

			cloneing = false;

			return result;			
		}

	}
	
}.call({}, this));