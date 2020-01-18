const { Schema, model } = require('mongoose');

const { Mixed, ObjectId } = Schema.Types;

const contentCardSchema = {
  // enum: either TEXT, CHART, IMAGE, VIDEO, SERIAL_TABLE, ASSIGNMENT, SCHEDULED_EVENT, TODO
  contentCardType: String,
  textContent: {
    type: {
      content: String,
      textColor: String,
      backgroundColor: String,
    },
  },
  // By default, arrays have a default value of []
  // see; https://mongoosejs.com/docs/schematypes.html#arrays
  chartContent: { labels: [String], type: [Number], default: undefined },
  imageURLContent: String,
  videoURLContent: String,
  serialTableContent: Mixed,
  scheduledEventContent: {
    type: {
      scheduledDate: Date,
      name: String,
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
      startDate: Date,
      endDate: Date,
      startTime: Date,
      endTime: Date,
      name: String,
      // Enum for: Done or Stuck
      status: String,
      attachmentUrl: String,
      responsibleUser: ObjectId,
    },
  },
};

const userResponseInfoSchema = {
  id: ObjectId,
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

      responses: {
        type: {
          ...userResponseInfoSchema,
          answer: String,
        },
      },
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
      responses: {
        type: {
          ...userResponseInfoSchema,
          answer: Number,
        },
      },
    },
  },
  openTextContent: {
    type: {
      question: String,
      responses: {
        type: {
          ...userResponseInfoSchema,
          answer: String,
        },
      },
    },
  },
  columnReorderingContent: {
    type: {
      question: String,
      choices: [String],
      responses: {
        type: {
          ...userResponseInfoSchema,
          // in order
          answer: [String],
        },
      },
    },
  },
};

const cardSchema = new Schema({
  // ObjectID of owner, no need to embed their info again, since reactions are anonymous
  owner: {
    type: String,
    required: true,
  },
  // enum: either CONTENT_CARD or QUESTION_CARD
  cardType: {
    type: String,
    required: true,
  },
  tags: {
    taggedUsers: [ObjectId],
  },
  reactions: {
    type: {
      // ObjectIDs
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
