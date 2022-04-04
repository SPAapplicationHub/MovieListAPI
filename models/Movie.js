const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new Schema({
id: {
  type: String,
  required: true
 },
  title: {
  type: String,
  required: true
 },
description: {
  type: String,
  required: true
 },
datereleased: {
  type: Date,
  required: true,
  default: new Date()
 }
});
const Movie= mongoose.model("Movie", movieSchema);
module.exports = Movie;