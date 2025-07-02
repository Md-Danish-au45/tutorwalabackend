const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  board: String,
  home: String,
  class: String,
  city: String,
  address: String,
  time: String,
  date: String,
});

module.exports = mongoose.model("Student", studentSchema);
