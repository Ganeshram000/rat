// backend/routes/settingsRoutes.js
const express = require('express');
const router = express.Router();
const { fetchSettings, saveSettings } = require('../controllers/settingsController');
const { requireAuth } = require('../middleware/auth');

router.get('/', fetchSettings);
router.put('/', requireAuth, saveSettings);

module.exports = router;
