import React from 'react';
import Image from 'next/image';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';
import { testimonialsData } from '@/data/staticData';

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white text-navy-900 border-t border-navy-100" aria-label="Customer Testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold tracking-[0.2em] uppercase">
            <MessageSquare className="w-3.5 h-3.5 text-gold" />
            <span>AUTHENTIC CLIENT REVIEWS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-950 tracking-tight">
            Reputation Built on Concrete Trust
          </h2>

          <p className="text-base sm:text-lg text-navy-600 font-normal leading-relaxed">
            Read direct feedback from homeowners and institutional clients who chose NeevSaathi for their construction projects in Jaipur.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="relative bg-offwhite p-8 rounded-2xl border border-navy-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 Gold Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-gold/30" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-navy-700 leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author & Project Info */}
              <div className="mt-8 pt-5 border-t border-navy-200/60 flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold flex-shrink-0 bg-navy">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-serif font-bold text-navy-950">
                      {item.name}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  </div>
                  <p className="text-[11px] font-medium text-gold-dark">
                    {item.projectRef}
                  </p>
                  <p className="text-[10px] text-navy-500">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
