const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  link: String,
  date: String,
  location: String,
  image: String,
});

module.exports = mongoose.model('Event', eventSchema);
