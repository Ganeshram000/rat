// backend/controllers/serviceController.js
const { 
  getServices, 
  getServiceById, 
  createService: dbCreateService, 
  updateService: dbUpdateService, 
  deleteService: dbDeleteService 
} = require('../config/db');

function getAllServices(req, res) {
  try {
    const services = getServices();
    return res.json({ services });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch services' });
  }
}

function getById(req, res) {
  try {
    const service = getServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    return res.json({ service });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch service' });
  }
}

function createService(req, res) {
  try {
    const body = req.body;
    if (!body.title || !body.title.trim()) {
      return res.status(400).json({ error: 'Service title is required' });
    }

    let includedWork = body.includedWork;
    if (typeof includedWork === 'string') {
      includedWork = includedWork.split('\n').map(s => s.trim()).filter(Boolean);
    }

    const newService = dbCreateService({
      ...body,
      includedWork: includedWork || [],
    });

    return res.status(201).json({ success: true, service: newService });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create service' });
  }
}

function updateService(req, res) {
  try {
    const body = req.body;
    let includedWork = body.includedWork;
    if (typeof includedWork === 'string') {
      includedWork = includedWork.split('\n').map(s => s.trim()).filter(Boolean);
    }

    const updated = dbUpdateService(req.params.id, {
      ...body,
      includedWork: includedWork || body.includedWork,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Service not found' });
    }

    return res.json({ success: true, service: updated });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update service' });
  }
}

function deleteService(req, res) {
  try {
    const deleted = dbDeleteService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Service not found' });
    }
    return res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete service' });
  }
}

module.exports = {
  getAllServices,
  getById,
  createService,
  updateService,
  deleteService
};
