var user = require('app/dbschema/user');
var UserModel = user.getUserMongooseModel();
exports.addUser = function(name, city,cb) {
  errStr = undefined;
  account = {};
  account.username = account.city = undefined;
  UserModel.find({'name' : name}, function dupeName(err, results) {
      if (err) {
          cb({error: err});
          return;
      }
      if (results.length > 0) {
          cb({error: 'Account with that name already exists.  Please choose another name.'});
      } else {
          account.username = name;
          account.city = city;
          var newUser = new UserModel(
              {
                active: true,
                name: account.username,
                city: account.city
              });
          newUser.save(function (err, user) {
              if (err) {
                cb({error: err});
              } else {
                cb(user);
              }
          });
       }
    });
}

exports.addCubeToUser = function (userId, cubeId, cb) {
  UserModel.find({'_id' : userId}, function userId(err, results) {
      if (err) {
          cb({error: err});
      }
      if (results.length <= 0) {
          cb({error: 'No account with that id exists.'});
      } else {
        UserModel.update({'_id': results[0]._id}, { $push: { cubes: cubeId}}, { multi: true }, function(err, numAffected) {
          if(err) {
            cb({error: err});
          } else {
            cb({status: "Success"});
          }
        });
      }
    });
}

exports.addContentToUser = function (userId, contentId, cb) {
  UserModel.find({'_id' : userId}, function userId(err, results) {
      if (err) {
          cb({error: err});
      }
      if (results.length <= 0) {
          cb({error: 'No account with that id exists.'});
      } else {
        UserModel.update({'_id' : results[0]._id}, { $push: { contents: contentId}}, { multi: true }, function(err, numAffected) {
          if(err) {
            cb({error: err});
          } else {
            cb({status: "Success"});
          }
        });
      }
    });
}

exports.deleteCubeFromUser = function(userId, cubeId, cb) {
  UserModel.find({'_id' : userId}, function userId(err, results) {
      if (err) {
          cb({error: err});
      }
      if (results.length <= 0) {
          cb({error: 'No account with that id exists.'});
      } else {
        UserModel.update({'_id' : results[0]._id}, { $pull: { cubes: cubeId}}, { multi: true }, function(err, numAffected) {
          if(err) {
            cb({error: err});
          } else {
            cb({status: "Success"});
          }
        });
      }
    });
}

exports.getUser = function(userId, cb) {
  UserModel.find({'_id' : userId}, function userId(err, results) {
      if (err) {
        cb({error: "Error from userId check"});
      }
      if (results.length <= 0) {
        cb({error: 'No account with that id exists.'});
      } else {
        cb(results);
      }
  });

}
