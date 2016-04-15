var cube = require('app/dbschema/cube');
var CubeModel = cube.getCubeMongooseModel();
exports.addCube = function(cubeName, userId, cb) {
  errStr = undefined;
  cube = {};
  cube.cubeName = undefined;
  if (undefined == cubeName) {
      errStr = "Undefined name";
      cb({error: errStr});
      return;
  } else if (undefined == userId) {
      errStr = "Undefined userid";
      cb({error: errStr});
      return;
  }
  CubeModel.find({'name' : cubeName}, function dupeCube(err, results) {
      if (err) {
          cb({error: err});
          return;
      }
      if (results.length > 0) {
          cb({error: 'Cube with that name already exists.  Please choose another name.'});
          return;
      } else {
          cube.cubeName = cubeName;
          var newCube = new CubeModel(
              {
                active: true,
                name: cube.cubeName
              });
          newCube.save(function (err, cube) {
              if (err) {
                  cb({error: err});
              } else {
                  cb(cube);
              }
          });
       }
    });
}

exports.addContentToCube = function (contentId, cubeId, cb) {
  CubeModel.find({'_id' : cubeId}, function cubeId(err, results) {
      if (err) {
          cb({error: err});
      }
      if (results.length < 0) {
          cb({error: 'No cube with that id exists.'});
      } else {
        var mongoose =require('mongoose');
        CubeModel.update({'_id' : results[0]._id}, { $push: { contents: contentId}}, { multi: true }, function(err, numAffected) {
          if(err) {
            cb({error: err});
          } else {
            cb({status: "Success"});
          }
        });
      }
    });
}

exports.deleteContentFromCube = function (contentId, cubeId, cb) {
  CubeModel.find({'_id' : cubeId}, function cubeId(err, results) {
      if (err) {
          cb({error: err});
      }
      if (results.length < 0) {
          cb({error: 'No cube with that id exists.'});
      } else {
        CubeModel.update({'_id' : results[0]._id}, { $pull: { contents: contentId}}, { multi: true }, function(err, numAffected) {
          if(err) {
            cb({error: err});
          } else {
            cb({status: "Success"});
          }
        });
      }
    });
}

exports.deleteCube = function (cubeId, cb) {
  CubeModel.find({'_id' : cubeId}, function cubeId(err, results) {
      if (err) {
          cb({error: err});
      }
      if (results.length < 0) {
          cb({error: 'No cube with that id exists.'});
      } else {
        CubeModel.remove({'_id' : results[0]._id}, function(err, results) {
          if(err) {
            cb({error: err});
          } else {
            cb({status: "Success"});
          }
        });
      }
    });
}

exports.getCube = function(cubeId, cb) {
  CubeModel.find({'_id' :{$in: cubeId}}, function cubeId(err, results) {
      if (err) {
          cb({error: err});
      }
      if (results.length < 0) {
         cb({error: 'No cube with that id exists.'});
      } else {
         cb(results);
      }
  });

}
