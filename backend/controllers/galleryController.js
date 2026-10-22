// backend/controllers/galleryController.js
const { 
  getGallery, 
  addGalleryItem: dbAddGalleryItem, 
  deleteGalleryItem: dbDeleteGalleryItem 
} = require('../config/db');

function getAllGallery(req, res) {
  try {
    const gallery = getGallery();
    return res.json({ gallery });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch gallery' });
  }
}

function addGalleryItem(req, res) {
  try {
    const body = req.body;
    if (!body.imageUrl || !body.imageUrl.trim()) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const newItem = dbAddGalleryItem({
      title: body.title || 'Construction Milestone',
      category: body.category || 'Residential',
      location: body.location || 'Jaipur, Rajasthan',
      imageUrl: body.imageUrl,
      description: body.description || '',
    });

    return res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add gallery item' });
  }
}

function deleteGalleryItem(req, res) {
  try {
    const deleted = dbDeleteGalleryItem(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    return res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete gallery item' });
  }
}

module.exports = {
  getAllGallery,
  addGalleryItem,
  deleteGalleryItem
};
