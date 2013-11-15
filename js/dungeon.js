function Map(w, h){
	var i, j;
	if (w && h){
		this.width = w;
		this.height = h;

		for (i=0; i<w; i++) {
			this.tiles[i] = [];
			for (j=0; j<h; j++) {
				this.tiles[i][j] = new Tile();
			}
		}
	}
}

Map.prototype = {
	width: 100,
	height: 75,
	tiles: [],
	objects: [],

	getTile: function(x, y){
		if (this.isOnMap(x,y)){
			return this.tiles[x][y];
		}
		throw new OutOfBoundsException(x, y);
	},

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
	},

	moveObj: function(obj, dir){
		return this.placeObj(obj, obj.x+dir.dx, obj.y+dir.dy);
	},

	placeObj: function(obj, x, y) {
		var tile, otherObj;

		if (!this.isOnMap(x,y)) {
			throw new OutOfBoundsException(x, y);
		}

		tile = 

		otherObj = this.getObject(x, y);
		// TODO It should be possible to have multiple objects in pne place
		if (otherObj) {
			throw new PositionTakenException(x, y);
		}

		obj.x = x;
		obj.y = y;

		return obj;
	},

	isOnMap: function(x, y) {
		return 0<=x && x<this.width && 0<=y && y<this.height;
	}

};

function Tile(blocked, blockLOS){
	if (typeof blocked !== "undefined") {
		this.blocked = blocked;
	}
	if (typeof blockLOS !== "undefined") {
		this.blockLOS = blockLOS;
	}

}
Tile.prototype = {
	blocked: true,
	blockLOS: true
};

function Room(x, y, w, h){
	this.x1 = x;
	this.x2 = x+w;
	this.y1 = y;
	this.y2 = y+h;
}
Room.prototype = {
	x1:null,
	y1:null,
	x2:null,
	y2:null
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



function RogueException(msg, name){
	this.name = name || "RogueException";
	this.message = msg || "There was an unexpected error in the game";
	toString = function(){
		str = this.name + ": " + this.message;
		if (! isNaN(this.x) && !isNaN(this.y)) {
			str += "\nAt position " + this.x + ',' + this.y;
		}
		return str;
	};
}
RogueException.prototype = new Error();

/**
 * Throw this error if a position is out side the confines of the map
 * msg
 */
function OutOfBoundsException(x, y){
	this.x = x;
	this.y = y;
}
OutOfBoundsException.prototype = new RogueException("Position is outside of the map", "Out of Bounds Error");

function PositionTakenException(x, y){
	this.x = x;
	this.y = y;
}
PositionTakenException.prototype = new RogueException("Position is taken by another object", "Out of Bounds Error");