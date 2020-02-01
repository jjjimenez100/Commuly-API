const { findOneById, findMultipleByIds } = require('./mongooseHelper');

class Repository {
  constructor(model) {
    this.model = model;
  }

  getAll() {
    return this.model.find({}).exec();
  }

  getById(id) {
    return this.model.findById(id).exec();
  }

  getByIds(ids) {
    return this.model.find(...findMultipleByIds(ids));
  }

  save(modelData) {
    return this.model.create(modelData);
  }

  update(id, modelData) {
    return this.model.findOneAndUpdate(
      ...findOneById(id),
      modelData,
      { useFindAndModify: false },
    ).exec();
  }

  delete(id) {
    return this.model.findByIdAndDelete(id).exec();
  }
}

module.exports = Repository;
