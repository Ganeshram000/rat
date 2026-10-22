'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Loader2, Link as LinkIcon } from 'lucide-react';

export default function ImageUpload({
  value,
  onChange,
  label = 'Image',
  helpText = 'Upload a JPG, PNG or WebP file (max 5MB), or paste an external image URL.',
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      onChange(data.url);
    } catch (err) {
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleApplyUrl = (e) => {
    e.preventDefault();
    if (!urlDraft.trim()) return;
    onChange(urlDraft.trim());
    setUrlDraft('');
    setShowUrlInput(false);
  };

  const handleRemove = () => {
    onChange('');
    setError('');
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-brown-dark">
          {label}
        </label>
      )}

      {/* If an image exists, show preview card */}
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-beige-300 bg-beige-100 group max-w-sm">
          <div className="h-44 w-full bg-beige-200 flex items-center justify-center overflow-hidden">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
          <div className="p-2.5 bg-white/95 backdrop-blur-sm border-t border-beige-300 flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-brown-medium truncate">
              {value}
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1 text-[11px] font-semibold"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty state: upload or paste URL */
        <div className="space-y-2">
          <div className="border-2 border-dashed border-beige-300 hover:border-terracotta/60 rounded-xl p-5 text-center bg-beige-50/60 transition-colors duration-200">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-beige-200 flex items-center justify-center text-terracotta">
                {uploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <UploadCloud className="w-5 h-5" />
                )}
              </div>

              <div className="text-xs text-brown-dark font-medium">
                {uploading ? (
                  <span className="text-terracotta font-semibold">Uploading image to server...</span>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-terracotta hover:underline font-semibold"
                    >
                      Click to upload
                    </button>{' '}
                    or drag & drop
                  </>
                )}
              </div>

              <p className="text-[11px] text-brown-medium">
                {helpText}
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="inline-flex items-center gap-1 text-[11px] text-brown-dark hover:text-terracotta font-medium transition-colors"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>{showUrlInput ? 'Cancel URL entry' : 'Or paste direct image URL'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Paste URL Input Drawer */}
          {showUrlInput && (
            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-beige-300 animate-slide-up">
              <input
                type="url"
                value={urlDraft}
                onChange={(e) => setUrlDraft(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 text-xs px-2.5 py-1.5 border border-beige-300 rounded-md focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-1.5 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold rounded-md transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-[11px] text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
