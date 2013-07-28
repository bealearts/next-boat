
var Pier = function(id, name, status)
{
	this.id = id || '';
	this.name = name || '';
	this.status = status || null;

	Immutable.construct(this);
}