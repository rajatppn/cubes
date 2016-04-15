var mongoose = require('mongoose');
var contentSchema = new mongoose.Schema({
         active: Boolean,
         link: { type: String, trim: true },
         created: { type: Date, default: Date.now }
     },
     { collection: 'content' }
);
contentSchema.index({link : 1}, {unique:true});
exports.getContentMongooseModel = function() {
  return mongoose.model( 'content', contentSchema );
}
