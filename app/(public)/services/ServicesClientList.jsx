'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Tag, Info } from 'lucide-react';
import { useEstimateModal } from '@/components/common/EstimateModalContext';

export default function ServicesClientList({ initialServices = [] }) {
  const { openModal } = useEstimateModal();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Residential', 'Commercial', 'Renovation', 'Civil', 'Interior', 'Turnkey'];

  const filteredServices = selectedCategory === 'All'
    ? initialServices
    : initialServices.filter(s => s.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-terracotta text-white shadow-terracotta'
                : 'glass-button text-beige-100 hover:text-white'
            }`}
          >
            {cat === 'All' ? 'All Construction Services' : cat}
          </button>
        ))}
      </div>

      {/* Services Detailed Cards List */}
      <div className="space-y-10">
        {filteredServices.map((service, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={service.id}
              id={service.id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-200 text-white"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Image Section (5 cols) */}
                <div className={`lg:col-span-5 relative min-h-[280px] lg:min-h-[440px] bg-brown-dark/40 ${isEven ? 'lg:order-2' : ''}`}>
                  <img
                    src={service.coverImage}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:hidden" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-xl glass-badge text-xs font-sans font-semibold text-white shadow-soft">
                    {service.category}
                  </span>
                </div>

                {/* Content Section (7 cols) */}
                <div className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${isEven ? 'lg:order-1' : ''}`}>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-sans font-semibold text-sand uppercase tracking-wider mb-2">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Specialized Service</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                      {service.title}
                    </h2>

                    <p className="text-beige-200/80 font-sans text-xs sm:text-sm leading-relaxed mb-5">
                      {service.description || service.shortDescription}
                    </p>

                    {/* Suitable Project Types */}
                    {service.suitableFor && (
                      <div className="mb-5 p-3.5 rounded-2xl glass-card border border-white/15 text-xs font-sans text-beige-100 flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-white font-bold mb-0.5">Recommended For:</strong>
                          <span>{service.suitableFor}</span>
                        </div>
                      </div>
                    )}

                    {/* Included Work Checklist */}
                    {service.includedWork && service.includedWork.length > 0 && (
                      <div>
                        <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-sand mb-2.5">
                          What is Included in This Service:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-beige-100">
                          {service.includedWork.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openModal(service.title)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta hover:bg-terracotta-hover text-white font-sans font-semibold text-xs sm:text-sm rounded-xl shadow-terracotta transition-all duration-200 cursor-pointer hover:scale-102"
                    >
                      <span>Request an Estimate for This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://wa.me/919829012345?text=${encodeURIComponent(`Hello NeevSaathi, I have an inquiry regarding ${service.title} in Jaipur.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 glass-button hover:bg-white/20 text-white text-xs font-sans font-semibold rounded-xl transition-colors duration-200"
                    >
                      <span>Quick WhatsApp Inquiry</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
