/** @format */

const { Schema, model } = require("mongoose");

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    require: true,
    validate: [({ length }) => length <= 280, "Password should be longer."],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  username: {
    type: String,
    require: true,
  },
  reaction: [],
});

UserSchema.virtual("friendCount").get(() => {
  // returns how many friends the user has on query
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
