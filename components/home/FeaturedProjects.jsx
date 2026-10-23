'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, Maximize2, CheckCircle2, Building, Calendar, X } from 'lucide-react';
import { featuredProjects } from '@/data/staticData';

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Residential', 'Commercial', 'Renovation'];

  const filteredProjects = activeCategory === 'All'
    ? featuredProjects
    : featuredProjects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-offwhite text-navy-900 border-t border-navy-100" aria-label="Featured Projects Portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold tracking-[0.2em] uppercase">
              <Building className="w-3.5 h-3.5 text-gold" />
              <span>LANDMARK PORTFOLIO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-950 tracking-tight">
              Featured Projects & Civil Works
            </h2>

            <p className="text-base text-navy-600 font-normal leading-relaxed">
              Explore our completed luxury residences, commercial towers, and ongoing developments in Jaipur.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-navy-200/80 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-navy text-gold shadow-sm'
                    : 'text-navy-700 hover:text-navy hover:bg-offwhite'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden border border-navy-100 hover:border-gold/60 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative h-64 w-full overflow-hidden bg-navy-900 cursor-pointer" onClick={() => setSelectedProject(project)}>
                <Image
                  src={project.image}
                  alt={`${project.name} by NeevSaathi Jaipur`}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                />
                
                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-navy/90 border border-gold/40 text-gold text-xs font-semibold backdrop-blur-sm shadow-sm">
                    {project.category}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm shadow-sm ${
                    project.status === 'Completed'
                      ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/40'
                      : 'bg-gold/90 text-navy-950 font-bold'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Quick Expand Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy/80 hover:bg-gold text-white hover:text-navy-950 flex items-center justify-center transition-colors shadow-md"
                  aria-label="View Project Preview"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Bottom Overlay Info */}
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

              {/* Card Body */}
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

                {/* Scope & Action Button */}
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

        {/* View All Projects Action */}
        <div className="mt-14 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg text-sm font-semibold text-white bg-navy hover:bg-navy-800 transition-colors shadow-md group"
          >
            <span>Explore Complete Portfolio (30+ Projects)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

      {/* Interactive Project Details Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gold/40 text-navy-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
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

            {/* Modal Content */}
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
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-navy-950 bg-gold hover:bg-gold-hover transition-colors shadow-sm"
                >
                  Inquire About Similar Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
