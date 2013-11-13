function Map(w, h){
	if (w && h){
		this.width = w;
		this.height = h;
	}
}

Map.prototype = {
	width: 100,
	height: 75,
	grid: [],
	objects: [],
	getObject: function(x, y){
		for (var i=0; i<this.objects.length; i++) {
			if (this.objects[i].x === x && this.objects[i].y === y) {
				return this.objects[i];
			}
		}
		return null;
	},

	addObject: function(obj) {
		this.objects.push(obj);
	}

};

var Pos = new Array();
Pos.prototype = {
	set: function(x, y) {
		this[0] = x;
		this[1] = y;
	}
};

var Dir = function(dx, dy) {
	this.dx = dx;
	this.dy = dy;
};
var DIRECTIONS = {
	n: new Dir(0, -1),
	ne: new Dir(1, -1),
	e: new Dir(1, 0),
	se: new Dir(1, 1),
	s: new Dir(0, 1),
	sw: new Dir(-1, 1),
	w: new Dir(-1, 0),
	nw: new Dir(-1, -1),
	still: new Dir(0, 0),
};

