// backend/routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getAllServices, 
  getById, 
  createService, 
  updateService, 
  deleteService 
} = require('../controllers/serviceController');
const { requireAuth } = require('../middleware/auth');

router.get('/', getAllServices);
router.get('/:id', getById);
router.post('/', requireAuth, createService);
router.put('/:id', requireAuth, updateService);
router.delete('/:id', requireAuth, deleteService);

module.exports = router;
