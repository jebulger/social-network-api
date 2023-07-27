const router = require('express').Router();
const userController = require('../../controllers/userController');

router.get('/', userController.getUsers);

router.get('/:userId', userController.getSingleUser);

router.post('/', userController.createUser);

router.put('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

router.post('/:userId/friends/:friendId', userController.addFriend);

router.delete('/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;