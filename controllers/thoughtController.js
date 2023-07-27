const { Thought, User } = require('../models');

const thoughtController = {
    getThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getSingleThought: async (req, res) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate({ _id: req.params.userId}, { $push: { thoughts: thought._id } }, { new: true });

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateThought: async (req, res) => {
        try {
            const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteThought: async (req, res) => {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }

            const userId = thought.userId;
            const user = await User.findOneAndUpdate(userId, { $pull: { thoguhts: thought._id } });

            res.json({ message: 'Thought has been successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createReaction: async (req, res) => {
        try {
            const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true });

            if (!updatedThought) {
                return res.status(404).json({ message: 'Thought has not been found with that ID' });
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    removeReaction: async (req,res) => {
        try {
            const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true });

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;