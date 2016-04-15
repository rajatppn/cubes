var mongoose = require('mongoose');
var express = require('express');
var userController = require('app/controllers/userController');
var cubeController = require('app/controllers/cubeController');
var contentController = require('app/controllers/contentController');

exports.addAPIRouter = function(app, mongoose) {

 	app.get('/*', function(req, res, next) {
 		res.contentType('application/json');
 		next();
 	});
 	app.post('/*', function(req, res, next) {
 		res.contentType('application/json');
 		next();
 	});
 	app.put('/*', function(req, res, next) {
 		res.contentType('application/json');
 		next();
 	});
 	app.delete('/*', function(req, res, next) {
 		res.contentType('application/json');
 		next();
 	});

  var router = express.Router();

  router.post('/', function(req, res) {
   userController.createUser(req,res);
  });
  router.post('/:user_id/cube', function(req, res) {
    cubeController.createCube(req,res);
  });
  router.post('/:user_id/content', function(req,res) {
    contentController.createContent(req,res);
  });
  router.get('/:user_id/cube', function(req,res) {
    userController.listCubes(req,res);
  });
  router.get('/:user_id/content', function(req,res) {
    userController.listContents(req,res);
  });
  router.post('/:user_id/cube/:cube_id/content', function(req,res) {
    cubeController.addContentToCube(req,res);
  });
  router.delete('/:user_id/cube/:cube_id/content/:content_id', function(req, res) {
   cubeController.deleteContentFromCube(req,res);
  });
  router.delete('/:user_id/cube/:cube_id', function(req, res) {
   cubeController.deleteCube(req,res);
  });
  router.post('/:parent_user_id/content/:cube_id/share', function(req,res) {
    userController.shareCube(req,res);
  });
  router.post('/:parent_user_id/content/:content_id/share', function(req,res) {
    userController.shareContent(req,res);
  });

  app.use('/user', router);
}
