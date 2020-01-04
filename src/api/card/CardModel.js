const { Schema, model } = require('mongoose');

const { Mixed } = Schema.Types;
const cardSchema = new Schema({
  owner: { type: String, required: true },
  cardType: { type: String, required: true },
  reactions: {
    type: {
      understood: [String],
      excited: [String],
      bored: [String],
      confused: [String],
    },
  },

  textContent: String,
  // By default, arrays have a default value of []
  // see; https://mongoosejs.com/docs/schematypes.html#arrays
  chartContent: { labels: [String], type: [Number], default: undefined },
  imageURLContent: String,
  videoURLContent: String,
  serialTableContent: Mixed,

}, { typePojoToMixed: false });

const Card = model('Card', cardSchema);

module.exports = Card;
