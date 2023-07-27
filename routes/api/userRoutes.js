// Stating requirements and importing userController methods
const router = require("express").Router();
const userController = require("../../controllers/userController");

// Route to get all users
router.get("/", userController.getUsers);

// Route to get a single user
router.get("/:userId", userController.getSingleUser);

// Route to create a new user
router.post("/", userController.createUser);

// Route to update an existing user
router.put("/:userId", userController.updateUser);

// Route to delete an existing user
router.delete("/:userId", userController.deleteUser);

// Route to add a friend to a user
router.post("/:userId/friends/:friendId", userController.addFriend);

// Route to remove a friend from user
router.delete("/:userId/friends/:friendId", userController.removeFriend);

module.exports = router;
