'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Loader2, 
  X, 
  AlertCircle,
  MapPin
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import ImageUpload from '@/components/admin/ImageUpload';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import ProjectGalleryModal from '@/components/projects/ProjectGalleryModal';

export default function AdminProjectsPage() {
  const { showToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential',
    location: 'Vaishali Nagar, Jaipur',
    area: '3,500 sq.ft',
    duration: '10 Months',
    completedDate: '2024',
    featured: true,
    published: true,
    shortDescription: '',
    description: '',
    coverImage: '',
    imagesText: '',
    highlightsText: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete modal
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      showToast('Failed to load projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Residential',
      location: 'Vaishali Nagar, Jaipur',
      area: '3,800 sq.ft',
      duration: '11 Months',
      completedDate: 'January 2025',
      featured: true,
      published: true,
      shortDescription: '',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      imagesText: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      highlightsText: 'Earthquake-resistant RCC structure\nItalian marble in living halls\nSolar terrace pergola & rainwater harvesting'
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category || 'Residential',
      location: project.location || '',
      area: project.area || '',
      duration: project.duration || '',
      completedDate: project.completedDate || '',
      featured: Boolean(project.featured),
      published: project.published !== false,
      shortDescription: project.shortDescription || '',
      description: project.description || '',
      coverImage: project.coverImage || '',
      imagesText: (project.images || []).join('\n'),
      highlightsText: (project.highlights || []).join('\n')
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError('Project title is required');
      return;
    }

    setSubmitting(true);
    setFormError('');

    try {
      const imagesArray = formData.imagesText
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const finalImages = imagesArray.length > 0 ? imagesArray : [formData.coverImage];

      const payload = {
        ...formData,
        coverImage: formData.coverImage || finalImages[0],
        images: finalImages,
        highlights: formData.highlightsText.split('\n').map(s => s.trim()).filter(Boolean),
      };

      const isEdit = Boolean(editingProject);
      const url = isEdit ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save project');

      showToast(isEdit ? 'Project updated successfully' : 'New project added successfully', 'success');
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublish = async (project) => {
    try {
      const updated = !project.published;
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: updated }),
      });
      if (!res.ok) throw new Error('Toggle failed');
      showToast(`Project ${updated ? 'published' : 'unpublished'}`, 'info');
      setProjects(prev => prev.map(p => p.id === project.id ? { ...p, published: updated } : p));
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${deleteTargetId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      showToast('Project deleted successfully', 'success');
      setProjects(prev => prev.filter(p => p.id !== deleteTargetId));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setDeleting(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brown-dark">
            Manage Portfolio Projects
          </h1>
          <p className="text-xs sm:text-sm text-brown-medium font-sans mt-0.5">
            Showcase completed residential villas, commercial structures, and renovations in Jaipur.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs sm:text-sm font-sans font-semibold shadow-terracotta transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {loading ? (
          <div className="col-span-full p-16 flex flex-col items-center justify-center text-brown-medium gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-terracotta" />
            <span className="text-xs">Loading projects portfolio...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full p-12 text-center text-brown-medium text-xs sm:text-sm bg-white rounded-2xl border border-beige-300">
            No projects in database. Click "Add New Project" above to create one.
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className={`bg-white rounded-2xl overflow-hidden border shadow-soft flex flex-col justify-between transition-all duration-200 ${
                project.published ? 'border-beige-300' : 'border-beige-300 opacity-75 bg-beige-50'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full bg-beige-300">
                  <img
                    src={project.coverImage || (project.images && project.images[0])}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-brown-deep/85 text-sand text-[11px] font-bold rounded-md">
                    {project.category}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {project.featured && (
                      <span className="px-2 py-0.5 bg-terracotta text-white text-[10px] font-bold uppercase rounded-md shadow-sm">
                        Featured
                      </span>
                    )}
                    <button
                      onClick={() => togglePublish(project)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-colors duration-200 ${
                        project.published ? 'bg-terracotta text-white' : 'bg-brown-medium text-white'
                      }`}
                    >
                      {project.published ? 'Published' : 'Draft'}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1 text-[11px] text-terracotta font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-brown-dark mb-1.5 line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-brown-medium text-xs line-clamp-2 mb-3">
                    {project.shortDescription}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-brown-medium pt-2 border-t border-beige-200">
                    <span>{project.area}</span>
                    <span>{project.images?.length || 1} photos</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-beige-100/60 border-t border-beige-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(project)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-beige-300 text-brown-dark hover:text-terracotta text-xs font-semibold rounded-lg shadow-sm transition-colors duration-200"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewProject(project)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-beige-200 hover:bg-beige-300 text-brown-dark text-xs font-semibold rounded-lg transition-colors duration-200"
                    title="Preview Public Modal"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setDeleteTargetId(project.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-deep/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-beige-300 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-beige-200 mb-5">
              <h3 className="font-serif font-bold text-lg text-brown-dark">
                {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Portfolio Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-brown-medium hover:text-brown-dark rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brown-dark mb-1">
                    Project Title <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. The Grand Haveli Villa"
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brown-dark mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta bg-white text-brown-dark"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Interior">Interior</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brown-dark mb-1">
                    Jaipur Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Vaishali Nagar, Jaipur"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brown-dark mb-1">
                    Built-up Area
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g. 4,200 sq.ft"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brown-dark mb-1">
                    Completion Date
                  </label>
                  <input
                    type="text"
                    value={formData.completedDate}
                    onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
                    placeholder="e.g. January 2025"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <ImageUpload
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
                label="Cover Image (Primary Showcase)"
              />

              {/* Multiple Gallery Images Textarea */}
              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Additional Project Gallery Image URLs (One URL per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.imagesText}
                  onChange={(e) => setFormData({ ...formData, imagesText: e.target.value })}
                  placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
                  className="w-full p-2.5 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta font-mono text-brown-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="One sentence description for portfolio grid..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Full Project Architectural Details
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive construction, engineering, and architectural narrative..."
                  className="w-full p-2.5 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Key Specifications / Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.highlightsText}
                  onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                  placeholder="4,200 sq.ft built-up area across G+1&#10;Italian marble in living halls&#10;Solar grid integration"
                  className="w-full p-2.5 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta font-mono text-brown-dark"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-brown-dark cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-terracotta focus:ring-terracotta"
                  />
                  <span>Show in Homepage Featured Projects</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-brown-dark cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded text-terracotta focus:ring-terracotta"
                  />
                  <span>Publish this project on website</span>
                </label>
              </div>

              <div className="pt-4 border-t border-beige-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-brown-dark hover:bg-beige-100 rounded-lg border border-beige-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-70 flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Portfolio Project"
        message="Are you sure you want to permanently delete this project? All associated gallery associations will be removed."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        loading={deleting}
      />

      {/* Public Project Lightbox Preview */}
      {previewProject && (
        <ProjectGalleryModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      )}
    </div>
  );
}
