const CONTENT_CARD = 'CONTENT_CARD';
const QUESTION_CARD = 'QUESTION_CARD';

const CARD_TYPES = [
  CONTENT_CARD,
  QUESTION_CARD,
];

const TEXT_CONTENT = 'TEXT';
const CHART_CONTENT = 'CHART';
const IMAGE_CONTENT = 'IMAGE';
const VIDEO_CONTENT = 'VIDEO';
const SERIAL_TABLE_CONTENT = 'SERIAL_TABLE';
const SCHEDULED_CONTENT = 'SCHEDULED_CONTENT';
const TODO_CONTENT = 'TODO_CONTENT';

const CONTENT_CARD_TYPES = [
  TEXT_CONTENT,
  CHART_CONTENT,
  IMAGE_CONTENT,
  VIDEO_CONTENT,
  SERIAL_TABLE_CONTENT,
  SCHEDULED_CONTENT,
  TODO_CONTENT,
];

const MULTIPLE_CHOICE_QUESTION = 'MULTIPLE_CHOICE';
const LIKERT_QUESTION = 'LIKERT';
const COLUMN_ORDERING_QUESTION = 'COLUMN_ORDERING';
const OPEN_TEXT_QUESTION = 'OPEN_TEXT';

const QUESTION_CARD_TYPES = [
  MULTIPLE_CHOICE_QUESTION,
  LIKERT_QUESTION,
  COLUMN_ORDERING_QUESTION,
  OPEN_TEXT_QUESTION,
];

const DONE_STATUS = 'DONE';
const STUCK_STATUS = 'STUCK';

const TODO_STATUS = [
  DONE_STATUS,
  STUCK_STATUS,
];

module.exports = {
  CARD_TYPES,
  CONTENT_CARD,
  QUESTION_CARD,

  CONTENT_CARD_TYPES,
  TEXT_CONTENT,
  CHART_CONTENT,
  IMAGE_CONTENT,
  VIDEO_CONTENT,
  SERIAL_TABLE_CONTENT,
  SCHEDULED_CONTENT,
  TODO_CONTENT,

  QUESTION_CARD_TYPES,
  MULTIPLE_CHOICE_QUESTION,
  LIKERT_QUESTION,
  COLUMN_ORDERING_QUESTION,
  OPEN_TEXT_QUESTION,

  TODO_STATUS,
  DONE_STATUS,
  STUCK_STATUS,
};
