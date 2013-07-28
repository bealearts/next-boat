
var Boat = function(direction, destination)
{
	this.direction = direction || '';
	this.destination = destination || '';

	Immutable.construct(this);
}