const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const threshold = {
  type: {
    threshold: Number,
    notificationType: String,
  },
};

const thresholds = {
  thresholds: {
    type: {
      understood: {
        ...threshold,
      },
      excited: {
        ...threshold,
      },
      bored: {
        ...threshold,
      },
      confused: {
        ...threshold,
      },
    },
  },
};

const teamSchema = new Schema({
  name: String,
  members: [ObjectId],
  admins: [ObjectId],
  pinnedCards: [ObjectId],
  scheduledCards: [ObjectId],
  todoCards: [ObjectId],
  ...thresholds,
}, { typePojoToMixed: false });

const Team = model('Team', teamSchema);
module.exports = Team;
