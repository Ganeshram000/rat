import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Award, Shield, Users } from 'lucide-react';
import { companyIntro } from '@/data/staticData';

export default function CompanyIntro() {
  return (
    <section className="py-20 lg:py-28 bg-offwhite text-navy-900 overflow-hidden" aria-label="Company Introduction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Features (7 cols on large screens) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Gold Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold tracking-wider uppercase">
              <Award className="w-3.5 h-3.5 text-gold" />
              <span>{companyIntro.badge}</span>
            </div>

            {/* Section Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-950 tracking-tight leading-tight">
              {companyIntro.title}
            </h2>

            {/* Highlight Lead */}
            <p className="text-lg font-medium text-gold-dark">
              {companyIntro.highlight}
            </p>

            {/* Paragraphs */}
            <div className="space-y-4 text-navy-700 font-normal leading-relaxed text-base">
              {companyIntro.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* 4 Core Features / Pillars with Gold Checks */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {companyIntro.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-navy-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-navy-800 leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-navy hover:bg-navy-800 transition-colors shadow-md group"
              >
                <span>Discover Our Story & Values</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-navy-900 bg-white hover:bg-gold-50 border border-gold/50 transition-colors"
              >
                <Users className="w-4 h-4 text-gold" />
                <span>Meet Our Engineers</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Completed Building Image with Luxury Gold Accent (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Gold Backdrop Frame */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-gold/40 pointer-events-none transform translate-x-2 translate-y-2 hidden sm:block" />

              {/* Main Image Container */}
              <div className="relative h-[420px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-navy-200">
                <Image
                  src={companyIntro.image}
                  alt="NeevSaathi Completed Luxury Residence in Jaipur"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  quality={85}
                />
                
                {/* Subtle Gradient Shade at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                {/* Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-gold font-medium block">
                    Featured Handover
                  </span>
                  <p className="text-sm font-serif font-semibold text-white">
                    The Courtyard Villa — Vaishali Nagar, Jaipur
                  </p>
                </div>
              </div>

              {/* Floating Navy + Gold Experience Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 bg-navy text-white p-4 sm:p-5 rounded-xl border border-gold/50 shadow-gold max-w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-gold">
                    {companyIntro.statsBadge.number}
                  </div>
                  <div className="text-xs font-medium text-white/90 leading-tight">
                    {companyIntro.statsBadge.label}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
