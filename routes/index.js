const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/spanishSpeaking', require('./spanishSpeaking'))

module.exports = router;