'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Loader2, 
  X, 
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import ImageUpload from '@/components/admin/ImageUpload';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

export default function AdminServicesPage() {
  const { showToast } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Modal state (Create / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential',
    shortDescription: '',
    description: '',
    coverImage: '',
    includedWork: '',
    suitableFor: '',
    published: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete modal state
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data.services || []);
    } catch (err) {
      showToast('Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      category: 'Residential',
      shortDescription: '',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      includedWork: 'Reinforced foundation casting\nFe550D TMT reinforcement\nPlumbing & Electrical rough-in\nDouble coat plaster\nFinal paint and fixtures',
      suitableFor: 'Plot owners looking for premium independent construction in Jaipur.',
      published: true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      category: service.category || 'Residential',
      shortDescription: service.shortDescription || '',
      description: service.description || '',
      coverImage: service.coverImage || '',
      includedWork: Array.isArray(service.includedWork) ? service.includedWork.join('\n') : (service.includedWork || ''),
      suitableFor: service.suitableFor || '',
      published: service.published !== false,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError('Service title is required');
      return;
    }

    setSubmitting(true);
    setFormError('');

    try {
      const payload = {
        ...formData,
        includedWork: formData.includedWork.split('\n').map(s => s.trim()).filter(Boolean),
      };

      const isEdit = Boolean(editingService);
      const url = isEdit ? `/api/services/${editingService.id}` : '/api/services';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save service');

      showToast(isEdit ? 'Service updated successfully' : 'New service added successfully', 'success');
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublish = async (service) => {
    try {
      const updated = !service.published;
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: updated }),
      });
      if (!res.ok) throw new Error('Toggle failed');
      showToast(`Service ${updated ? 'published' : 'unpublished'}`, 'info');
      setServices(prev => prev.map(s => s.id === service.id ? { ...s, published: updated } : s));
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/services/${deleteTargetId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      showToast('Service deleted successfully', 'success');
      setServices(prev => prev.filter(s => s.id !== deleteTargetId));
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
            Manage Construction Services
          </h1>
          <p className="text-xs sm:text-sm text-brown-medium font-sans mt-0.5">
            Create, edit, upload photos, and organize services displayed on the public website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs sm:text-sm font-sans font-semibold shadow-terracotta transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {loading ? (
          <div className="col-span-full p-16 flex flex-col items-center justify-center text-brown-medium gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-terracotta" />
            <span className="text-xs">Loading services list...</span>
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-full p-12 text-center text-brown-medium text-xs sm:text-sm bg-white rounded-2xl border border-beige-300">
            No services configured. Click "Add New Service" above to create one.
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl overflow-hidden border shadow-soft flex flex-col justify-between transition-all duration-200 ${
                service.published ? 'border-beige-300' : 'border-beige-300 opacity-75 bg-beige-50'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full bg-beige-300">
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-brown-deep/85 text-sand text-[11px] font-bold rounded-md">
                    {service.category}
                  </div>
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => togglePublish(service)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-colors duration-200 ${
                        service.published
                          ? 'bg-terracotta text-white'
                          : 'bg-brown-medium text-white'
                      }`}
                      title={service.published ? 'Click to unpublish' : 'Click to publish'}
                    >
                      {service.published ? 'Published' : 'Draft'}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif font-bold text-base text-brown-dark mb-1.5 line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-brown-medium text-xs line-clamp-2 mb-3">
                    {service.shortDescription}
                  </p>
                  <div className="text-[11px] text-brown-medium">
                    <strong className="text-brown-dark">{service.includedWork?.length || 0}</strong> work items included
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-beige-100/60 border-t border-beige-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openEditModal(service)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-beige-300 text-brown-dark hover:text-terracotta text-xs font-semibold rounded-lg shadow-sm transition-colors duration-200"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteTargetId(service.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-deep/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-beige-300 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-beige-200 mb-5">
              <h3 className="font-serif font-bold text-lg text-brown-dark">
                {editingService ? `Edit Service: ${editingService.title}` : 'Add New Construction Service'}
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
                    Service Title <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Turnkey Villa Construction"
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
                    <option value="Civil">Civil</option>
                    <option value="Interior">Interior</option>
                    <option value="Turnkey">Turnkey</option>
                  </select>
                </div>
              </div>

              {/* Cover Image Upload */}
              <ImageUpload
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
                label="Cover Image"
              />

              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Short Summary (Card Preview)
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="One sentence description for homepage cards..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Comprehensive Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Full engineering description and specifications for services page..."
                  className="w-full p-2.5 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Included Work Items (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.includedWork}
                  onChange={(e) => setFormData({ ...formData, includedWork: e.target.value })}
                  placeholder="Soil testing & foundation design&#10;Fe550D TMT steel and RMC casting&#10;Concealed copper electrical conduits"
                  className="w-full p-2.5 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta font-mono text-brown-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Suitable For / Recommended Project Types
                </label>
                <input
                  type="text"
                  value={formData.suitableFor}
                  onChange={(e) => setFormData({ ...formData, suitableFor: e.target.value })}
                  placeholder="e.g. Independent plot owners, bungalow builders in Jaipur"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="rounded text-terracotta focus:ring-terracotta"
                />
                <label htmlFor="published" className="text-xs font-medium text-brown-dark cursor-pointer">
                  Publish this service immediately on the website
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
                  <span>{editingService ? 'Save Changes' : 'Create Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Construction Service"
        message="Are you sure you want to permanently delete this service? It will be removed from the public website."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        loading={deleting}
      />
    </div>
  );
}
