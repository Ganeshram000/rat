// backend/controllers/enquiryController.js
const { 
  getEnquiries, 
  getEnquiryById, 
  createEnquiry: dbCreateEnquiry, 
  updateEnquiry: dbUpdateEnquiry, 
  deleteEnquiry: dbDeleteEnquiry 
} = require('../config/db');

function getAllEnquiries(req, res) {
  try {
    const enquiries = getEnquiries();
    return res.json({ enquiries });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
}

function getById(req, res) {
  try {
    const enquiry = getEnquiryById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    return res.json({ enquiry });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch enquiry' });
  }
}

function createEnquiry(req, res) {
  try {
    const body = req.body;

    // Honeypot bot protection
    if (body.website || body.honeypot) {
      return res.json({ success: true, message: 'Enquiry received' });
    }

    const { name, phone, workType, projectLocation, plotArea, budgetRange, timeframe, message } = body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Please provide your full name' });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: 'Please provide your mobile number' });
    }

    const cleanPhone = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        error: 'Please enter a valid 10-digit Indian mobile number (e.g. 9829012345)'
      });
    }

    const newEnquiry = dbCreateEnquiry({
      name: name.trim(),
      phone: cleanPhone,
      email: (body.email || '').trim(),
      workType: workType || 'Residential House Construction',
      projectLocation: (projectLocation || '').trim() || 'Jaipur',
      plotArea: (plotArea || '').trim(),
      budgetRange: budgetRange || '₹30L – ₹60L',
      timeframe: timeframe || 'Immediate (Within 1 Month)',
      message: (message || '').trim(),
      source: body.source || 'Website Contact Form',
    });

    return res.status(201).json({
      success: true,
      enquiry: newEnquiry,
      message: 'Thank you! Your construction estimate request has been logged. Our Jaipur engineering team will contact you within 24 hours.'
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Failed to submit enquiry'
    });
  }
}

function updateEnquiry(req, res) {
  try {
    const updated = dbUpdateEnquiry(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    return res.json({ success: true, enquiry: updated });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update enquiry' });
  }
}

function deleteEnquiry(req, res) {
  try {
    const deleted = dbDeleteEnquiry(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    return res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete enquiry' });
  }
}

module.exports = {
  getAllEnquiries,
  getById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry
};
