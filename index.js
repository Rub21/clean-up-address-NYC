var fs = require('fs');
var _ = require('underscore');
var argv = require('optimist').argv;
var request = require('request');
var et = require('elementtree');
var csv = require('csv-parser')

var spreadsheets = [];
var grid = JSON.parse(fs.readFileSync('grid-a-process.geojson', 'utf8'));

_.each(grid.features, function(val) {
	if (val.properties.PNTCNT === 323) {
		var url = "http://api.openstreetmap.org/api/0.6/map?bbox=" + val.properties.left + "," + val.properties.top + "," + val.properties.right + "," + val.properties.bottom;
		download_file(url, val.properties.PNTCNT + ".osm", val.geometry.coordinates, done);
	}
});

function download_file(url, localFile, coordinates, callback) {
	var localStream = fs.createWriteStream(localFile);
	var out = request({
		uri: url
	});
	out.on('response', function(resp) {
		if (resp.statusCode === 200) {
			//console.log('Start download : ' + url);
			out.pipe(localStream);
			localStream.on('close', function() {
				callback(localFile, coordinates, done);
			});
		}
	});
}

function done(localFile, coordinates) {
	//console.log(coordinates);
	var XML = et.XML;
	var ElementTree = et.ElementTree;
	var element = et.Element;
	var subElement = et.SubElement;
	var data, etree;
	data = fs.readFileSync(localFile).toString();
	etree = et.parse(data);

	var rqt = fs.createReadStream(argv.file)
		.pipe(csv())
		.on('data', function(data) {
			var point = [parseFloat(data.x), parseFloat(data.y)];
			if (pointinpolygon(point, coordinates[0])) {

			}
		});



}

function getGetOrdinal(n) {
	var s = ["th", "st", "nd", "rd"],
		v = n % 100;
	return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function pointinpolygon(point, vs) {
	var x = point[0],
		y = point[1];
	var inside = false;
	for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
		var xi = vs[i][0],
			yi = vs[i][1];
		var xj = vs[j][0],
			yj = vs[j][1];
		var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect) inside = !inside;
	}
	return inside;
}