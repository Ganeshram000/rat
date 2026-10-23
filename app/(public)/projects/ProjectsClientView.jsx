'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Maximize2, ArrowRight, X, Building, CheckCircle2 } from 'lucide-react';
import { useEstimateModal } from '@/components/common/EstimateModalContext';

export default function ProjectsClientView({ initialProjects = [] }) {
  const { openModal } = useEstimateModal();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Residential', 'Commercial', 'Renovation'];

  const filteredProjects = selectedCategory === 'All'
    ? initialProjects
    : initialProjects.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-10">
      {/* Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-navy-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-navy text-gold shadow-md'
                  : 'text-navy-700 hover:text-navy hover:bg-offwhite'
              }`}
            >
              {cat === 'All' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-navy-500 font-medium">
          Showing {filteredProjects.length} Verified Projects
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-2xl overflow-hidden border border-navy-100 hover:border-gold/60 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Container */}
            <div 
              className="relative h-64 w-full overflow-hidden bg-navy-900 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-navy/90 border border-gold/40 text-gold text-xs font-semibold backdrop-blur-sm">
                  {project.category}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                  project.status === 'Completed'
                    ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/40'
                    : 'bg-gold text-navy-950 font-bold'
                }`}>
                  {project.status}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy/80 hover:bg-gold text-white hover:text-navy-950 flex items-center justify-center transition-colors shadow-md"
                aria-label="View Details"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {project.location}
                </span>
                <span className="font-mono text-gold font-semibold">
                  {project.area}
                </span>
              </div>
            </div>

            {/* Card Info */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 
                  onClick={() => setSelectedProject(project)}
                  className="text-xl font-serif font-bold text-navy-950 group-hover:text-gold-dark transition-colors cursor-pointer"
                >
                  {project.name}
                </h3>
                <p className="text-xs text-navy-600 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-3 border-t border-navy-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-navy-500 truncate max-w-[170px]">
                  {project.scope}
                </span>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 hover:text-gold transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gold/40 text-navy-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 w-full bg-navy-900">
              <Image
                src={selectedProject.image}
                alt={selectedProject.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy-950/80 text-white hover:text-gold flex items-center justify-center transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full bg-gold text-navy-950 text-xs font-bold uppercase tracking-wider">
                  {selectedProject.category} • {selectedProject.status}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-2xl font-serif font-bold text-navy-950">
                  {selectedProject.name}
                </h3>
                <span className="text-sm font-semibold text-gold-dark font-mono">
                  {selectedProject.area}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-navy-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-gold" />
                  {selectedProject.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-gold" />
                  Year: {selectedProject.year}
                </span>
              </div>

              <p className="text-sm text-navy-700 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="p-4 rounded-xl bg-offwhite border border-navy-100 text-xs space-y-1">
                <span className="font-semibold text-navy-900 block">Scope of Execution:</span>
                <p className="text-navy-600">{selectedProject.scope}</p>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-navy-800 hover:bg-offwhite border border-navy-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    openModal(`Inquiry about ${selectedProject.name}`);
                  }}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-navy-950 bg-gold hover:bg-gold-hover transition-colors shadow-sm"
                >
                  Get Quote for Similar Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
