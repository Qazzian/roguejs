
var MAPS = {};

MAPS.test1 = new Map(10, 10);
MAPS.test1.objects.push(OBJECT_TYPES.player);
OBJECT_TYPES.player.x = 3;
OBJECT_TYPES.player.y = 5;

var view = new SimpleView(MAPS.test1);
view.init();
view.print();