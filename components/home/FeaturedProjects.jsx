'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import ProjectGalleryModal from '@/components/projects/ProjectGalleryModal';

export default function FeaturedProjects({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);

  // Default projects matching the visual reference if none supplied
  const defaultProjects = [
    {
      id: 'modern-villa',
      title: 'Modern Villa',
      location: 'Jagatpura, Jaipur',
      category: 'Residential',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      description: '4,200 sq.ft luxury villa with double-height foyer, landscaped courtyard, and earthquake-resistant RCC frame.',
    },
    {
      id: 'commercial-complex',
      title: 'Commercial Complex',
      location: 'Sitapura, Jaipur',
      category: 'Commercial',
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      description: '4-storey commercial plaza engineered with JDA setback compliance, curtain glass facade, and high-footfall flooring.',
    },
    {
      id: 'home-renovation',
      title: 'Home Renovation',
      location: 'Vaishali Nagar, Jaipur',
      category: 'Renovation',
      coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      description: 'Complete structural strengthening, elevation redesign with Rajasthani stone cladding, and water-proofing retrofit.',
    },
    {
      id: 'interior-project',
      title: 'Interior Project',
      location: 'Mansarovar, Jaipur',
      category: 'Interior',
      coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      description: 'Custom modular woodwork, false ceilings with concealed warm ambient lighting, and Italian vitrified finishes.',
    },
  ];

  // Merge with backend projects if available
  const displayProjects = defaultProjects.map((dp, idx) => {
    const backendProj = projects[idx] || projects.find(p => p.title?.toLowerCase().includes(dp.title.toLowerCase()));
    if (backendProj) {
      return {
        ...dp,
        ...backendProj,
        coverImage: backendProj.coverImage || (backendProj.images && backendProj.images[0]) || dp.coverImage,
      };
    }
    return dp;
  });

  return (
    <section className="pt-2 pb-10 sm:pt-4 sm:pb-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Lora font and accent line */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Featured Projects
            </h2>
            <div className="hidden sm:block w-16 h-[2px] bg-sand/60 rounded-full" />
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium text-sand hover:text-white transition-colors duration-200 group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* 4 Glassmorphism Project Cards in a Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayProjects.map((project, index) => (
            <div
              key={project.id || index}
              onClick={() => setSelectedProject(project)}
              className="glass-panel rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between group cursor-pointer transition-all duration-200 hover:border-white/40 hover:-translate-y-1 shadow-card"
            >
              <div>
                {/* Image Container with Hover Zoom */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-brown-dark/40 shadow-inner">
                  <img
                    src={project.coverImage}
                    alt={`${project.title} - ${project.location}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg glass-badge text-[10px] font-sans font-semibold text-white">
                    {project.category}
                  </span>
                </div>

                {/* Project Title and Location */}
                <div className="pt-3.5 pb-1 px-1">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-white leading-tight line-clamp-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] font-sans text-sand mt-0.5">
                    <MapPin className="w-3 h-3 text-sand flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: View Details & Circular Arrow Button */}
              <div className="pt-2 px-1 flex items-center justify-between border-t border-white/10 mt-2">
                <span className="text-[11px] font-sans font-medium text-beige-200/80 group-hover:text-white transition-colors">
                  View Case Study
                </span>

                <div 
                  className="w-7 h-7 rounded-full bg-white text-brown-dark flex items-center justify-center shadow-sm group-hover:bg-terracotta group-hover:text-white transition-all duration-200 group-hover:scale-105"
                  aria-label={`View ${project.title}`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Case Study Modal */}
      {selectedProject && (
        <ProjectGalleryModal
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
