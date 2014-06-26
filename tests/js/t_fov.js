test("FOV", function(){
	var map = Mock.getTestMap(20),
		fov = new R.FOV(map, 2);

	ok(R.FOV, "FOV class defined");
	ok(fov, "Instance created");

	var visibleField = fov.update(6,6);
//	console.log("visibleField", visibleField);
	equal(visibleField.length, 25, "There should be 25 tiles visible with fov depth of 2");
//	console.log((new R.LogView(map)).print());

});