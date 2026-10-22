import React from 'react';
import { getProjects, getGallery } from '@/lib/db';
import ProjectsClientView from './ProjectsClientView';

export const metadata = {
  title: 'Our Projects & Construction Gallery — Jaipur Portfolio',
  description: 'View landmark construction projects completed by NeevSaathi in Jaipur: Luxury Villas in Vaishali Nagar, Commercial complexes in Mansarovar, Renovation projects, and civil works.',
};

export default function ProjectsPage() {
  const projects = (getProjects() || []).filter(p => p.published);
  const gallery = getGallery() || [];

  return (
    <div className="py-8 sm:py-12 lg:py-16 space-y-10 sm:space-y-14">
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-semibold uppercase tracking-wider mb-3">
              Real Work • Zero CGI Renders
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Our Construction Portfolio & Gallery
            </h1>
            <p className="text-beige-200/90 font-sans text-sm sm:text-base mt-3 leading-relaxed">
              Explore authentic site photographs, architectural finishes, and structural milestones of completed homes and commercial landmarks across Jaipur.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Projects & Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectsClientView initialProjects={projects} initialGallery={gallery} />
      </div>
    </div>
  );
}
