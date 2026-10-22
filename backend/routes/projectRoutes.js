// backend/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getAllProjects, 
  getById, 
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectController');
const { requireAuth } = require('../middleware/auth');

router.get('/', getAllProjects);
router.get('/:id', getById);
router.post('/', requireAuth, createProject);
router.put('/:id', requireAuth, updateProject);
router.delete('/:id', requireAuth, deleteProject);

module.exports = router;
