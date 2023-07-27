const { User, Thought } = require('../models');

const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and their thoughts successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    addFriend: async (req, res) => {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: { _id: req.params.friendId } } }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user has been found with that ID' });
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    removeFriend: async (req, res) => {
        try {
            const updatedUser = await User.findOneAndUpdate( { _id: req.params.userId }, { $pull: { friends: { _id: req.params.friendId } } }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ message: 'User has not been found with that ID' });
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = userController;