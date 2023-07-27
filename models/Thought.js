// Importing Schema and model class from mongoose
// Also importing reactionSchema for references
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Declaring thoughtSchema as a new Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Keeps a count of the number of reactions on a particular thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Creating a model out of the thoughtSchema called Thought
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
