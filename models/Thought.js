/** @format */
const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({

  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody:{
    type: String,
    required: true,
    validate: [({ length }) => length <= 280, "reaction should be shorter."]

  },
  username:{
    type: String,
    required: true,
    trim: true
  },
  createdAt:{
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
},
{
  toJSON:{
    getters: true
  },
  id: false
}
);

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    require: true,
    validate: [({ length }) => length <= 280, "Thought should be shorter."],
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },

  username: {
    type: String,
    require: true,
  },
  reactions: [ReactionSchema],
},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    id:false
}
);

ThoughtSchema.virtual("reactionCount").get(function() {
  // returns how many reactions the user has on query
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
