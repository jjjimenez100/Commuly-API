const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const sentigraphSchema = new Schema({
  userId: ObjectId,
  commentId: ObjectId,
  reaction: String,
  // Note: Built-in Date methods are not hooked into the mongoose change tracking logic, see: https://mongoosejs.com/docs/schematypes.html#dates
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: Date,
});

const Sentigraph = model('Sentigraph', sentigraphSchema);
module.exports = Sentigraph;
