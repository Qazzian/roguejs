

(function(R){

R.FOV = function(map, depth){
	this.depth = depth;
	this.init(map);
};

R.FOV.prototype = {

	init: function(map){
		this.map = map;
	},

	update: function(player_x, player_y){
		var iter = new R.iterRoundPos(this.map, [player_x, player_y], this.depth),
			visiblePoints = [];

    var startPos = this.map.getTile(player_x, player_y)

    startPos.isVisible = true;
    var debugPoints = [];


		try {
			while (true) {
				var currTile = iter.next(),
					closerTile = this.map.getNextTile(currTile, {x:player_x, y:player_y});
//				console.log("currTile: ", currTile, "\ncloserTile: ", closerTile);


				if (closerTile && closerTile.isVisible && !closerTile.blockLOS) {
					currTile.isVisible = true;
					visiblePoints.push(currTile);
				}
			}
		}
		catch (err) {
			if (!(err instanceof StopIteration)) {
				throw err;
			}
		}

		return visiblePoints
	},

	/**
	 * Change the view depth.
	 * @param depth {Number}
	 */
	setDepth: function(depth){
		this.depth = depth;
	}
};







})(this.R);