

(function(global){

var R = global.R;

R.FOV = function(map){
	this.init(map);
};

R.FOV.prototype = {
	map: null,

	init: function(map){

	}
};



/**
 * @param grid {[[]]} - An array of arrays. To keep the x,y progression the first array should represent the x co-ord, and the second the y co-ord
 */
R.Iter = function(grid){
	if (typeof grid === 'undefined' ) {
		throw Error("Need a grid to iterate over");
	}
	
	this.grid = grid;

	// Start at -1 so that the first next() takes us to 0
	this.x = -1;
	this.y = -1;

	this.width = grid.length;
	this.height = grid[0].length;
	this.length = this.width * this.height;
	this.index = -1;
};

R.Iter.prototype = {
	
	/* @return {{}} - What ever is at the next grid location. */
	next: function() {
		// TODO fix the length calculation.
		this.x = (this.x + 1) % this.width;
		if (this.x === 0) { this.y++; }
		this.index ++;
		if (this.index >= this.length) {
			return undefined;
		}

		return this.grid[this.x][this.y];
	},
	
	/* @return true if there are more blocks to return, false otherwise. */
	hasNext: function() {
		return this.index < (this.length - 1);
	},
	
	/* @returns array [x, y] of the co-ordinates of the most recently returned block 
	 *  or null if next() has not been called yet or called too many times. */
	currentPos: function(){
		if (this.index >= 0 && this.index < this.length) {
			return [this.x, this.y];
		}
		return null;
	}
};

/* Iterates around the chosen block. 
 * The length of this iterator can change depending on the block to iterate around. 
 * e.g. if the target is on the edge. 
 * @param grid {[[]]} - Array of array of grid positions 
 * @param startPos [Int, int] - The starting coords 
 * @param depth {Int} @optional - How far away to look around the start */
R.iterRoundPos = function(grid, startPos, depth) {
	this.grid = grid;
	this.targetPos = block.getCoords();
	this.index = -1;
	this.depth = 0;
	this.maxdepth = depth ? depth : Number.POSITIVE_INFINITY;
};

R.iterRoundPos.prototype = {
	//positions: [[0,1], [1,0], [0,-1], [-1,0]],
	positions: [[0,1], [1,1], [1,0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]],
	addDepthDir: [-1, 1],
	length: undefined,

	next: function(){
		this.index++;
		var newPos = ca.Position.add(this.targetPos, this.positions[this.index]);

		if (!this.board.isPosVisible(newPos)) {
			return this.hasNext() ? this.next() : null;
		}

		var block = this.board.getBlock(newPos[0], newPos[1]);
		return block.state == ca.Block.STATES.ACTIVE ? block : null;
	},

	hasNext: function(){
		return this.index < this.positions.length;
	}

};




})(this);