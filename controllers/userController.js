// Importing User and Thought models
const { User, Thought } = require("../models");

// userController is exported with methods to be used in userRoutes
const userController = {
  // Method for getting all users
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Gets a single user by finding its ID
  // also populating their thoughts, reactions, and friends
  getSingleUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate({
          path: "thoughts",
          populate: {
            path: "reactions",
            model: "Reaction",
          },
        })
        .populate("friends");
      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Creates a new user
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Finds user by ID and updates with newly passed body
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with that ID" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Finds user by ID and deletes the account and their associated thoughts
  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and their thoughts successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Finds user by ID and adds a friend to their list by finding
  // that friend's ID, updates the user info with new friend
  addFriend: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: { _id: req.params.friendId } } },
        { new: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "No user has been found with that ID" });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Finds user by ID, removes friend by ID, and updates the user
  // to reflect the removal
  removeFriend: async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
