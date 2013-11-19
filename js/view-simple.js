(function(global){

"use strict";

var SimpleView = global.R.SimpleView = function (map){
	this.map = map;
};

var objTypeToClass = {
	default: '',
	wall: 'tile_wall',
	player: 'icon_player'
};

SimpleView.prototype = {
	ready: false,
	container: null,
	tbody: null,
	grid: null, // 2d Array[w][h] which point to the html elements that represent the corrisponding map posiitons.

	init: function(options){
		this.container = $('#dungeon-view');
		this.container.html('');

		var map = this.map;
		var table = $(document.createElement('table'));
		this.tbody = $(document.createElement('tbody'));
		table.append(this.tbody);

		this.grid = [];
		for (var i=0; i<map.width; i++) {
			this.grid[i] = [];
		}

		for (var y=0; y<map.height; y++) {
			var row = $(document.createElement('tr'));
			this.tbody.append(row);
			for (var x=0; x<map.width; x++) {
				var td = document.createElement('td');
				row.append(td);
				this.grid[x][y] = td;

				this.printTile(x, y);

				
			}
		}
		this.container.append(table);

	},


	print: function(){
		for (var x=0; x<this.map.width; x++) {
			for (var y=0; y<this.map.height; y++) {
				this.printTile(x, y);
			}
		}
	},
	printTile: function(x, y){
		var td = this.grid[x][y],
			tile = this.map.getTile(x, y),
			obj = this.map.getObject(x, y);

		this.printIcon(td, obj || tile);
	},

	printIcon: function(elmt, gameObj){
		elmt.innerHTML = gameObj.icon || ' ';
		elmt.className = objTypeToClass[gameObj.type] || objTypeToClass.default;
	}
};



})(this);