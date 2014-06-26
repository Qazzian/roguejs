if (!window.Mock) {
	window.Mock = {};
}

(function(Mock){
	"use strict";

	Mock.getTestGrid = function(size) {
		return new R.Grid(size, size, function testGridDataMaker(x, y){
			return new R.Tile({pos: new R.Pos(x, y)});
		});
	};

	Mock.getTestMap = function(size){
		var map = new R.Map();
		map.loadMap(Mock.getTestGrid(size));
		return map;
	};

})(window.Mock);


