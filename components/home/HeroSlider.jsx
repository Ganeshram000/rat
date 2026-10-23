'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Building2, HardHat, Sparkles } from 'lucide-react';
import { heroSlides } from '@/data/staticData';
import { useEstimateModal } from '@/components/common/EstimateModalContext';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openModal } = useEstimateModal();
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const totalSlides = heroSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay (5.5s)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section 
      className="relative w-full min-h-[620px] lg:min-h-[720px] bg-navy-950 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Construction Projects Slider"
    >
      {/* Slides Background Images & Overlays */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Architectural Building Image (Priority for First Slide) */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={`${slide.headline} - NeevSaathi Jaipur Construction`}
                fill
                priority={index === 0}
                className={`object-cover object-center transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                sizes="100vw"
                quality={85}
              />
            </div>

            {/* Dark Navy #142B4A Overlay with Architectural Gradient Depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-950/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />

            {/* Subtle Gold Geometric Grid Line Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#C9A45C 1px, transparent 1px)`,
                backgroundSize: '32px 32px'
              }}
            />
          </div>
        );
      })}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[620px] lg:min-h-[720px] flex items-center py-16 lg:py-24">
        <div className="max-w-3xl">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            if (!isActive) return null;

            return (
              <div key={slide.id} className="animate-fade-in space-y-6 text-left">
                {/* Gold Category / Tagline Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy-800/90 border border-gold/40 text-gold text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-sm shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span>{slide.tag}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/80 font-normal tracking-normal">{slide.featuredBadge}</span>
                </div>

                {/* Main Heading in Playfair Display / Lora */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12]">
                  {slide.headline}
                </h1>

                {/* Supporting Text in Poppins */}
                <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-2xl font-light leading-relaxed">
                  {slide.subtext}
                </p>

                {/* Key Slide Trust Metrics */}
                <div className="pt-2 flex flex-wrap items-center gap-5 text-xs sm:text-sm text-white/75">
                  <div className="flex items-center gap-2 bg-navy-900/60 px-3 py-1.5 rounded-md border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{slide.stats.completed}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-navy-900/60 px-3 py-1.5 rounded-md border border-white/10">
                    <Building2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{slide.stats.timeline}</span>
                  </div>
                </div>

                {/* CTAs: "Explore Our Projects" & "Get a Quote" */}
                <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-5">
                  {/* Primary Button: Explore Our Projects */}
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg text-sm sm:text-base font-semibold text-navy-950 bg-gold hover:bg-gold-hover active:scale-[0.98] transition-all duration-200 shadow-gold group"
                  >
                    <span>Explore Our Projects</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* Secondary Button: Get a Quote */}
                  <button
                    onClick={() => openModal()}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg text-sm sm:text-base font-semibold text-white bg-navy-800/80 hover:bg-navy-800 hover:text-gold border border-gold/50 active:scale-[0.98] transition-all duration-200 backdrop-blur-sm"
                  >
                    <span>Get a Quote</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slider Controls Bottom Bar (Inspired by sample: Dots ● ○ ○ and Slide Navigation) */}
      <div className="absolute bottom-6 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Dot Indicators ● ○ ○ */}
          <div className="flex items-center gap-3 bg-navy-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {heroSlides.map((slide, idx) => {
              const active = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    active 
                      ? 'w-7 h-2.5 bg-gold' 
                      : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
                />
              );
            })}
            <span className="text-[11px] font-mono text-gold/80 ml-2 font-medium">
              0{currentSlide + 1} / 0{totalSlides}
            </span>
          </div>

          {/* Previous / Next Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-navy-900/80 border border-gold/40 hover:border-gold hover:bg-navy-800 text-white flex items-center justify-center transition-all duration-200"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 text-gold" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-navy-900/80 border border-gold/40 hover:border-gold hover:bg-navy-800 text-white flex items-center justify-center transition-all duration-200"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
