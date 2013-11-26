(function(global){

"use strict";

var R = global.R;

/**
TODO

Need to seperate objects from terrain.
Terrain are features of the map that cannot be changed (well maybe)

Objects do something useful and can be interacted with.

**/

var OBJECT_TYPES = R.OBJECT_TYPES = {};

function loadObjectTypes(){
	OBJECT_TYPES.default = new AbstractObjectType('default', '', ' ');
	OBJECT_TYPES.player = playerType();
	// OBJECT_TYPES.wall = new AbstractObjectType('wall', 'wall', '#');
	OBJECT_TYPES.ncp = new AbstractObjectType('ncp', 'NCP', '@', {color: 'yellow'});
}

R.newObj = function(type, x, y){
	var obj;
	if (OBJECT_TYPES.hasOwnProperty(type)) {
		
	}
};

/**
 * @param type - The internal class name of the object
 * @param name - The user friendly name of the object class
 * @param icon - The utf8 character used to represent the object class
 * @param options {object} @optional - A list of options and their values
 */
function AbstractObjectType(type, name, icon, options) {
	this.type = type;
	this.name = name;
	this.icon = icon;
	if (options) {
		for (var k in options) {
			if (k in this) {
				this[k] = options[k];
			}
		}
	}
}

AbstractObjectType.prototype = {
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

var playerType = R.Player = function(){
	var player = new AbstractObjectType('player', 'you', '@', {color: 'green'});
	player.flags.isPlayer = true;
	player.isVisible = true;
	player.flags.isAttackable = true;
	return player;
};

loadObjectTypes();

})(this);