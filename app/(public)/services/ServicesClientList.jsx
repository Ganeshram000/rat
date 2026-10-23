'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useEstimateModal } from '@/components/common/EstimateModalContext';

export default function ServicesClientList({ initialServices = [] }) {
  const { openModal } = useEstimateModal();

  return (
    <div className="space-y-12">
      {initialServices.map((service, index) => {
        const isEven = index % 2 === 1;

        return (
          <div
            key={service.id}
            id={service.id}
            className="bg-white rounded-3xl overflow-hidden border border-navy-100 hover:border-gold/60 shadow-soft hover:shadow-card-hover transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Image Section (5 cols) */}
              <div className={`lg:col-span-5 relative min-h-[300px] lg:min-h-[420px] bg-navy-900 ${isEven ? 'lg:order-2' : ''}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden" />
                
                {/* Number & Popular Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="w-10 h-10 rounded-xl bg-navy/90 border border-gold/50 flex items-center justify-center text-gold font-mono font-bold text-sm shadow-md">
                    {service.number}
                  </span>
                  {service.popular && (
                    <span className="px-3 py-1 rounded-full bg-gold text-navy-950 text-xs font-bold uppercase tracking-wider shadow-sm">
                      Most Requested
                    </span>
                  )}
                </div>
              </div>

              {/* Text & Deliverables Section (7 cols) */}
              <div className={`lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 ${isEven ? 'lg:order-1' : ''}`}>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-950">
                    {service.title}
                  </h2>

                  <p className="text-base text-navy-700 leading-relaxed">
                    {service.fullDesc || service.shortDesc}
                  </p>

                  {/* Included Deliverables */}
                  <div className="pt-2 space-y-2.5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                      What is Included:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-navy-800">
                          <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-6 border-t border-navy-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-navy-500 font-medium">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span>Contractually Guaranteed Milestones</span>
                  </div>

                  <button
                    onClick={() => openModal(service.title)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold text-navy-950 bg-gold hover:bg-gold-hover transition-colors shadow-gold group"
                  >
                    <span>Get Free Estimate for this Service</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
