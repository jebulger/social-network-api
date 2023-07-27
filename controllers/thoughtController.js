// Importing Thought and User models
const { Thought, User } = require("../models");

// thoughtController is exported with methods to be used in thoughtRoutes
const thoughtController = {
  // Gets all thoughts in the db
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Grabs a single thought by finding its ID
  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Creates a thought and updates its corresponding user
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Finds a thought by its ID and updates the thought
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );
      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Finds a thought's ID and deletes it
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      // Updates the user info to reflect deleted thought
      // finds the user by username
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      res.json({ message: "Thought has been successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Finds a thought by its ID and pushes a reaction into it
  // updates the thought with the newly added reaction
  createReaction: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );

      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "Thought has not been found with that ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Finds a thought by its ID, then removes a reaction
  // by finding that reactions ID and updates the thought
  removeReaction: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );

      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
