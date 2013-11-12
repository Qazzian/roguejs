

function SimpleView(map){
	this.map = map;
}

SimpleView.prototype = {
	ready: false,

	init: function(options){
		this.container = $('#dungeon-view');
	},

	print: function(){
		this.container.html('');
		var map = this.map;
		var table = $(document.createElement('table'));
		var tbody = $(document.createElement('tbody'));
		table.append(tbody);


		for (var y=0; y<map.height; y++) {
			var row = $(document.createElement('tr'));
			tbody.append(row);
			for (var x=0; x<map.width; x++) {
				var td = $(document.createElement('td'));
				row.append(td);
				var obj = this.map.getObject(x, y);
				if (obj) {
					td.html(obj.icon);
					if (obj.color) {
						td.css({color: obj.color});
					}
				}
				else {
					td.html(' ');
				}
				
				
				
			}
		}
		this.container.append(table);
	}
};



