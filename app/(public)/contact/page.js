import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, Clock } from 'lucide-react';
import { getSettings } from '@/lib/db';
import { JAIPUR_AREAS } from '@/lib/constants';
import EstimateForm from '@/components/enquiry/EstimateForm';

export const metadata = {
  title: 'Contact NeevSaathi — Construction Site Office in Jaipur',
  description: 'Connect with NeevSaathi for construction estimates, site visits, and architectural civil engineering in Jaipur. Phone: +91 98290 12345, Tonk Road, Jaipur.',
};

export default function ContactPage() {
  const settings = getSettings();

  const phone = settings.phone || '+91 98290 12345';
  const whatsapp = settings.whatsapp || '+91 98290 12345';
  const email = settings.email || 'contact@neevsaathi.com';
  const address = settings.address || 'Plot No. 42, Main Tonk Road, Near Gopalpura Flyover, Jaipur, Rajasthan 302015';
  const mapUrl = settings.googleMapsEmbed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113886.72147449232!2d75.7205178652433!3d26.88514167905151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin';

  return (
    <div className="py-8 sm:py-12 lg:py-16 space-y-10 sm:space-y-14">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-semibold uppercase tracking-wider mb-3">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Contact Our Jaipur Construction Office
            </h1>
            <p className="text-beige-200/90 font-sans text-sm sm:text-base mt-3 leading-relaxed">
              Have a plot to build on or need structural remodeling? Speak directly with our site engineers, schedule an on-site inspection, or request an itemized estimate.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details & Jaipur Coverage (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Information Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-card space-y-5 text-white">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white border-b border-white/10 pb-3">
                Official Site Channels
              </h2>

              <div className="space-y-4 text-xs sm:text-sm font-sans">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/15 text-sand flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white font-medium mb-0.5">Calling Helpline:</strong>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-sand font-semibold hover:text-white transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <strong className="block text-white font-medium mb-0.5">WhatsApp Consultation:</strong>
                    <a
                      href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20NeevSaathi%2C%20I%20am%20interested%20in%20a%20construction%20project%20in%20Jaipur`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sand font-semibold hover:text-white transition-colors"
                    >
                      {whatsapp} (Quick response)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/15 text-sand flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white font-medium mb-0.5">Official Inquiries:</strong>
                    <a href={`mailto:${email}`} className="text-sand hover:text-white transition-colors">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/15 text-sand flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white font-medium mb-0.5">Jaipur Office:</strong>
                    <span className="text-beige-200/80 leading-relaxed">{address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Coverage Localities */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/20 shadow-card text-white">
              <h3 className="font-serif font-bold text-sm sm:text-base text-white mb-2">
                Active Construction Zones
              </h3>
              <p className="text-xs text-beige-200/80 font-sans mb-3.5 leading-relaxed">
                Our site crews and engineering teams operate daily across:
              </p>
              <div className="flex flex-wrap gap-2">
                {JAIPUR_AREAS.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl glass-badge text-[11px] font-sans text-beige-100"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Multi-field Estimate & Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <EstimateForm
              title="Send a Project Inquiry or Message"
              subtitle="Fill in your project details below and our team will get in touch with you shortly to discuss your construction project."
            />
          </div>

        </div>

        {/* Google Maps Location Section */}
        <div className="mt-12 glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-card text-white">
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif font-bold text-white text-lg">
                Visit Our Site Center
              </h3>
              <p className="text-xs font-sans text-beige-200/80">
                Tonk Road, Jaipur • Prior appointment recommended for senior engineer consultation
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Jaipur,Rajasthan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-sand hover:text-white"
            >
              <span>Open in Google Maps App</span>
              &rarr;
            </a>
          </div>

          <div className="h-96 w-full">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NeevSaathi Construction Location Map"
              className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
