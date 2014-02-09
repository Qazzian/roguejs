(function(global){

var R = global.R;

if (typeof StopIteration === 'undefined') {
	global.StopIteration = function(){

	};
	StopIteration.prototype = new Error("Stop Iteration");

}

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
R.iterRoundPos = function(map, startPos, depth) {

	this.map = map;
	this.startPos = startPos;
	this.index = 0;
	this.currentDepth = 0;
	this.x = this.x_min = this.x_max = startPos[0];
	this.y = this.y_min = this.y_max = startPos[1];
	this.maxdepth = depth ? depth : Number.POSITIVE_INFINITY;

	this.start_direction = R.DIRECTIONS.ne;
	this.current_depth_start_pos = [this.x, this.y];
};

R.iterRoundPos.prototype = {

	// TODO this still needs rewriting.
	next: function(){
		var pos = this.getNextPos();
		this.index++;
		return pos;
	},

	hasNext: function(){
		return !!this.getNextPos(); //this.index < this.positions.length;
	},

	/**
	 * [getNextPos description]
	 * @return {[type]} [description]
	 */
	getNextPos: function(){
		var posCoords = [this.x, this.y],
			pos;

		if (this.currentDepth > this.maxdepth){
			throw new StopIteration();
		}
		if (this.x_min < 0 && this.x_max >= this.map.width &&
			this.y_min < 0 && this.y_max >= this.map.height){
			throw new StopIteration();
		}

		if (this.x == this.current_depth_start_pos[0] && this.y == this.current_depth_start_pos[1]){
			// print "move out: current pos ", this.x, ",",this.y
			this.currentDepth += 1;
			this.x_min = this.startPos[0] - this.currentDepth;
			this.x_max = this.startPos[0] + this.currentDepth;
			this.x += this.start_direction[0];
			this.y_min = this.startPos[1] - this.currentDepth;
			this.y_max = this.startPos[1] + this.currentDepth;
			this.y += this.start_direction[1];
			this.current_depth_start_pos = [this.x, this.y];
			//print "new min: ", this.x_min,',',this.y_min,' New max: ',this.x_max,',',this.y_max
			//print "new location: ",this.x,',',this.y
		}
		if (this.y == this.y_max && this.x > this.x_min) {
			this.x -= 1;
			// print "x -1 on index ", this.index, " with position: ", this.x,',',this.y
		}else if (this.x == this.x_min && this.y > this.y_min){
			this.y -= 1;
			// #print "y -1 on index ", this.index, " with position: ", this.x,',',this.y
		}else if (this.y == this.y_min && this.x < this.x_max){
			this.x += 1;
			// #print "x +1 on index ", this.index, " with position: ", this.x,',',this.y
		}else if (this.x == this.x_max && this.y < this.y_max){
			this.y += 1;
			//print "y +1 on index ", this.index, " with position: ", this.x,',',this.y
		}

		try {
			pos = this.map.getTile(this.x, this.y);
		}
		catch (err) {
			pos = this.getNextPos();
		}

		return pos;

	}

};


})(this);