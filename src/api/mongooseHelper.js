const findOneById = (id, additionalSearchQuery = {}) => ({
  _id: id,
  ...additionalSearchQuery,
});

const findMultipleByIds = (ids, additionalSearchQuery) => ({
  _id: {
    $in: ids,
  },
  ...additionalSearchQuery,
});

// data here is an object
const pushToArray = (data) => ({ $push: data });

const removeFromArray = (data) => ({ $pull: data });

const updateField = (data) => ({ $set: data });

const updateNumericField = (data) => ({ $inc: data });

module.exports = {
  findOneById,
  findMultipleByIds,
  pushToArray,
  removeFromArray,
  updateField,
  updateNumericField,
};
