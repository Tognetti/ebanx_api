const express = require('express');

const accountsController = require('../controllers/accounts');

const router = express.Router();

router.post('/', accountsController.postEvent);

module.exports = router;