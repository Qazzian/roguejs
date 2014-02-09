

test("Maps", function(){
	ok(true, "testing");
});

function getTestGrid(size) {
	return new R.Grid(size, size, function testGridDataMaker(x, y){
		return {x:x, y:y};
	});
}

function getTestMap(size){
	var map = new R.Map();
	map.grid = getTestGrid(size);
	return map;
}


test("Iterator", function(){
	var tSize = 5,
		testArray = getTestGrid(tSize),
		iter;
	equal(testArray.w, tSize, "Have a test grid");

	ok(R.Iter, "Have Iter constructor");

	if (typeof Iterator === 'function') {
		iter = Iterator(testArray);
		ok(iter, "Have an iter instance (js v1.7)");
	}
	else {
		iter = new R.Iter(testArray);
		ok(iter, "Have an iter instance (js v1.5)");
	}

	equal(iter.length, tSize*tSize, "Inited properly");

	var counter = 0, str = '',
		expectedStr = '[0,0][1,0][2,0][3,0][4,0][0,1][1,1][2,1][3,1][4,1][0,2][1,2][2,2][3,2][4,2][0,3][1,3][2,3][3,3][4,3][0,4][1,4][2,4][3,4][4,4]';

	while (iter.hasNext()) {
		var n = iter.next();
		counter++;
		str += '['+n.x+','+n.y+']';
	}
	equal(counter, 5*5, "Iter through all items in the grid");
	equal(str, expectedStr, "Itered correctly throught the items");
	equal(iter.next(), undefined, "Going too far returns undefined");
});

test("iterRoundPos", function(){
	// TODO need a test map instead of a test grid
	var testMap = getTestMap(10),
		startPos = [3, 3], n,
		expectedStr = "[8,3][8,4][7,4][6,4][6,3][6,2][7,2][8,2][9,2][9,3][9,4][9,5][8,5][7,5][6,5][5,5][5,4][5,3][5,2][5,1][6,1][7,1][8,1][9,1][9,6][8,6][7,6][6,6][5,6][4,6][4,5][4,4][4,3][4,2][4,1][4,0][5,0][6,0][7,0][8,0][9,0]";
	ok(testMap, "Have a test array");

	ok(R.iterRoundPos, "Have the iterRoundPos constructor");
	var iter = new R.iterRoundPos(testMap, [7, 3], 3),
		str='', counter = 0;
	try {
		while (true) {
			n = iter.next();
			console.log('add pos: ', n);
			counter++;
			str += '['+n.x+','+n.y+']';
		}
	}
	catch (error) {
		ok(error instanceof StopIteration, "Got the end of the Iter");
	}

	console.log("out: ", str);
	equal(str, expectedStr, "Looks like iter went all the way round");



});