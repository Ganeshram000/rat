import React from 'react';
import { featuredProjects } from '@/data/staticData';
import ProjectsClientView from './ProjectsClientView';

export const metadata = {
  title: 'Our Projects & Construction Gallery — Jaipur Portfolio | NeevSaathi',
  description: 'View landmark construction projects completed by NeevSaathi in Jaipur: Luxury Villas in Vaishali Nagar and Jagatpura, Commercial complexes in C-Scheme, Renovation projects, and civil works.',
};

export default function ProjectsPage() {
  return (
    <div className="bg-offwhite min-h-screen py-12 sm:py-16 lg:py-20 text-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Hero Banner */}
        <div className="bg-navy rounded-3xl p-8 sm:p-12 lg:p-16 border border-gold/40 shadow-2xl text-white relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              REAL WORK • ZERO CGI RENDERS
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Our Construction Portfolio & Landmark Works
            </h1>
            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed">
              Explore authentic site photographs, architectural finishes, and structural milestones of completed homes and commercial landmarks across Jaipur.
            </p>
          </div>

          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#C9A45C 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        {/* Main Interactive Projects View */}
        <ProjectsClientView initialProjects={featuredProjects} />

      </div>
    </div>
  );
}
