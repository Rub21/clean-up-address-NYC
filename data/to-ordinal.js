var fs = require('fs');
var csv = require('csv-parser')
var _ = require('underscore');
var argv = require('optimist').argv;
String.prototype.capitalize = function() {
  return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); });
};
fs.writeFile(argv.file.split('.')[0] + "-processed.csv", "shapeid,x,y,address\n", function(err) {});
var rqt = fs.createReadStream(argv.file)
	.pipe(csv())
	.on('data', function(data) {
		var thenum = data.streetname.replace(/[^0-9]/g, '');
		if (thenum !== '') {
			data.streetname = data.streetname.replace(thenum, getGetOrdinal(thenum));
		}
		var d = data.shapeid + "," + data.x + "," + data.y + "," + data.house_num + " " + data.streetname.toLowerCase().capitalize() + "\n";

		fs.appendFile(argv.file.split('.')[0] + "-processed.csv", d, function(err) {});

	});

function getGetOrdinal(n) {
	var s = ["th", "st", "nd", "rd"],
		v = n % 100;
	return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

