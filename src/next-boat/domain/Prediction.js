
var Prediction = function(pier, boat, expectedTime)
{
	this.pier = pier || new Pier();
	this.boat = boat || new Boat();
	this.expectedTime = expectedTime || new Date();

	//Immutable.construct(this);
}