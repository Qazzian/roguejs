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
	n: new Dir(-1, 0),
	ne: new Dir(-1, 1),
	e: new Dir(0, 1),
	se: new Dir(1, 1),
	s: new Dir(1, 0),
	sw: new Dir(1, -1),
	w: new Dir(0, -1),
	nw: new Dir(-1, -1),
	still: new Dir(0, 0),
};

function AbstractObject(type, name, icon, color) {
	this.type = type;
	this.name = name;
	this.icon = icon;
	if (color) {
		this.color = color;
	}
}

AbstractObject.prototype = {
	pos: null,
	type: null,
	name: null,
	icon: ' ',
	color: '',

	// Attributes depend on the context of the game and record what has happened to the object
	// So for the player and monsters they will record attack attributes, status of poisions, spells etc
	attributes: {},
	// Flags are decided by the class of the object and will not change once the object is instantiated
	flags: {
		// Is this the player character
		isPlayer: false,
		// Can the player move this object
		isMovable: false,
		// Can the player pick it up
		isCollectable: false,
		// Does the object stop Line Of Sight 
		blockLOS: false,
		// Can the player attack it
		isAttackable: false,
		// Is the object an NPC (monster, merchant etc)
		isNPC: false
	},

	move: function(dir){

	}
};

var OBJECT_TYPES = {
	default: new AbstractObject('default', '', ' '),
	player: new AbstractObject('player', 'You', '@', 'pink'),
	wall: new AbstractObject('wall', 'wall', '#'),
};