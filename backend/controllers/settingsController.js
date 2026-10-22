// backend/controllers/settingsController.js
const { getSettings, updateSettings } = require('../config/db');

function fetchSettings(req, res) {
  try {
    const settings = getSettings();
    return res.json({ settings });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
}

function saveSettings(req, res) {
  try {
    const updated = updateSettings(req.body);
    return res.json({
      success: true,
      settings: updated,
      message: 'Website settings updated successfully'
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update settings' });
  }
}

module.exports = {
  fetchSettings,
  saveSettings
};
