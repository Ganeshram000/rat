import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { JAIPUR_AREAS } from '@/lib/constants';

export default function ServiceAreaMap({ settings }) {
  const address = settings?.address || 'Plot No. 42, Main Tonk Road, Near Gopalpura Flyover, Jaipur, Rajasthan 302015';
  const phone = settings?.phone || '+91 98290 12345';
  const mapUrl = settings?.googleMapsEmbed || 'https://www.gooegle.com/maps/embed?pb=!1m18!1m12!1m3!1d113886.72147449232!2d75.7205178652433!3d26.88514167905151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin';

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-semibold uppercase tracking-wider mb-2.5">
            Local Construction Presence
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Serving Jaipur & Nearby Rajasthan Regions
          </h2>
          <p className="text-beige-200/80 text-xs sm:text-sm font-sans mt-2.5 leading-relaxed">
            Our site engineers, equipment, and material networks are actively deployed across Jaipur’s major residential colonies, developing corridors, and industrial belts.
          </p>
        </div>

        {/* Map & Office Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Office Info & Area List (5 cols) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-card text-white">
            <div>
              <h3 className="text-lg font-serif font-bold text-white mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-sand" />
                <span>Jaipur Head Office & Site Center</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm font-sans text-beige-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sand flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold mb-0.5">Physical Address:</strong>
                    <span className="text-beige-200/80 leading-relaxed">{address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-sand flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold mb-0.5">Direct Helpline / WhatsApp:</strong>
                    <a href="tel:+919829012345" className="text-sand font-semibold hover:text-white transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-sand flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold mb-0.5">Working Hours:</strong>
                    <span className="text-beige-200/80">Mon – Sat: 9:00 AM – 7:30 PM (Site visits by appointment)</span>
                  </div>
                </div>
              </div>

              {/* Localities Tags */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <span className="block text-xs font-semibold text-sand uppercase tracking-wider mb-3">
                  Key Active Jaipur Localities:
                </span>
                <div className="flex flex-wrap gap-2">
                  {JAIPUR_AREAS.slice(0, 8).map((area, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl glass-badge text-[11px] font-sans text-beige-100"
                    >
                      {area.split(',')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href={`https://wa.me/919829012345?text=Hello%20NeevSaathi%2C%20I%20would%20like%20to%20schedule%20a%20site%20visit.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs font-semibold shadow-terracotta transition-colors duration-200"
              >
                <span>Schedule a Free Site Visit</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-2 sm:p-2.5 overflow-hidden shadow-card flex flex-col">
            <div className="w-full h-80 sm:h-96 lg:h-full min-h-[380px] rounded-2xl overflow-hidden bg-brown-dark/40">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NeevSaathi Jaipur Office Location"
                className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
