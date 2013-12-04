(function(global){
"use strict";

var R = global.R;

var Map = R.Map = function(w, h, terrain){
	var i, j;

	this.tiles = [];
	this.objects = [];

	if (terrain) {
		return this.loadMap(terrain);
	}

	if (w && h){
		this.width = w;
		this.height = h;

		for (i=0; i<w; i++) {
			this.tiles[i] = [];
			for (j=0; j<h; j++) {
				this.tiles[i][j] = R.buildTile('space');
			}
		}
	}
};

R.Map.prototype = {
	width: 100,
	height: 75,
	tiles: null,
	objects: null,

	getTile: function(x, y){
		if (this.isOnMap(x,y)){
			return this.tiles[x][y];
		}
		throw new R.OutOfBoundsException(x, y);
	},

	getObject: function(x, y){
		for (var i=0; i<this.objects.length; i++) {
			if (this.objects[i].x === x && this.objects[i].y === y) {
				return this.objects[i];
			}
		}
		return null;
	},

	addObject: function(obj, x, y) {
		this.placeObj(obj, x, y);
		this.objects.push(obj);
	},

	moveObj: function(obj, dir){
		return this.placeObj(obj, obj.x+dir.dx, obj.y+dir.dy);
	},

	placeObj: function(obj, x, y) {
		var tile, otherObj;

		if (!this.isOnMap(x,y)) {
			throw new R.OutOfBoundsException(x, y);
		}

		//tile = 

		otherObj = this.getObject(x, y);
		// TODO It should be possible to have multiple objects in pne place
		if (otherObj) {
			throw new R.PositionTakenException(x, y);
		}

		obj.x = x;
		obj.y = y;

		return obj;
	},

	isOnMap: function(x, y) {
		return 0<=x && x<this.width && 0<=y && y<this.height;
	},

	loadMap: function(terrain){

		var w, h, x, y, rows = terrain.split('\n');

		h = rows.length;
		w = rows[0].length;

		console.log("terrain width: ", w, "height: ", h, "\ndata: ", rows);

		this.width = w;
		this.height = h;
		this.tiles = [];

		for (x=0; x<w; x++) {
			this.tiles[x] = [];
			for (y=0; y<h; y++) {
				this.tiles[x][y] = new R.Tile(R.TERRAIN_ICON_TO_TYPE[rows[y][x]]);
			}
		}
	},

	loadObjects: function(objectData){
		var i=0, l=objectData.length, objData;
		for (; i<l; i++) {
			objData = objectData[i];
			this.addObject(R.objFactory(objData.type), objData.x, objData.y);
		}
	},

	loadPlayer: function(playerData){
		var player = R.objFactory(playerData.type);
		this.addObject(player, playerData.x, playerData.y);
		return player;
	}

};

R.Tile = function(options){
	this.type = options.type;
	this.icon = options.icon;
	if (typeof options.blockPath !== "undefined") {
		this.blockPath = options.blockPath;
	}
	if (typeof options.blockLOS !== "undefined") {
		this.blockLOS = options.blockLOS;
	}
};

R.Tile.prototype = {
	icon: '',
	type: '',
	blockPath: false,
	blockLOS: false
};

R.TERRAIN_TYPES = {
	space: {type: 'space', icon: ' ', blockPath: false, blockLOS: false},
	wall: {type: 'wall', icon: '#', blockPath: true, blockLOS: true},
	corridor: {type: 'corridor', icon: ' '},
	water: {type: 'water', icon: '♒︎'}
};

R.TERRAIN_ICON_TO_TYPE = {};

(function(R){
	for (var type in R.TERRAIN_TYPES) {
		R.TERRAIN_ICON_TO_TYPE[R.TERRAIN_TYPES[type].icon] = R.TERRAIN_TYPES[type];
	}
})(R);

R.tileFromIcon = function(icon) {
	return (R.TERRAIN_ICON_TO_TYPE[icon]);
};

R.buildTile = function(type){
	if (typeof type === 'string') {
		type = R.TERRAIN_TYPES[type];
	}
	return new R.Tile(type);

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
var DIRECTIONS = R.DIRECTIONS = {
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



var RogueException = R.RogueException = function(msg, name){
	this.name = name || "RogueException";
	this.message = msg || "There was an unexpected error in the game";
	this.toString = function(){
		str = this.name + ": " + this.message;
		if (! isNaN(this.x) && !isNaN(this.y)) {
			str += "\nAt position " + this.x + ',' + this.y;
		}
		return str;
	};
};

R.RogueException.prototype = new Error();

/**
 * Throw this error if a position is out side the confines of the map
 * msg
 */
R.OutOfBoundsException = function(x, y){
	this.x = x;
	this.y = y;
};
R.OutOfBoundsException.prototype = new RogueException("Position is outside of the map", "Out of Bounds Error");

R.PositionTakenException = function(x, y){
	this.x = x;
	this.y = y;
};
R.PositionTakenException.prototype = new RogueException("Position is taken by another object", "Position Taken Error");

R.PositionImpassibleException = function(x, y, tile){
	this.x = x;
	this.y = y;
	this.tile = tile;
};
R.PositionImpassibleException.prototype = new RogueException("Terrain impassible", "Position Impassible Error");

function MapSeriallizer(){

}

MapSeriallizer.prototype = {
	tileKey: {

	},
	iconKey:{},

	save: function(map){

	},
	/**
	 * returns a map object
	 */
	load: function(string){





	}
};

// Generate the mapping of icons to tiles
for (var tile in MapSeriallizer.prototype.tileKey) {
	MapSeriallizer.prototype.iconKey[MapSeriallizer.prototype.tileKey[tile]] = tile;
}




})(this);