Rouge = function(){
	this.init();
};

Rouge.prototype = {
	player: null,
	map: null,
	view: null,
	schedular: null,

	init: function(){
		var self = this;
		$(document).on('keyup', function(event){self.onKeyPress(event);});
		$(document).on('click', function(event){self.onMouseClick(event);});

		this.map = new Map(20, 10);

		this.player = new Player();
		this.player.x = 5;
		this.player.y = 3;
		this.map.addObject(this.player);


		this.view = new SimpleView(this.map);
		this.view.init();
		this.view.print();

	},

	takeTurn: function(dir){
		if (dir) {
			try {
				this.map.moveObj(this.player, dir);
			}
			catch (error) {
				if (error instanceof OutOfBoundsException) {
					this.message("You have reached the edge of the map");
				}
				else if (error instanceof PositionTakenException) {
					this.message("You cannot move there. Something is in the way");
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
		console.log("Keypress: " , event.keyCode);
		var dir = null;
		var takeTurn = false;

		switch (event.keyCode) {

			case 32:
				dir = DIRECTIONS.still;
				takeTurn = true;
				break;
			case 37:
				dir = DIRECTIONS.w;
				takeTurn = true;
				break;
			case 38:
				dir = DIRECTIONS.n;
				takeTurn = true;
				break;
			case 39:
				dir = DIRECTIONS.e;
				takeTurn = true;
				break;
			case 40:
				dir = DIRECTIONS.s;
				takeTurn = true;
				break;
		}

		if (takeTurn) {
			this.takeTurn(dir);
		}
	},

	onMouseClick: function(){
		console.log("Keypress: " , event);
	}
};


function Schedular(){
	this.turnCount = -1;
	this.schedule = [];
}

Schedular.prototype = {

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
			eventist = this.schedule[this.turnCount];
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

function GameEvent(callback, context){
	this.func = callback;
	this.context = context || window;
}