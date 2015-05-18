var fs = require('fs');
var _ = require('underscore');
var argv = require('optimist').argv;
var request = require('request');
var et = require('elementtree');

var spreadsheets = [];
var grid = JSON.parse(fs.readFileSync('grid-a-process.geojson', 'utf8'));

_.each(grid.features, function(val) {
	if (val.properties.PNTCNT === 323) {
		var url = "http://api.openstreetmap.org/api/0.6/map?bbox=" + val.properties.left + "," + val.properties.top + "," + val.properties.right + "," + val.properties.bottom;
		download_file(url, val.properties.PNTCNT + ".osm", done);
	}
});

function download_file(url, localFile, callback) {
	var localStream = fs.createWriteStream(localFile);
	var out = request({
		uri: url
	});
	out.on('response', function(resp) {
		if (resp.statusCode === 200) {
			//console.log('Start download : ' + url);
			out.pipe(localStream);
			localStream.on('close', function() {
				callback(localFile, done);
			});
		}
	});
}

function done(localFile) {
	var XML = et.XML;
	var ElementTree = et.ElementTree;
	var element = et.Element;
	var subElement = et.SubElement;
	var data, etree;
	data = fs.readFileSync(localFile).toString();
	etree = et.parse(data);
	_.each(etree.findall("./way"), function(val) {
		var address = "";
		_.each(val._children, function(v) {
			if (v.tag == 'tag') {
				if (v.attrib.k === 'addr:housenumber') {
					address += v.attrib.v;
				}
			}
			if (v.attrib.k === 'addr:street') {
				address += v.attrib.v;
			}
		});
		if (address !== "") {
			console.log(address.toLowerCase().replace(/ /g, "_"));
		}



	})
}