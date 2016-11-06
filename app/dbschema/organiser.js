var mongoose = require('mongoose');
var cubeSchema = new mongoose.Schema({
         active: Boolean,\
         id: { type: Number, trim: true },
         name: { type: String, trim: true },
         events: { }
     },
     { collection: 'cube' }
);
cubeSchema.index({name : 1}, {unique:true});
exports.getCubeMongooseModel = function() {
  return mongoose.model( 'cube', cubeSchema );
}
