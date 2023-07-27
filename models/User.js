// Importing Schema and model class from mongoose
const { Schema, model } = require("mongoose");

// Regex to validate an email
const validateEmail = function (email) {
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regexEmail.test(email);
};

// Declaring userSchema as a new Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "You must enter a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "You must enter a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Keeps a count of the number of friends that a user has
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Using the userSchema to create a model called User
const User = model("User", userSchema);

module.exports = User;
