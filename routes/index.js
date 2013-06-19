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
	var pub = redis.createClient();
	var result = pub.publish("natja", req.params.tagId);	
	res.send(req.params.tagId)
}
