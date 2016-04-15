var userModel = require('app/models/userModel');
var contentModel = require('app/models/contentModel');
var cubeModel = require('app/models/cubeModel');

exports.createContent = function(req,res) {
  var cb = function(response){
    if(response.error) {res.json(response);}
    results = {};
    results.id = response._id;
    results.user_id = req.param('user_id');
    results.name = req.param('name');
    res.json(results);
    userModel.addContentToUser(req.param('user_id'), response._id, function(response){
      if(response.error) {
        console.log(response)
      }
    });
  }
  contentModel.addContent(req.param('link'),cb);
}
