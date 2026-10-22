'use client';

import React, { useState } from 'react';
import { MapPin, Calendar, Layers, Maximize2, ArrowRight, Grid, Image as ImageIcon } from 'lucide-react';
import ProjectGalleryModal from '@/components/projects/ProjectGalleryModal';
import { useEstimateModal } from '@/components/common/EstimateModalContext';

export default function ProjectsClientView({ initialProjects = [], initialGallery = [] }) {
  const { openModal } = useEstimateModal();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'gallery'
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = ['All', 'Residential', 'Commercial', 'Renovation', 'Interior'];

  const filteredProjects = selectedCategory === 'All'
    ? initialProjects
    : initialProjects.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  const filteredGallery = selectedCategory === 'All'
    ? initialGallery
    : initialGallery.filter(g => g.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-8">
      {/* Top Filter & View Mode Controls */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-terracotta text-white shadow-terracotta'
                  : 'glass-button text-beige-100 hover:text-white'
              }`}
            >
              {cat === 'All' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 glass-card rounded-xl">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium rounded-lg transition-colors duration-200 ${
              activeTab === 'projects'
                ? 'bg-terracotta text-white shadow-sm'
                : 'text-beige-200/80 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Project Case Studies ({filteredProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium rounded-lg transition-colors duration-200 ${
              activeTab === 'gallery'
                ? 'bg-terracotta text-white shadow-sm'
                : 'text-beige-200/80 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Site Milestones ({filteredGallery.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Detailed Projects Grid */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glass-panel rounded-3xl p-4 flex flex-col justify-between group cursor-pointer transition-all duration-200 hover:border-white/40 hover:-translate-y-1 shadow-card text-white"
            >
              <div>
                {/* Image Container with Hover Zoom */}
                <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-brown-dark/40 shadow-inner">
                  <img
                    src={project.coverImage || (project.images && project.images[0])}
                    alt={`${project.title} - ${project.location}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Badges */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg glass-badge text-[10px] font-sans font-semibold text-white">
                    {project.category}
                  </span>

                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg glass-badge text-[11px] font-sans font-semibold text-white flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-sand" />
                    <span>View Case Study</span>
                  </span>
                </div>

                {/* Details */}
                <div className="p-2 pt-4">
                  <h3 className="font-serif font-bold text-lg text-white mb-1.5 group-hover:text-sand transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-sand font-sans mb-3">
                    <MapPin className="w-3.5 h-3.5 text-sand flex-shrink-0" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-beige-200/80 font-sans text-xs leading-relaxed line-clamp-2 mb-4">
                    {project.shortDescription || project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-sans text-beige-100">
                    {project.area && (
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-sand" />
                        <span>{project.area}</span>
                      </div>
                    )}
                    {project.completedDate && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sand" />
                        <span>{project.completedDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between text-xs font-sans">
                <span className="text-sand font-semibold group-hover:underline">
                  Explore Photo Gallery
                </span>
                <div className="w-7 h-7 rounded-full bg-white text-brown-dark flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Site Milestones Photo Wall */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="glass-panel rounded-2xl p-2.5 group cursor-pointer hover:border-white/40 transition-all duration-200"
            >
              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-brown-dark/40">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90" />
                
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h4 className="font-serif font-bold text-xs line-clamp-1">{item.title}</h4>
                  <p className="text-[10px] text-sand">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Case Study Modal */}
      {selectedProject && (
        <ProjectGalleryModal
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
