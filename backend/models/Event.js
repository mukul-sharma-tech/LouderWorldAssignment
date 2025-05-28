// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   date: String,
//   link: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model('Event', eventSchema);


const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  link: String,
  date: String,
  location: String
});

module.exports = mongoose.model('Event', eventSchema);
