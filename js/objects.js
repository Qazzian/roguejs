(function(global){

"use strict";




var OBJECT_TYPES = global.R.OBJECT_TYPES = {};

function loadObjectTypes(){
	OBJECT_TYPES.default = function(){ return new AbstractObject('default', '', ' ');};
	OBJECT_TYPES.player = Player;
	OBJECT_TYPES.wall = new AbstractObject('wall', 'wall', '#');
}

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
		// If the player can currently see the object
		isVisible: false,
		// If the player has seen the object (only applies to objects that havn't moved and !isMoile)
		hasBeenSeen: false,
		// If the object can move 
		isMobile: false,
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
		this.x += dir.dx;
		this.y += dir.dy;
	}
};

var Player = global.R.Player = function(){
	this.flags.isPlayer = true;
	this.isVisible = true;
	this.flags.isAttackable = true;
};

Player.prototype = new AbstractObject('player', 'you', '@');

})(this);