// backend/routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getAllGallery, 
  addGalleryItem, 
  deleteGalleryItem 
} = require('../controllers/galleryController');
const { requireAuth } = require('../middleware/auth');

router.get('/', getAllGallery);
router.post('/', requireAuth, addGalleryItem);
router.delete('/:id', requireAuth, deleteGalleryItem);

module.exports = router;
