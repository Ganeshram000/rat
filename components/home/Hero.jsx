'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Home, ClipboardCheck, Clock, MapPin } from 'lucide-react';
import { useEstimateModal } from '@/components/common/EstimateModalContext';

export default function Hero() {
  const { openModal } = useEstimateModal();

  const trustItems = [
    {
      icon: Home,
      title: 'Quality Workmanship',
    },
    {
      icon: ClipboardCheck,
      title: 'Transparent Estimates',
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
    },
    {
      icon: MapPin,
      title: 'Jaipur & Nearby Areas',
    },
  ];

  return (
    <section className="relative pt-4 pb-6 lg:pt-7 lg:pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge text-sand text-[11px] font-sans font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-sand animate-pulse" />
              <span>Construction Partner in Jaipur</span>
            </div>

            {/* Main Lora Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-bold text-white leading-[1.12] tracking-tight drop-shadow-md">
              Building Your <br className="hidden sm:block" />
              Vision Into Reality.
            </h1>

            {/* Supporting Text */}
            <p className="text-beige-100/90 text-sm sm:text-base font-sans font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-sm">
              Trusted construction services in Jaipur and nearby areas with quality, transparency and modern design.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              {/* Primary CTA */}
              <button
                onClick={() => openModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta hover:bg-terracotta-hover text-white font-sans font-medium text-xs sm:text-sm rounded-xl shadow-terracotta transition-all duration-200 group cursor-pointer hover:scale-102"
              >
                <span>Get Free Estimate</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>

              {/* Secondary Glass CTA */}
              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 py-3 glass-button text-white font-sans font-medium text-xs sm:text-sm rounded-xl transition-all duration-200 hover:scale-102"
              >
                <span>View Our Projects</span>
                <span className="w-5 h-5 rounded-full bg-white text-brown-dark flex items-center justify-center shadow-sm">
                  <Play className="w-2.5 h-2.5 fill-brown-dark translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Glass Featured Project Card + 4 Trust Badges (5 cols) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3.5 sm:gap-4">
            
            {/* Glass Featured Project Preview Card */}
            <div className="glass-panel rounded-3xl p-3 max-w-[290px] sm:max-w-[300px] w-full flex flex-col justify-between group transition-all duration-200 hover:border-white/45">
              {/* Architectural Image Container */}
              <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden bg-brown-dark/30 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Home Construction in Jagatpura, Jaipur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Card Bottom Floating Tag */}
              <Link
                href="/projects"
                className="mt-2.5 p-2.5 rounded-2xl bg-white/95 text-brown-dark flex items-center justify-between shadow-soft hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-beige-200 text-terracotta flex items-center justify-center flex-shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs text-brown-dark leading-tight line-clamp-1">
                      Modern Home Construction
                    </h4>
                    <p className="text-[10px] font-sans text-brown-medium">
                      Jagatpura, Jaipur
                    </p>
                  </div>
                </div>

                <div className="w-6 h-6 rounded-full bg-terracotta text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </div>

            {/* 4 Trust Highlights Stacked beside the Card (matching reference image) */}
            <div className="flex sm:flex-col justify-between sm:justify-center gap-2 w-full sm:w-auto">
              {trustItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="glass-badge rounded-xl px-3 py-2 flex items-center gap-2 text-white hover:bg-white/25 transition-colors whitespace-nowrap"
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-sand flex-shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-sans font-medium">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
