const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/notes'
// GET /api/notes
router.get('/', ensureLoggedIn, notesCtrl.getAll);
// POST /api/notes (create note)
router.post('/', ensureLoggedIn, notesCtrl.create);

module.exports = router;