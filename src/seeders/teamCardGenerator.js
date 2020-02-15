const faker = require('faker');
const { ObjectId } = require('mongoose').Types;
const {
  // eslint-disable-next-line no-unused-vars
  CARD_TYPES,
  CONTENT_CARD,
  QUESTION_CARD,

  // eslint-disable-next-line no-unused-vars
  TEXT_CONTENT,
  CHART_CONTENT,
  IMAGE_CONTENT,
  VIDEO_CONTENT,
  SERIAL_TABLE_CONTENT,
  SCHEDULED_CONTENT,
  TODO_CONTENT,
  SCHEDULED_TODO_TYPES,

  QUESTION_CARD_TYPES,
  MULTIPLE_CHOICE_QUESTION,
  LIKERT_QUESTION,
  COLUMN_ORDERING_QUESTION,
  OPEN_TEXT_QUESTION,
} = require('../api/card/CardEnum');

// Type of cards under "TEAM" only
const CONTENT_CARD_TYPES = [TEXT_CONTENT, SCHEDULED_CONTENT, TODO_CONTENT];

// temp, users array should be passed instead
const generateFakeUser = () => {
  const userId = ObjectId();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    userId, firstName, lastName,
  };
};

const shuffleArrayOrder = (array) => {
  const shuffledArray = [...array];
  for (let index = shuffledArray.length - 1; index > 0; index -= 1) {
    const j = Math.floor(Math.random() * (index + 1));
    [shuffledArray[index], shuffledArray[j]] = [shuffledArray[j], shuffledArray[index]];
  }

  return shuffledArray;
};

const dataGeneratorFunction = (maxSize, userIds, teamId, cardId) => {
  const owner = userIds[faker.random.number(userIds.length - 1)];

  const cardType = CONTENT_CARD;

  const taggedUsersSize = faker.random.number(userIds.length - 1);
  const tags = [];
  for (let index = 0; index < taggedUsersSize; index += 1) {
    tags.push(userIds[faker.random.number(userIds.length - 1)]);
  }

  const understoodSize = faker.random.number(userIds.length - 1);
  const understood = [];
  for (let index = 0; index < understoodSize; index += 1) {
    understood.push(userIds[faker.random.number(userIds.length - 1)]);
  }

  const excitedSize = faker.random.number(userIds.length - 1);
  const excited = [];
  for (let index = 0; index < excitedSize; index += 1) {
    excited.push(userIds[faker.random.number(userIds.length - 1)]);
  }

  const boredSize = faker.random.number(userIds.length - 1);
  const bored = [];
  for (let index = 0; index < boredSize; index += 1) {
    bored.push(userIds[faker.random.number(userIds.length - 1)]);
  }

  const confusedSize = faker.random.number(userIds.length - 1);
  const confused = [];
  for (let index = 0; index < confusedSize; index += 1) {
    confused.push(userIds[faker.random.number(userIds.length - 1)]);
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

  if (teamId) {
    cardInfo.team = ObjectId(teamId);
  }

  if (cardId) {
    // eslint-disable-next-line no-underscore-dangle
    cardInfo._id = ObjectId(cardId);
  }

  if (cardType === CONTENT_CARD) {
    const contentCardIndex = faker.random.number(CONTENT_CARD_TYPES.length - 1);
    const contentCardType = CONTENT_CARD_TYPES[contentCardIndex];
    if (contentCardType === TEXT_CONTENT) {
      const textContent = {
        title: faker.random.words(),
        content: faker.lorem.paragraphs(),
        textColor: faker.internet.color(),
        backgroundColor: faker.internet.color(),
        fontStyle: faker.random.word(),
      };

      return { ...cardInfo, contentCardType, textContent };
    } if (contentCardType === CHART_CONTENT) {
      const mappingSize = faker.random.number(maxSize);
      const labels = [];
      const values = [];
      for (let index = 0; index < mappingSize; index += 1) {
        labels.push(faker.random.word());
        values.push(faker.random.number());
      }

      const chartContent = { labels, values };
      return { ...cardInfo, contentCardType, chartContent };
    }

    if (contentCardType === IMAGE_CONTENT) {
      const imageURLContent = faker.image.imageUrl();
      return { ...cardInfo, contentCardType, imageURLContent };
    }

    if (contentCardType === VIDEO_CONTENT) {
      // faker does not support video urls
      const videoURLContent = faker.image.imageUrl();
      return { ...cardInfo, contentCardType, videoURLContent };
    }

    if (contentCardType === SERIAL_TABLE_CONTENT) {
      // not yet sure how the client side will structure this one
      const serialTableContent = faker.random.words();
      return { ...cardInfo, contentCardType, serialTableContent };
    }

    if (contentCardType === SCHEDULED_CONTENT) {
      const randomIndexType = faker.random.number(SCHEDULED_TODO_TYPES.length - 1);
      const scheduleType = SCHEDULED_TODO_TYPES[randomIndexType];
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
        scheduleType,
        scheduledDate,
        name,
        imagePosterURL,
        userWorkShift,
      };

      return { ...cardInfo, contentCardType, scheduledEventContent };
    }

    if (contentCardType === TODO_CONTENT) {
      const randomIndexType = faker.random.number(SCHEDULED_TODO_TYPES.length - 1);
      const scheduleType = SCHEDULED_TODO_TYPES[randomIndexType];
      const startDate = faker.date.recent();
      const endDate = faker.date.future();
      const startTime = faker.date.recent();
      const endTime = faker.date.recent();
      const name = faker.random.word();
      const attachmentUrl = faker.internet.url();
      const responsibleUser = ObjectId();

      const todoContent = {
        scheduleType,
        startDate,
        endDate,
        startTime,
        endTime,
        name,
        attachmentUrl,
        responsibleUser,
      };

      return { ...cardInfo, contentCardType, todoContent };
    }
  } else if (cardType === QUESTION_CARD) {
    const question = faker.lorem.sentence();
    const randomQuestionTypeIndex = faker.random.number(QUESTION_CARD_TYPES.length - 1);
    const questionCardType = QUESTION_CARD_TYPES[randomQuestionTypeIndex];
    const choicesSize = faker.random.number(maxSize);
    const responsesSize = faker.random.number(userIds.length - 1);

    if (questionCardType === MULTIPLE_CHOICE_QUESTION) {
      const choices = [];
      for (let index = 0; index < choicesSize; index += 1) {
        choices.push(faker.random.word());
      }

      const responses = [];
      for (let index = 0; index < responsesSize; index += 1) {
        const choiceRandomIndex = faker.random.number(choices.length - 1);
        responses.push({
        // FIXME
          ...generateFakeUser(),
          answer: choices[choiceRandomIndex],
        });
      }

      const multipleChoiceContent = {
        question, choices, responses,
      };
      return { ...cardInfo, questionCardType, multipleChoiceContent };
    }

    if (questionCardType === LIKERT_QUESTION) {
      const choices = {
        lowerBoundChoice: faker.random.word(),
        upperBoundChoice: faker.random.word(),
      };

      const responses = [];
      for (let index = 0; index < responsesSize; index += 1) {
        responses.push({
          // FIXME
          ...generateFakeUser(),
          answer: faker.random.number(10),
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
        // FIXME
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
        // FIXME
          ...generateFakeUser(),
          answer: shuffleArrayOrder(choices),
        });
      }

      const columnReorderingContent = {
        question, choices, responses,
      };
      return { ...cardInfo, questionCardType, columnReorderingContent };
    }
  }

  return {};
};

module.exports = { dataGeneratorFunction };
