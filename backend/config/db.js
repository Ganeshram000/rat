// backend/config/db.js
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(process.cwd(), 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJsonFile(filename, defaultData = []) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultData;
  }
}

function writeJsonFile(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const tempPath = `${filePath}.tmp.${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, filePath);
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

// ================= Services =================
function getServices() {
  return readJsonFile('services.json', []);
}

function getServiceById(idOrSlug) {
  const services = getServices();
  return services.find(s => s.id === idOrSlug || s.slug === idOrSlug) || null;
}

function createService(serviceData) {
  const services = getServices();
  const slug = serviceData.slug || (serviceData.title || 'service').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const newService = {
    id: slug,
    slug,
    published: serviceData.published !== undefined ? Boolean(serviceData.published) : true,
    order: services.length + 1,
    createdAt: new Date().toISOString(),
    ...serviceData,
  };
  services.push(newService);
  writeJsonFile('services.json', services);
  return newService;
}

function updateService(id, updatedData) {
  const services = getServices();
  const index = services.findIndex(s => s.id === id);
  if (index === -1) return null;
  services[index] = { ...services[index], ...updatedData, id };
  writeJsonFile('services.json', services);
  return services[index];
}

function deleteService(id) {
  const services = getServices();
  const filtered = services.filter(s => s.id !== id);
  if (filtered.length === services.length) return false;
  writeJsonFile('services.json', filtered);
  return true;
}

// ================= Projects =================
function getProjects() {
  return readJsonFile('projects.json', []);
}

function getProjectById(idOrSlug) {
  const projects = getProjects();
  return projects.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

function createProject(projectData) {
  const projects = getProjects();
  const slug = projectData.slug || (projectData.title || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const newProject = {
    id: `proj-${Date.now()}`,
    slug,
    published: true,
    featured: Boolean(projectData.featured),
    createdAt: new Date().toISOString(),
    images: projectData.images || (projectData.coverImage ? [projectData.coverImage] : []),
    ...projectData,
  };
  projects.unshift(newProject);
  writeJsonFile('projects.json', projects);
  return newProject;
}

function updateProject(id, updatedData) {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...updatedData, id };
  writeJsonFile('projects.json', projects);
  return projects[index];
}

function deleteProject(id) {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  if (filtered.length === projects.length) return false;
  writeJsonFile('projects.json', filtered);
  return true;
}

// ================= Gallery =================
function getGallery() {
  return readJsonFile('gallery.json', []);
}

function addGalleryItem(item) {
  const gallery = getGallery();
  const newItem = {
    id: `gal-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...item
  };
  gallery.unshift(newItem);
  writeJsonFile('gallery.json', gallery);
  return newItem;
}

function deleteGalleryItem(id) {
  const gallery = getGallery();
  const filtered = gallery.filter(g => g.id !== id);
  if (filtered.length === gallery.length) return false;
  writeJsonFile('gallery.json', filtered);
  return true;
}

// ================= Enquiries =================
function getEnquiries() {
  return readJsonFile('enquiries.json', []);
}

function getEnquiryById(id) {
  const enquiries = getEnquiries();
  return enquiries.find(e => e.id === id) || null;
}

function createEnquiry(enquiryData) {
  const enquiries = getEnquiries();
  
  // Anti-duplicate protection: 5 minutes limit per phone
  const fiveMinAgo = Date.now() - 5 * 60 * 1000;
  const isDuplicate = enquiries.some(e => 
    e.phone === enquiryData.phone && 
    new Date(e.createdAt).getTime() > fiveMinAgo
  );
  if (isDuplicate) {
    throw new Error('An enquiry from this mobile number was recently submitted. Our team will contact you shortly.');
  }

  const newEnquiry = {
    id: `enq-${Date.now()}`,
    status: 'New',
    createdAt: new Date().toISOString(),
    notes: '',
    ...enquiryData,
  };
  enquiries.unshift(newEnquiry);
  writeJsonFile('enquiries.json', enquiries);
  return newEnquiry;
}

function updateEnquiry(id, updatedData) {
  const enquiries = getEnquiries();
  const index = enquiries.findIndex(e => e.id === id);
  if (index === -1) return null;
  enquiries[index] = { ...enquiries[index], ...updatedData, id };
  writeJsonFile('enquiries.json', enquiries);
  return enquiries[index];
}

function deleteEnquiry(id) {
  const enquiries = getEnquiries();
  const filtered = enquiries.filter(e => e.id !== id);
  if (filtered.length === enquiries.length) return false;
  writeJsonFile('enquiries.json', filtered);
  return true;
}

// ================= Settings =================
function getSettings() {
  return readJsonFile('settings.json', {
    businessName: 'NeevSaathi',
    legalName: 'NeevSaathi Construction & Contracting Pvt. Ltd.',
    tagline: 'Building Your Vision, From Foundation to Finish.',
    phone: '+91 98290 12345',
    whatsapp: '+91 98290 12345',
    email: 'contact@neevsaathi.com',
    city: 'Jaipur',
    state: 'Rajasthan',
  });
}

function updateSettings(newSettings) {
  const current = getSettings();
  const updated = {
    ...current,
    ...newSettings,
    socialLinks: { ...(current.socialLinks || {}), ...(newSettings.socialLinks || {}) },
    seo: { ...(current.seo || {}), ...(newSettings.seo || {}) }
  };
  writeJsonFile('settings.json', updated);
  return updated;
}

// ================= Auth =================
const AUTH_FILE = path.join(DATA_DIR, 'auth.json');
const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@neevsaathi.com',
  name: 'NeevSaathi Admin',
  role: 'superadmin',
  passwordHash: '$2a$10$WpkmB6k62vS315KzN8N8y.7nC5e98w904D024oO7x6eYg5JkUeK7C' // NeevSaathi@2025
};

function getStoredAdmin() {
  try {
    if (!fs.existsSync(AUTH_FILE)) {
      const defaultHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'NeevSaathi@2025', 10);
      const initial = { ...DEFAULT_ADMIN, passwordHash: defaultHash };
      fs.writeFileSync(AUTH_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(AUTH_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return DEFAULT_ADMIN;
  }
}

function updateAdminPassword(newPassword) {
  const current = getStoredAdmin();
  const newHash = bcrypt.hashSync(newPassword, 10);
  const updated = { ...current, passwordHash: newHash, updatedAt: new Date().toISOString() };
  fs.writeFileSync(AUTH_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  return true;
}

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getGallery,
  addGalleryItem,
  deleteGalleryItem,
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getSettings,
  updateSettings,
  getStoredAdmin,
  updateAdminPassword
};
