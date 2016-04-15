var userModel = require('app/models/userModel');
var contentModel = require('app/models/contentModel');
var cubeModel = require('app/models/cubeModel');

exports.createUser = function(req,res) {
  if (undefined == req.param('name')) {
      errStr = "Undefined name";
      res.status(400);
      res.json({error: errStr});
      return;
  } else if (undefined == req.param('city')) {
      errStr = "Undefined city";
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
    result.id = response._id;
    result.name = req.param('name');
    result.city = req.param('city');
    res.json(result);
  }
  userModel.addUser(req.param('name'),req.param('city'),cb);
  return;
}

exports.shareCube = function(req, res) {
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
  } else  if (undefined == req.param('parent_user_id')) {
    errStr = "Undefined user Id";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  }
  var cb = function(response){
    if(response.error) {
      res.json(response);
    }
    console.log(response);
    results = {};
    results.id = req.param('parent_user_id');
    results.cube_id = req.param('cube_id');
    results.user_id = req.param('user_id');
    res.json(results);
  }
  userModel.addCubeToUser(req.param('user_id'), req.param('cube_id'),cb);
}

exports.shareContent = function(req, res) {
  if (undefined == req.param('user_id')) {
    errStr = "Undefined user Id to share with";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  } else  if (undefined == req.param('content_id')) {
    errStr = "Undefined cube Id";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  } else  if (undefined == req.param('parent_user_id')) {
    errStr = "Undefined user Id";
    console.log(errStr);
    res.status(400);
    res.json({error: errStr});
    return;
  }
  var cb = function(response){
    results.id = req.param('parent_user_id');
    results.content_id = req.param('content_id');
    results.user_id = req.param('user_id');
    res.json(results);
  }
  userModel.addContentToUser(req.param('user_id'), req.param('content_id'),cb);
}

exports.listCubes = function(req,res) {
  if (undefined == req.param('user_id')) {
    errStr = "Undefined user Id to share with";
    res.status(400);
    res.json({error: errStr});
    return;
  }
  var cb = function(response){
    resultCubes = response[0].cubes;
    cubeModel.getCube(resultCubes, function(response) {
      if(response.error) {
        res.json(response);
        return;
      }
      results = [];
      response.forEach(function(value,index,arr) {
        result = {};
        result.id = value._id;
        result.name = value.name;
        result.user_id = req.param('user_id');
        results.push(result);
      });
      res.json(results);
    });
  }
  userModel.getUser(req.param('user_id'),cb);
}

exports.listContents = function(req,res) {
  if (undefined == req.param('user_id')) {
    errStr = "Undefined user Id to share with";
    res.status(400);
    res.json({error: errStr});
    return;
  }
  var cb = function(response){
    resultCubes = response[0].cubes;
    resultIds = [];
    console.log(response);
    response[0].contents.forEach(function(value,index,arr){
      resultIds.push(value);
    });
    cubeModel.getCube(resultCubes, function(response) {
      if(response.error) {
        res.json(response);
        return;
      }
      response.forEach(function(value,index,arr) {
        value.contents.forEach(function(value,index,arr) {
          resultIds.push(value);
        });
      });
    });
    contentModel.getContent(resultIds, function(response) {
      results = [];
      response.forEach(function(value,index,arr) {
        result = {};
        result.id = value._id;
        result.link = value.link;
        result.user_id = req.param('user_id');
        results.push(result);
      });
      res.json(results);
    });

  }
  userModel.getUser(req.param('user_id'),cb);
}
