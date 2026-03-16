const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/list', userController.listUsers);
router.get('/:id', userController.getUserById);
router.post('/add', userController.addUser);
router.post('/edit', userController.editUser);
router.post('/update-status', userController.updateStatus);
router.delete('/:id', userController.deleteUser);

module.exports = router;
