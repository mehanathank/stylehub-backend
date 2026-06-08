const express = require('express');
const router = express.Router();
const { SendContactMessage } = require('../Controllers/ContactController');

router.post('/', SendContactMessage);

module.exports = router;