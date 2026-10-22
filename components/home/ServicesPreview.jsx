'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Home, Building2, Paintbrush, Hammer } from 'lucide-react';
import { useEstimateModal } from '@/components/common/EstimateModalContext';

export default function ServicesPreview({ services = [] }) {
  const { openModal } = useEstimateModal();

  // The 4 core featured services matching the visual reference
  const defaultServices = [
    {
      id: 'residential-construction',
      title: 'Residential Construction',
      shortDescription: 'Modern homes with quality and care.',
      icon: Home,
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'commercial-construction',
      title: 'Commercial Construction',
      shortDescription: 'Reliable commercial spaces for your business.',
      icon: Building2,
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'renovation-remodeling',
      title: 'Renovation & Remodeling',
      shortDescription: 'Transform your existing space.',
      icon: Paintbrush,
      coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'turnkey-construction',
      title: 'Turnkey Construction',
      shortDescription: 'End-to-end construction solutions.',
      icon: Hammer,
      coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Map backend services or use defaults
  const displayServices = defaultServices.map((item, index) => {
    const matched = services.find(s => 
      s.title?.toLowerCase().includes(item.title.split(' ')[0].toLowerCase()) ||
      s.category?.toLowerCase() === item.title.split(' ')[0].toLowerCase()
    );
    return {
      ...item,
      title: matched?.title || item.title,
      shortDescription: matched?.shortDescription || item.shortDescription,
      coverImage: matched?.coverImage || item.coverImage,
    };
  });

  return (
    <section className="pt-2 pb-8 sm:pt-4 sm:pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Lora font and accent line */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Our Services
            </h2>
            <div className="hidden sm:block w-16 h-[2px] bg-sand/60 rounded-full" />
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium text-sand hover:text-white transition-colors duration-200 group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* 4 Glassmorphism Service Cards in a Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id || index}
                className="glass-panel rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between group transition-all duration-200 hover:border-white/40 hover:-translate-y-1 shadow-card"
              >
                <div>
                  {/* Architectural Image */}
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-brown-dark/40 shadow-inner">
                    <img
                      src={service.coverImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Title and Short Description with Icon */}
                  <div className="pt-3.5 pb-2 px-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-lg bg-white/20 text-sand flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="font-serif font-bold text-sm sm:text-base text-white leading-tight line-clamp-1">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-beige-200/80 text-xs font-sans leading-relaxed line-clamp-2 pl-8">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Estimate / Learn More with Circular Arrow Button */}
                <div className="pt-2 px-1 flex items-center justify-between border-t border-white/10 mt-2">
                  <button
                    onClick={() => openModal(service.title)}
                    className="text-[11px] font-sans font-medium text-sand hover:text-white transition-colors"
                  >
                    Get Estimate
                  </button>

                  <Link
                    href={`/services#${service.id}`}
                    className="w-7 h-7 rounded-full bg-white text-brown-dark flex items-center justify-center shadow-sm group-hover:bg-terracotta group-hover:text-white transition-all duration-200 group-hover:scale-105"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
