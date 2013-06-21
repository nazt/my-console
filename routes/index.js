/*
 * GET home page.
 */
const redis = require('redis');


exports.index = function(req, res){
	console.log('do index')
  res.render('index');
};

exports.partials = function (req, res) {
	console.log('do partial');
  var name = req.params.name;
  res.render('partials/' + name +'.handlebars');
};

exports.readTag = function  (req, res) {
	var pub = redis.createClient();
	var result = pub.publish("rfid_ch", req.params.tagId);	

	res.send(req.params.tagId)
};


exports.readSensor = function(req, res) {
	var pub = redis.createClient();
	var result = pub.publish('sensor_ch', req.params.sensorMsg);

	res.send(req.params.sensorMsg);
}