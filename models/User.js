const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
eamail: {
  type: String,
  required: true
 },
  Name: {
  type: String,
  required: true
 },
password: {
  type: String,
  required: true
 },
Role: {
  type: string,
  required: true
 }
});
const User= mongoose.model("User", userSchema);
module.exports = User;