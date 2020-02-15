const { Schema, model } = require('mongoose');

const { Mixed, ObjectId } = Schema.Types;

const contentCardSchema = {
  // enum: either TEXT, CHART, IMAGE, VIDEO, SERIAL_TABLE, ASSIGNMENT, SCHEDULED_EVENT, TODO
  contentCardType: String,
  textContent: {
    type: {
      title: String,
      content: String,
      textColor: String,
      backgroundColor: String,
      fontStyle: String,
    },
  },
  // By default, arrays have a default value of []
  // see; https://mongoosejs.com/docs/schematypes.html#arrays
  chartContent: {
    type: {
      labels: [String],
      values: [Number],
    },
  },
  // s3 -> cloudfront
  imageURLContent: String,
  // s3 -> cloudfront
  videoURLContent: String,
  serialTableContent: Mixed,
  scheduledEventContent: {
    type: {
      startDate: String,
      endDate: String,
      startTime: String,
      endTime: String,
      // either INDIVIDUAL or TEAM
      scheduleType: String,
      name: String,
      // s3 -> cloudfront
      imagePosterURL: String,
      userWorkShift: {
        type: {
        // no DateTime object on mongoose
          start: String,
          end: String,
          firstBreak: String,
          lunchBreak: String,
          lastBreak: String,
        },
      },
    },
  },
  todoContent: {
    // user collection should also contain this one
    type: {
      // INDIVIDUAL or TEAM
      todoType: String,
      startDate: Date,
      endDate: Date,
      startTime: Date,
      endTime: Date,
      name: String,
    },
  },
};

const userResponseInfoSchema = {
  // ObjectID
  userId: ObjectId,
  // additional details for viewing responses
  firstName: String,
  lastName: String,
};

const questionCardSchema = {
  // enum, either: MULTIPLE_CHOICE, LIKERT, COLUMN_ORDERING, OPEN_TEXT
  questionCardType: String,
  multipleChoiceContent: {
    type: {
      question: String,
      choices: [String],

      responses: [{
        ...userResponseInfoSchema,
        answer: String,
      }],
    },
  },
  likertContent: {
    type: {
      question: String,
      choices: {
        type: {
          lowerBoundChoice: String,
          upperBoundChoice: String,
        },
      },
      responses: [{
        ...userResponseInfoSchema,
        answer: Number,
      }],
    },
  },
  openTextContent: {
    type: {
      question: String,
      responses: [{
        ...userResponseInfoSchema,
        answer: String,
      }],
    },
  },
  columnReorderingContent: {
    type: {
      question: String,
      choices: [String],
      responses: [{
        ...userResponseInfoSchema,
        // in order
        answer: [String],
      }],
    },
  },
};

const cardSchema = new Schema({
  // ObjectID of owner, no need to embed their info again, since reactions are anonymous
  owner: {
    type: ObjectId,
    required: true,
  },
  // enum: either CONTENT_CARD or QUESTION_CARD
  cardType: {
    type: String,
    required: true,
  },
  team: {
    type: ObjectId,
  },
  tags: {
    taggedUsers: [ObjectId],
  },
  reactions: {
    type: {
      // ObjectIDs
      // also maybe store this to the users collection
      understood: [String],
      excited: [String],
      bored: [String],
      confused: [String],
    },
  },
  ...contentCardSchema,
  ...questionCardSchema,
}, { typePojoToMixed: false });

const Card = model('Card', cardSchema);
module.exports = Card;
