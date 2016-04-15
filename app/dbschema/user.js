var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
         active: Boolean,
         name: { type: String, trim: true },
         city: { type: String, trim: true },
         cubes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
         contents: { type: [mongoose.Schema.Types.ObjectId], default: [] },
         created: { type: Date, default: Date.now }
     },
     { collection: 'users' }
);
userSchema.index({name : 1}, {unique:true});
exports.getUserMongooseModel = function() {
  return mongoose.model( 'user', userSchema );
}
