var userModel = require('app/models/userModel');
var contentModel = require('app/models/contentModel');
var cubeModel = require('app/models/cubeModel');

exports.createCube = function(req,res) {
  var cb = function(response){
    if(response.error) {res.json(response);}
    results = {};
    results.id = response._id;
    results.user_id = req.param('user_id');
    results.name = req.param('name');
    res.json(results);
    userModel.addCubeToUser(req.param('user_id'), response._id, function(response){
      if(response.error) {
        console.log(response);
      }
    });
  }
  cubeModel.addCube(req.param('name'),req.param('user_id'),cb);
}

exports.addContentToCube = function(req, res) {
  if (undefined == req.param('user_id')) {
    errStr = "Undefined user Id";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  } else  if (undefined == req.param('cube_id')) {
    errStr = "Undefined cube Id";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  } else  if (undefined == req.param('content_id')) {
    errStr = "Undefined user Id";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  }
  var cb = function(response){
    if(response.error) {
      res.json(response);
      return;
    }
    result = {};
    result.id = req.param('user_id');
    result.cube_id = req.param('cube_id');
    result.content_id = req.param('content_id');
    res.json(result);
  }
  cubeModel.addContentToCube(req.param('content_id'), req.param('cube_id'),cb);
}

exports.deleteContentFromCube = function(req, res) {
  if (undefined == req.param('user_id')) {
    errStr = "Undefined user Id to share with";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  } else  if (undefined == req.param('cube_id')) {
    errStr = "Undefined cube Id";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  } else  if (undefined == req.param('content_id')) {
    errStr = "Undefined user Id";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  }
  var cb = function(response){
    if(response.error) {
      res.json('response');
      return;
    }
    res.json('');
  }
  cubeModel.deleteContentFromCube(req.param('content_id'), req.param('cube_id'),cb);
}

exports.deleteCube = function(req,res) {
  if (undefined == req.param('user_id')) {
    errStr = "Undefined user Id to share with";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  } else  if (undefined == req.param('cube_id')) {
    errStr = "Undefined cube Id";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  }
  responseJSON = {};
  var cb = function(response){
    res.json(response);
    userModel.deleteCubeFromUser(req.param('user_id'),req.param('cube_id'), function(response) {
      if(response.error) {
        console.log(response);
      }
    });
  }
  cubeModel.deleteCube(req.param('cube_id'),cb);
  //userModel.deleteCubeFromUser(req.param('user_id'), req.param('cube_id'));
}
