(function(global){

"use strict";

  var isTerm = false;
  isTerm = !!navigator.userAgent.match('PhantomJS');



var SimpleView = global.R.SimpleView = function (map){
	this.map = map;
};

var LogView = global.R.LogView = function(map){
	this.map = map;
	this.bgColour = '';
	this.fgColour = '';

	this.styles = [];

	this.colours = {
    // background colours
		visible: 'ffffff',
		seen: '999999',
		unseen: '000000'
    // foreground colours
	}
};

LogView.prototype = {
	print: function(){
		var str = '';

		for (var y=0; y<this.map.height; y++) {
			for (var x=0; x<this.map.width; x++) {
				str += this.printTile(x, y);
			}
			str += '\n';
		}

		//console.log.apply(console, [str].concat(this.styles));
		return str.replace('%c', '');
	},

	printTile: function(x, y) {
		var tile = this.map.getTile(x, y),
			obj = this.map.getObject(x, y);

		return this.getIcon(tile, obj);
	},

	getIcon: function(tile, gameObj){
		var content = '';

		content += this.setStyle(tile, gameObj);

		if (tile) {
			content += tile.icon || '.';
		}

		if (gameObj) {
			content += gameObj.icon;
		}

		return content;
	},
	setStyle: function(tile, gameObj){
		// TODO fork for nodejs and terminal colours
		// TODO add foreground colours
		// TODO decide on colour scheme for visible, seen, unseen for bg colors
		var bgc = '',
      fgc = '',
			content = '';

    if (tile.isVisible) {
      bgc = this.colours.visible;
    }
    else if (tile.hasBeenSeen) {
      bgc = this.colours.seen;
    }
    else {
      bgc = this.colours.unseen;
    }

		if (bgc !== this.bgColour || fgc !== this.fgColour) {
			this.bgColour = bgc;
      this.fgColour = fgc;
			content += isTerm ? '%s':'%c';
			this.buildStyle(bgc, fgc);
		}
		return content;
	},
	buildStyle: function(bgc, fgc){
    isTerm ? this.buildStyleTerminal(bgc, fgc) : this.buildStyleBrowser(bgc, fgc);
	},
  buildStyleTerminal: function(bgc, fgc) {

  },
  buildStyleBrowser: function(bgc, fgc) {
    var style = [];

    style.push('background-color:'+bgc);

    this.styles.push(style.join(';'));
  }
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
				this.grid[x][y] = $(td);

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

			this.printIcon(td, tile, obj);
	},

	printIcon: function($elmt, terrain, gameObj){
		var className = '', content = ' ';
		$elmt[0].className = '';

		if (terrain) {
			content = terrain.icon;
			$elmt.addClass('tile_' + terrain.type);
		}


		if (gameObj) {
			content = gameObj.icon;
			$elmt.addClass(objTypeToClass[gameObj.type] || 'icon_' + gameObj.type);
			if (!gameObj.flags.isVisible) {
				$elmt.addClass('icon_hidden');
			}
		}

		$elmt.html(content);
		
	}
};



})(this);