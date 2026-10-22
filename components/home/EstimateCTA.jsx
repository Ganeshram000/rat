'use client';

import React from 'react';
import { ArrowRight, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { useEstimateModal } from '@/components/common/EstimateModalContext';

export default function EstimateCTA() {
  const { openModal } = useEstimateModal();

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/20 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-semibold uppercase tracking-wider">
                Transparent Civil Contracting in Jaipur
              </span>
              
              <h2 className="text-2xl sm:text-4xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                Planning to Build Your Dream Home or Commercial Project?
              </h2>

              <p className="text-beige-200/80 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
                Speak directly with senior civil engineers. We provide an on-site evaluation, structural feasibility check, and an itemized BOQ estimate with no cost obligation.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs font-sans text-beige-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-sand" />
                  <span>Free Plot Consultation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-sand" />
                  <span>Itemized Material Specifications</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-sand" />
                  <span>JDA Norm Compliance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => openModal()}
                className="w-full flex items-center justify-center gap-2.5 px-7 py-3.5 bg-terracotta hover:bg-terracotta-hover text-white font-sans font-medium text-sm rounded-xl shadow-terracotta transition-all duration-200 cursor-pointer hover:scale-102"
              >
                <span>Request Your Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+919829012345"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 glass-button hover:bg-white/20 text-beige-100 hover:text-white rounded-xl text-xs font-sans font-medium transition-colors duration-200"
                >
                  <Phone className="w-3.5 h-3.5 text-sand" />
                  <span>Call Office</span>
                </a>

                <a
                  href="https://wa.me/919829012345?text=Hello%20NeevSaathi%2C%20I%20am%20planning%20to%20build%20and%20would%20like%20an%20estimate."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-sans font-medium transition-all duration-200"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
