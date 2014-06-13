if (!window.Mock) {
	window.Mock = {};
}

(function(Mock){
	"use strict";

	Mock.getTestGrid = function(size) {
		return new R.Grid(size, size, function testGridDataMaker(x, y){
			return {x:x, y:y};
		});
	};

	Mock.getTestMap = function(size){
		var map = new R.Map();
		map.grid = Mock.getTestGrid(size);
		return map;
	};

})(window.Mock);


