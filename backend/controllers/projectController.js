// backend/controllers/projectController.js
const { 
  getProjects, 
  getProjectById, 
  createProject: dbCreateProject, 
  updateProject: dbUpdateProject, 
  deleteProject: dbDeleteProject 
} = require('../config/db');

function getAllProjects(req, res) {
  try {
    const projects = getProjects();
    return res.json({ projects });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

function getById(req, res) {
  try {
    const project = getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json({ project });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch project' });
  }
}

function createProject(req, res) {
  try {
    const body = req.body;
    if (!body.title || !body.title.trim()) {
      return res.status(400).json({ error: 'Project title is required' });
    }

    let images = body.images || [];
    if (typeof body.imagesText === 'string') {
      const parsedUrls = body.imagesText.split('\n').map(s => s.trim()).filter(Boolean);
      images = Array.from(new Set([...(body.coverImage ? [body.coverImage] : []), ...parsedUrls]));
    } else if (body.coverImage && images.length === 0) {
      images = [body.coverImage];
    }

    let highlights = body.highlights || [];
    if (typeof body.highlightsText === 'string') {
      highlights = body.highlightsText.split('\n').map(s => s.trim()).filter(Boolean);
    }

    const newProject = dbCreateProject({
      ...body,
      images,
      highlights,
    });

    return res.status(201).json({ success: true, project: newProject });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create project' });
  }
}

function updateProject(req, res) {
  try {
    const body = req.body;
    let images = body.images || [];
    if (typeof body.imagesText === 'string') {
      const parsedUrls = body.imagesText.split('\n').map(s => s.trim()).filter(Boolean);
      images = Array.from(new Set([...(body.coverImage ? [body.coverImage] : []), ...parsedUrls]));
    } else if (body.coverImage && images.length === 0) {
      images = [body.coverImage];
    }

    let highlights = body.highlights;
    if (typeof body.highlightsText === 'string') {
      highlights = body.highlightsText.split('\n').map(s => s.trim()).filter(Boolean);
    }

    const updated = dbUpdateProject(req.params.id, {
      ...body,
      images,
      ...(highlights ? { highlights } : {}),
    });

    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.json({ success: true, project: updated });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update project' });
  }
}

function deleteProject(req, res) {
  try {
    const deleted = dbDeleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete project' });
  }
}

module.exports = {
  getAllProjects,
  getById,
  createProject,
  updateProject,
  deleteProject
};
