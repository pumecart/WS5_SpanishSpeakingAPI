const express = require('express');
const router = express.Router();

const spanishSpeakingController = require('../controllers/spanishSpeaking');

router.get('/', spanishSpeakingController.getAll);

router.get('/:id', spanishSpeakingController.getSingle);

//week 3 additions: POST, PUT, DELETE

router.post('/', spanishSpeakingController.createSpanishSpeaking);

router.put('/:id', spanishSpeakingController.updateSpanishSpeaking);

router.delete('/:id', spanishSpeakingController.deleteSpanishSpeaking);
//end of week 3 additions

module.exports = router;