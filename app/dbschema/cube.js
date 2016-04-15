var mongoose = require('mongoose');
var cubeSchema = new mongoose.Schema({
         active: Boolean,
         name: { type: String, trim: true },
         contents: { type: [mongoose.Schema.Types.ObjectId], default: [] },
         created: { type: Date, default: Date.now }
     },
     { collection: 'cube' }
);
cubeSchema.index({name : 1}, {unique:true});
exports.getCubeMongooseModel = function() {
  return mongoose.model( 'cube', cubeSchema );
}
