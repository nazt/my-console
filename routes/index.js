/*
 * GET home page.
 */
const redis = require('redis');


exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.readTag = function  (req, res) {
	// req.io.broadcast('new visitor')

	// console.log(io)
	// redis2.subscribe("emrchat");
	var pub = redis.createClient();
	var result = pub.publish("natja", req.params.tagId);	
	res.send(req.params.tagId)
}
