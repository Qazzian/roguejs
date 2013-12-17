

test("Maps", function(){
	ok(true, "testing");
});

function getTestGrid(size) {
	var testArray = [], tw = size, th=size;
	for (i=0; i<tw; i++) {
		testArray[i] = [];
		for (j=0; j<th; j++) {
			testArray[i][j] = {x:i, y:j};
		}
	}
	console.log("test Array: ", testArray);
	return testArray;
}


test("Iterator", function(){
	var testArray = getTestGrid(5);
	equal(testArray.length, 5, "Have a test array");

	ok(R.Iter, "Have Iter constructor");

	var iter = new R.Iter(testArray);
	ok(iter, "Have an iter instance");
	equal(iter.length, 5*5, "Inited properly");

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
	var testGrid = getTestGrid(10),
		startPos = [3, 3];
	equal(testGrid.length, 10, "Have a test array");

});