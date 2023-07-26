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
            const userId = req.params.userId;
            const user = await User.findById(userId).populate('thoughts').populate('friends');
            if (!user) {
                return res.status(404).json({message: 'No user found with that id'});
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
}