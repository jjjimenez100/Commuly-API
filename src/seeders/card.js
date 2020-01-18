const faker = require('faker');
const model = require('../api/card/CardModel');
const {
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
} = require('../api/card/CardEnum');

const seedCount = 10;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateFakeUser = () => {
  const id = faker.random.uuid();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    id, firstName, lastName,
  };
};

const dataGeneratorFunction = () => {
  const owner = faker.random.uuid();

  const cardTypeRandomIndex = getRandomNumber(0, CARD_TYPES.length - 1);
  const cardType = CARD_TYPES[cardTypeRandomIndex];

  const taggedUsersSize = getRandomNumber(0, seedCount);
  const tags = [];
  for (let index = 0; index < taggedUsersSize; index += 1) {
    tags.push(faker.random.uuid());
  }

  const understoodSize = getRandomNumber(0, seedCount);
  const understood = [];
  for (let index = 0; index < understoodSize; index += 1) {
    understood.push(faker.random.uuid());
  }

  const excitedSize = getRandomNumber(0, seedCount);
  const excited = [];
  for (let index = 0; index < excitedSize; index += 1) {
    excited.push(faker.random.uuid());
  }

  const boredSize = getRandomNumber(0, seedCount);
  const bored = [];
  for (let index = 0; index < boredSize; index += 1) {
    bored.push(faker.random.uuid());
  }

  const confusedSize = getRandomNumber(0, seedCount);
  const confused = [];
  for (let index = 0; index < confusedSize; index += 1) {
    confused.push(faker.random.uuid());
  }

  const cardInfo = {
    owner,
    cardType,
    tags,
    reactions: {
      understood,
      excited,
      bored,
      confused,
    },
  };

  if (cardType === CONTENT_CARD) {
    const contentCardIndex = getRandomNumber(0, CONTENT_CARD_TYPES.length - 1);

    const contentCardType = CONTENT_CARD_TYPES[contentCardIndex];
    if (contentCardType === TEXT_CONTENT) {
      const textContent = {
        content: faker.random.words(),
        textColor: faker.internet.color(),
        backgroundColor: faker.internet.color(),
      };

      return { ...cardInfo, textContent };
    } if (contentCardType === CHART_CONTENT) {
      const mappingSize = getRandomNumber(1, seedCount);
      const labels = [];
      const values = [];
      for (let index = 0; index < mappingSize; index += 1) {
        labels.push(faker.random.word());
        values.push(faker.random.number());
      }

      const chartContent = { labels, values };
      return { ...cardInfo, chartContent };
    }

    if (contentCardType === IMAGE_CONTENT) {
      const imageURLContent = faker.image.imageUrl();
      return { ...cardInfo, imageURLContent };
    }

    if (contentCardType === VIDEO_CONTENT) {
      // faker does not support video urls
      const videoURLContent = faker.image.imageUrl();
      return { ...cardInfo, videoURLContent };
    }

    if (contentCardType === SERIAL_TABLE_CONTENT) {
      // not yet sure how the client side will structure this one
      const serialTableContent = faker.random.words();
      return { ...cardInfo, serialTableContent };
    }

    if (contentCardType === SCHEDULED_CONTENT) {
      const scheduledDate = faker.date.future();
      const name = faker.random.word();
      const imagePosterURL = faker.image.imageUrl();
      const start = faker.date.recent();
      const userWorkShift = {
        start,
        end: faker.date.between(start, scheduledDate),
        firstBreak: faker.date.recent(),
        lunchBreak: faker.date.recent(),
        lastBreak: faker.date.recent(),
      };

      const scheduledEventContent = {
        scheduledDate,
        name,
        imagePosterURL,
        userWorkShift,
      };

      return { ...cardInfo, scheduledEventContent };
    }

    if (contentCardType === TODO_CONTENT) {
      const startDate = faker.date.recent();
      const endDate = faker.date.future();
      const startTime = faker.date.recent();
      const endTime = faker.date.recent();
      const name = faker.random.word();
      const randomStatusIndex = getRandomNumber(0, TODO_STATUS.length - 1);
      const status = TODO_STATUS[randomStatusIndex];
      const attachmentUrl = faker.internet.url();
      const responsibleUser = faker.random.uuid();

      const todoContent = {
        startDate,
        endDate,
        startTime,
        endTime,
        name,
        status,
        attachmentUrl,
        responsibleUser,
      };

      return { ...cardInfo, todoContent };
    }
  } else if (cardType === QUESTION_CARD) {
    const question = faker.lorem.sentence();
    const randomQuestionTypeIndex = getRandomNumber(0, QUESTION_CARD_TYPES.length - 1);
    const questionCardType = QUESTION_CARD_TYPES[randomQuestionTypeIndex];
    const choicesSize = getRandomNumber(1, seedCount);
    const responsesSize = getRandomNumber(1, seedCount);

    if (questionCardType === MULTIPLE_CHOICE_QUESTION) {
      const choices = [];
      for (let index = 0; index < choicesSize; index += 1) {
        choices.push(faker.random.word());
      }

      const responses = [];
      for (let index = 0; index < responsesSize; index += 1) {
        responses.push({
          ...generateFakeUser(),
          answer: faker.random.word(),
        });
      }

      const multipleChoiceContent = {
        question, choices, responses,
      };
      return { ...cardInfo, questionCardType, multipleChoiceContent };
    }

    if (questionCardType === LIKERT_QUESTION) {
      const choices = [];
      for (let index = 0; index < choicesSize; index += 1) {
        choices.push({
          lowerBoundChoice: faker.random.word(),
          upperBoundChoice: faker.random.word(),
        });
      }

      const responses = [];
      for (let index = 0; index < responsesSize; index += 1) {
        responses.push({
          ...generateFakeUser(),
          answer: faker.random.number(),
        });
      }

      const likertContent = {
        question, choices, responses,
      };
      return { ...cardInfo, questionCardType, likertContent };
    }

    if (questionCardType === OPEN_TEXT_QUESTION) {
      const responses = [];
      for (let index = 0; index < responsesSize; index += 1) {
        responses.push({
          ...generateFakeUser(),
          answer: faker.lorem.sentence(),
        });
      }

      const openTextContent = {
        question, responses,
      };
      return { ...cardInfo, questionCardType, openTextContent };
    }

    if (questionCardType === COLUMN_ORDERING_QUESTION) {
      const choices = [];
      for (let index = 0; index < choicesSize; index += 1) {
        choices.push(faker.random.word());
      }

      const responses = [];
      for (let index = 0; index < responsesSize; index += 1) {
        responses.push({
          ...generateFakeUser(),
          answer: faker.lorem.sentence(),
        });
      }

      const openTextContent = {
        question, responses,
      };
      return { ...cardInfo, questionCardType, openTextContent };
    }
  }
};

const startSeeder = require('./seeder');

startSeeder(seedCount, model, dataGeneratorFunction);
