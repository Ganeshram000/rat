import React from 'react';
import { Star, Quote, MapPin, CheckCircle } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Vivek Rathore',
      role: 'Homeowner, The Grand Courtyard Villa',
      location: 'Vaishali Nagar, Jaipur',
      feedback: 'The biggest relief with NeevSaathi was transparency. In Rajasthan, contractors often alter rates mid-way. NeevSaathi gave us an itemized BOQ before digging the first footing. Every truck of Fe550D TMT steel and UltraTech cement was accompanied by a test invoice. Completed our 4,200 sq.ft villa right on time.',
      rating: 5,
      date: 'Completed Jan 2025'
    },
    {
      id: 2,
      name: 'Suresh Goyal',
      role: 'Commercial Property Developer',
      location: 'Mansarovar, Jaipur',
      feedback: 'We contracted NeevSaathi for the RCC frame and glass facade of our 4-storey commercial plaza. Their engineers strictly adhere to JDA setback norms and structural safety codes. Their daily photographic logs on WhatsApp saved me hours of on-site visits.',
      rating: 5,
      date: 'Completed Nov 2024'
    },
    {
      id: 3,
      name: 'Pooja & Ankit Saxena',
      role: 'Home Remodeling & Elevation',
      location: 'Malviya Nagar, Jaipur',
      feedback: 'Renovating our 25-year-old family house was daunting due to dampness and old structural walls. NeevSaathi reinforced the columns, converted the ground floor into an open plan layout, and redid the exterior elevation with stone cladding. Truly professional execution.',
      rating: 5,
      date: 'Completed Mar 2024'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-semibold uppercase tracking-wider mb-2.5">
            Real Client Experiences
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Client Words on Our Craftsmanship
          </h2>
          <p className="text-beige-200/80 text-xs sm:text-sm font-sans mt-2.5 leading-relaxed">
            Direct feedback from homeowners and developers across Jaipur who trusted NeevSaathi with their construction projects.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="glass-panel p-6 sm:p-7 rounded-3xl transition-all duration-200 hover:border-white/40 hover:-translate-y-1 shadow-card flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sand">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-sand" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/20" />
                </div>

                <p className="text-xs sm:text-sm text-beige-100/90 font-sans leading-relaxed italic mb-6">
                  &ldquo;{t.feedback}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">
                    {t.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] font-sans text-sand mt-0.5">
                    <MapPin className="w-3 h-3 text-sand" />
                    <span>{t.location}</span>
                  </div>
                </div>

                <span className="text-[10px] font-sans text-beige-200/60 font-medium">
                  {t.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
