/**
TODO

Create map generator
*/

window.R.testMaps = {
	smallRoom: {
		w:8, h:5,
		terrain: ["########", "#......#", "#......#", "#......#", "########"].join('\n'),
		objects: [],
		player: {type:'player', x:1, y:2}
	},
	largeWithNPC: {
		w:20, h:10,
		objects: [
				{type: 'npc', x:10, y:5}
			],
		player: {type:'player', x:5, y:3}
	}
};

(function(){

	"use strict";

	window.MapGenerator = function(map, options){
		this.options = $.extend({}, this.defaultOptions, options);

		this.map = map || new Map(this.options.width, this.options.height);

		if (map) {
			this.options.width = map.width;
			this.options.height = map.height;
		}
	};

	MapGenerator.prototype = {

		defaultOptions: {
			width: 100,
			height: 50,

		},

		generateMap: function(){

		},

	};


	/**
	 * Create terrain for the map
	 * @param self - a reference to the Map Generator Object
	 */
	function defaultTerrainGenerator(self){

	}

	/**
	 * Add objects to the map
	 * @param self - a reference to the Map Generator Object
	 */
	function defaultObjectPopulator(self){

	}

})();

var terrain_icon_map = {};

$(document).ready(function(){
	objs = R.OBJECT_TYPES;

	for (var type in objs) if (objs.hasOwnProperty(type)) {
		//terrain_icon_map[objs[type]].

	}

});


function loadMap(mapStr) {
	var w, h, x=0, y=0, rows = mapStr.split('\n');

	h = rows.length;
	w = rows[0].length;


}


(function(){

})();
