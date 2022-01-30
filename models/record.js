const mongoose = require('mongoose');

const schema = mongoose.Schema;

const recordSchema = new schema({
  _id: mongoose.Types.ObjectId,
  key: String,
  createdAt: Date,
  counts: [],
  value: String,
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;