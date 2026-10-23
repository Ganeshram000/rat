'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, 
  Building2, 
  Compass, 
  Hammer, 
  Paintbrush, 
  ClipboardCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { servicesData } from '@/data/staticData';
import { useEstimateModal } from '@/components/common/EstimateModalContext';

const serviceIcons = {
  'residential-construction': Home,
  'commercial-construction': Building2,
  'architectural-design': Compass,
  'renovation-remodeling': Hammer,
  'interior-work': Paintbrush,
  'project-management': ClipboardCheck,
};

export default function OurServices() {
  const { openModal } = useEstimateModal();

  return (
    <section id="services" className="py-20 lg:py-28 bg-white text-navy-900 border-t border-navy-100" aria-label="Our Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>OUR CORE EXPERTISE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-950 tracking-tight">
            End-to-End Construction & Civil Engineering
          </h2>

          <p className="text-base sm:text-lg text-navy-600 font-normal leading-relaxed">
            Delivering structural excellence across residential, commercial, and turnkey architectural spaces in Jaipur with certified materials and on-time guarantees.
          </p>
        </div>

        {/* 6 Services Grid (3 cols on lg, 2 on md, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const IconComponent = serviceIcons[service.id] || Home;

            return (
              <div
                key={service.id}
                className="group flex flex-col bg-offwhite rounded-2xl overflow-hidden border border-navy-100 hover:border-gold/60 shadow-soft hover:shadow-card-hover transition-all duration-300"
              >
                {/* Service Card Image */}
                <div className="relative h-52 w-full overflow-hidden bg-navy-900">
                  <Image
                    src={service.image}
                    alt={`${service.title} in Jaipur by NeevSaathi`}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
                  
                  {/* Gold Number Badge */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-navy/90 border border-gold/50 flex items-center justify-center text-gold font-mono font-bold text-sm shadow-md">
                    {service.number}
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-gold/90 text-navy-950 flex items-center justify-center shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Popular Tag if applicable */}
                  {service.popular && (
                    <div className="absolute bottom-3 left-4 px-2.5 py-0.5 rounded-full bg-gold text-navy-950 text-[10px] font-bold tracking-wider uppercase shadow-sm">
                      Most Requested
                    </div>
                  )}
                </div>

                {/* Service Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-xl font-serif font-bold text-navy-950 group-hover:text-gold-dark transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-navy-600 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Features List */}
                    <div className="pt-2 space-y-2 border-t border-navy-200/60">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-medium text-navy-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-navy-200/60 flex items-center justify-between">
                    <Link
                      href="/services"
                      className="text-xs font-semibold text-navy-800 hover:text-gold flex items-center gap-1 transition-colors"
                    >
                      <span>Explore Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => openModal(service.title)}
                      className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-navy-950 bg-gold hover:bg-gold-hover transition-colors shadow-sm"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-navy text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-gold/40 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
              Planning a Custom Villa or Commercial Venture in Jaipur?
            </h4>
            <p className="text-xs sm:text-sm text-white/80">
              Schedule a free on-site engineering consultation and receive an itemized preliminary BOQ.
            </p>
          </div>

          <button
            onClick={() => openModal()}
            className="flex-shrink-0 px-6 py-3 rounded-lg text-sm font-semibold text-navy-950 bg-gold hover:bg-gold-hover transition-all shadow-gold"
          >
            Schedule Free Consultation
          </button>
        </div>

      </div>
    </section>
  );
}
