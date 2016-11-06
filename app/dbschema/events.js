var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
         active: Boolean,
         eventId: { type: Number, default: 0},
         imageUrl: { type: String, trim: true },
         name: { type:String, trim: true },
         location: { type:String, trim: true },
         date: { type: Date, default: Date.now },
         interested: { type: Number, default: 0 },
         going: { type: Number, default: 0},
         organiserId: { type: Number, trim: true },
         price: { type: [mongoose.Schema.Types.ObjectId], default: [] },
         created: { type: Date, default: Date.now }
     },
     { collection: 'content' }
);
contentSchema.index({eventId : 1}, {unique:true});
exports.getContentMongooseModel = function() {
  return mongoose.model( 'content', contentSchema );
}
