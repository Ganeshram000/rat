// backend/routes/enquiryRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getAllEnquiries, 
  getById, 
  createEnquiry, 
  updateEnquiry, 
  deleteEnquiry 
} = require('../controllers/enquiryController');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, getAllEnquiries);
router.get('/:id', requireAuth, getById);
router.post('/', createEnquiry); // Public estimate submission
router.patch('/:id', requireAuth, updateEnquiry);
router.delete('/:id', requireAuth, deleteEnquiry);

module.exports = router;
