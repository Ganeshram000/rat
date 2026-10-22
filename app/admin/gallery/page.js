'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Eye, 
  Loader2, 
  X, 
  Image as ImageIcon, 
  MapPin, 
  Filter 
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import ImageUpload from '@/components/admin/ImageUpload';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

export default function AdminGalleryPage() {
  const { showToast } = useToast();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Form modal (Upload / Add)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential',
    location: 'Vaishali Nagar, Jaipur',
    imageUrl: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete modal
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Lightbox preview
  const [previewItem, setPreviewItem] = useState(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setGallery(data.gallery || []);
    } catch (err) {
      showToast('Failed to load gallery items', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openCreateModal = () => {
    setFormData({
      title: '',
      category: 'Residential',
      location: 'Vaishali Nagar, Jaipur',
      imageUrl: '',
      description: '',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.imageUrl) {
      setFormError('Please upload an image or provide an image URL');
      return;
    }

    if (!formData.title.trim()) {
      setFormError('Please enter a photo title or caption');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add image');

      showToast('Photo added to gallery', 'success');
      setIsModalOpen(false);
      fetchGallery();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/gallery/${deleteTargetId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      showToast('Photo removed from gallery', 'success');
      setGallery((prev) => prev.filter((item) => item.id !== deleteTargetId));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setDeleting(false);
      setDeleteTargetId(null);
    }
  };

  const categories = ['All', 'Residential', 'Commercial', 'Civil', 'Renovation', 'Interior'];

  const filteredGallery = activeCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brown-dark">
            Manage Gallery & Site Photos
          </h1>
          <p className="text-xs sm:text-sm text-brown-medium font-sans mt-0.5">
            Upload high-resolution photographs of Jaipur construction sites, structural milestones, and finishing details.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs sm:text-sm font-sans font-semibold shadow-terracotta transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Photo</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-sans">
        <span className="text-xs text-brown-medium flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5 text-terracotta" />
          <span>Category:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
              activeCategory === cat
                ? 'bg-terracotta text-white shadow-sm'
                : 'bg-white border border-beige-300 text-brown-dark hover:border-terracotta'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-xs text-brown-medium">
          Showing <strong className="text-brown-dark">{filteredGallery.length}</strong> photos
        </span>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 font-sans">
        {loading ? (
          <div className="col-span-full p-16 flex flex-col items-center justify-center text-brown-medium gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-terracotta" />
            <span className="text-xs">Loading photo gallery...</span>
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="col-span-full p-12 text-center text-brown-medium text-xs sm:text-sm bg-white rounded-2xl border border-beige-300">
            No photos found in this category. Click &quot;Upload New Photo&quot; to add site photos.
          </div>
        ) : (
          filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl overflow-hidden border border-beige-300 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col"
            >
              {/* Photo Image Container */}
              <div className="relative h-48 w-full bg-beige-200 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-brown-deep/80 text-sand text-[10px] font-bold rounded-md">
                  {item.category}
                </div>

                {/* Hover overlay with action buttons */}
                <div className="absolute inset-0 bg-brown-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="p-2 bg-white/90 hover:bg-white text-brown-dark rounded-full shadow-md transition-colors"
                    title="Preview full size"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(item.id)}
                    className="p-2 bg-white/90 hover:bg-red-50 text-red-600 rounded-full shadow-md transition-colors"
                    title="Delete photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Photo Details */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-brown-dark line-clamp-1">
                    {item.title}
                  </h4>
                  {item.location && (
                    <div className="flex items-center gap-1 text-[11px] text-brown-medium mt-1">
                      <MapPin className="w-3 h-3 text-terracotta flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="text-[11px] text-brown-medium mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-brown-deep/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl z-10 overflow-hidden border border-beige-300 animate-slide-up">
            <div className="p-5 border-b border-beige-200 flex items-center justify-between">
              <h2 className="font-serif font-bold text-lg text-brown-dark">
                Upload Site Photo to Gallery
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-brown-medium hover:text-brown-dark p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans">
              {formError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                  {formError}
                </div>
              )}

              {/* Image Upload Component */}
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                label="Site Photo"
                helpText="Upload a JPG, PNG or WebP image from your site, or paste an image URL."
              />

              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Photo Title / Landmark Caption
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Raft Foundation Casting at Jagatpura Villa"
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <option value="Civil">Civil</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Interior">Interior</option>
                  </select>
                </div>

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
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown-dark mb-1">
                  Brief Technical Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Fe550D TMT reinforcement inspection prior to RMC slab pour."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
                />
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
                  <span>Add to Gallery</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-deep/90 backdrop-blur-md">
          <button
            onClick={() => setPreviewItem(null)}
            className="absolute top-4 right-4 p-2 text-beige-100 hover:text-white bg-brown-dark/60 rounded-full"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
            <img
              src={previewItem.imageUrl}
              alt={previewItem.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="font-serif text-lg font-bold">{previewItem.title}</h3>
              <p className="text-xs text-sand font-sans mt-0.5">
                {previewItem.category} • {previewItem.location}
              </p>
              {previewItem.description && (
                <p className="text-xs text-beige-200 font-sans mt-1 max-w-xl mx-auto">
                  {previewItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Remove Photo from Gallery"
        message="Are you sure you want to delete this photo? It will no longer appear in the gallery."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        loading={deleting}
      />
    </div>
  );
}

