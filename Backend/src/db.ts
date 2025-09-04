const mongoose = require("mongoose");

// users schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },

  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastname: {
    type: String,
    requied: true,
    trim: true,
    maxLength: 50,
  },
});

// user model
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
