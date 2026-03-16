const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');

router.get('/roles', masterController.getRoles);
router.get('/countries', masterController.getCountries);
router.get('/states', masterController.getStates);

module.exports = router;
