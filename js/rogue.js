(function(global){

"use strict";

var R = global.R = {};

R.Config = {
	fov_depth: 4
};



R.Rogue = function(){
	this.init();
};

R.UIController = function(){
    _.extend(this, Backbone.Event);
    this.keycodes = this.processKeyCodes(this.actions);
    this.bindEvents();
};

R.UIController.prototype = {
    actions: {
        WAIT: [32],
        LEFT: [37, 72],
        RIGHT: [39, 76],
        UP: [38, 75],
        DOWN: [40, 74]
    },
    processKeyCodes: function(actions){
        var codeSet = {};
        _.each(actions, function(codes, action){
            _.each(codes, function(keyCode){
                codeSet[keyCode] = action;
            });
        });
        return codeSet;
    },
    bindEvents: function(){
        var self = this;
        $(document).on('keydown', self.onKey.bind(self, true));
        $(document).on('keyup', self.onKey.bind(self, false));
        $(document).on('touchstart', self.onTouch.bind(self));
        $(document).on('touchmove', self.onTouch.bind(self));
        $(document).on('touchend', self.onTouchEnd.bind(self));
    },
    onKey: function(isDown, e){
        var action = this.keycodes[e.keyCode];
        if (typeof action === 'undefined') return;
        this.trigger('UI:' + action + (isDown?':start':':stop') );
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
    },
    onTouch: function(){},
    onTouchEnd: function(){}
};

R.Rogue.prototype = {
	player: null,
	map: null,
	view: null,
	schedular: null,

	init: function(){
		var self = this,
			mapData;
		$(document).on('keyup', function(event){self.onKeyPress(event);});
		
		// this.map = new R.Map(20, 10);

		// this.player = R.OBJECT_TYPES.player;
		// this.map.addObject(this.player, 5, 3);
		// this.map.addObject(R.objFactory(R.OBJECT_TYPES.npc), 10, 5);

		mapData = R.testMaps.twoRoomsWithOneNpc;
		this.map = new R.Map(mapData.w, mapData.h, mapData.terrain);
		if (mapData.objects) {
			this.map.loadObjects(mapData.objects);
		}
		this.player = this.map.loadPlayer(mapData.player);


		this.view = new R.SimpleView(this.map);
		this.view.init();
		this.view.print();

	},

	takeTurn: function(dir){
		if (dir) {
			try {
				this.map.moveObj(this.player, dir);
			}
			catch (error) {
				if (error instanceof R.OutOfBoundsException) {
					this.message("You have reached the edge of the map.");
				}
				else if (error instanceof R.PositionTakenException) {
					this.message("You cannot move there. " + error.obj.name + " is in the way.");
				}
				else if (error instanceof R.PositionImpassibleException) {
					this.message("You cannot pass over that " + error.tile.type + '.');
				}
				else {
					throw error;
				}
			}
		}


		this.view.print();
	},

	/** 
	 * Print a message for the player to read
	 */
	message: function(msg){
		console.log(msg);
	},

	onKeyPress: function(event){
		//console.log("Keypress: " , event.keyCode);
		var dir = null;
		var takeTurn = false;
		var DIRECTIONS = R.DIRECTIONS;

		// TODO make this configurable

		switch (event.keyCode) {

			// Don't move
			case 32:
				dir = DIRECTIONS.still;
				takeTurn = true;
				break;
			// West
			case 37: // left cursor key
			case 72: // H
				dir = DIRECTIONS.w;
				takeTurn = true;
				break;
			// North
			case 38: // Up key
			case 75: // K
				dir = DIRECTIONS.n;
				takeTurn = true;
				break;
			// East
			case 39: // Left key
			case 76: // L
				dir = DIRECTIONS.e;
				takeTurn = true;
				break;
			// South
			case 40: // Down key
			case 74: // J
				dir = DIRECTIONS.s;
				takeTurn = true;
				break;
            default:
                return;
		}

		if (takeTurn) {
			this.takeTurn(dir);
		}
	}

	
};


R.Schedular = function(){
	this.turnCount = -1;
	this.schedule = [];
};

R.Schedular.prototype = {

	/**
	 * Add an event to run in <code>time</code> turns
	 * @param event {GameEvent} - The event to run
	 * @param time {Integer} @optional - How many turns to wait before event runs. Defaut is to run the event at the next turn.
	 */
	add: function(event, time){

	},

	/**
	 * Add an event to run every <code>interval</code> turns. The event will first run 
	 */
	addRepeating: function(event, startTime, interval) {

	},

	runNextEvents: function() {
		var eventList, i;

		this.turnCount++;

		if (this.schedule[this.turnCount]) {
			eventList = this.schedule[this.turnCount];
			for (i=0; i<eventList.length; i++) {
				try{
					eventList[i].func();
				}
				catch (error){
					console.error("Event threw an Error: \n", error, "\nEvent: ", eventList[i]);
				}
				
			}
		}
	}
};

R.GameEvent = function(callback, context){
	this.func = callback;
	this.context = context || window;
};


})(this);

