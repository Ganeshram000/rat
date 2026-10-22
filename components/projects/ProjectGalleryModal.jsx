'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { useEstimateModal } from '@/components/common/EstimateModalContext';

export default function ProjectGalleryModal({ project, onClose }) {
  const { openModal } = useEstimateModal();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = project?.images && project.images.length > 0
    ? project.images
    : [project.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-[#1C100B]/95 backdrop-blur-2xl rounded-3xl shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col border border-white/20 text-white">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-wider text-sand font-sans font-semibold">
              {project.category} Construction Project
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white line-clamp-1">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-beige-100 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Hero Viewer */}
          <div className="relative h-72 sm:h-96 md:h-[450px] w-full rounded-2xl overflow-hidden bg-black/50 flex items-center justify-center">
            <img
              src={images[activeImageIndex]}
              alt={`${project.title} - View ${activeImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-mono rounded-lg">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-16 w-24 sm:h-20 sm:w-32 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                    idx === activeImageIndex
                      ? 'ring-2 ring-terracotta scale-102 opacity-100'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Project Details & Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-serif font-bold text-base text-white">
                Project Overview & Engineering Scope
              </h4>
              <p className="text-xs sm:text-sm text-beige-200/80 font-sans leading-relaxed">
                {project.description || project.shortDescription}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-sand mb-2">
                    Key Construction Milestones:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-beige-100 font-sans">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quick Specs Card */}
            <div className="glass-panel p-5 rounded-2xl space-y-3.5 border border-white/10 text-xs font-sans">
              <h4 className="font-serif font-bold text-sm text-white border-b border-white/10 pb-2">
                Project Metrics
              </h4>

              <div className="flex items-center justify-between">
                <span className="text-beige-200/60">Location:</span>
                <span className="font-semibold text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sand" />
                  {project.location}
                </span>
              </div>

              {project.area && (
                <div className="flex items-center justify-between">
                  <span className="text-beige-200/60">Built-Up Area:</span>
                  <span className="font-semibold text-white flex items-center gap-1">
                    <Layers className="w-3 h-3 text-sand" />
                    {project.area}
                  </span>
                </div>
              )}

              {project.completedDate && (
                <div className="flex items-center justify-between">
                  <span className="text-beige-200/60">Handover:</span>
                  <span className="font-semibold text-white flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sand" />
                    {project.completedDate}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openModal(`Similar to ${project.title}`);
                  }}
                  className="w-full py-2.5 px-3 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs font-semibold shadow-terracotta transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Build Similar Property</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
