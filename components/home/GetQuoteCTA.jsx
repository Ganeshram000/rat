'use client';

import React, { useState } from 'react';
import { Send, Phone, MessageSquare, MapPin, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { companyConfig, serviceLocalities, servicesData } from '@/data/staticData';

export default function GetQuoteCTA() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Residential Construction',
    location: 'Vaishali Nagar',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate instant local submission without requiring external backend
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello NeevSaathi! I am inquiring about *${formData.service}* in *${formData.location}*. My name is ${formData.name || 'a homeowner'}. Please share a preliminary estimate.`
  );

  return (
    <section id="quote" className="py-20 lg:py-28 bg-navy text-white relative overflow-hidden" aria-label="Get a Construction Quote">
      {/* Subtle Geometric Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#C9A45C 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context & Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TRANSPARENT BOQ ESTIMATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gold tracking-tight leading-tight">
              Get an Itemized Estimate for Your Project
            </h2>

            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              Tell us about your plot or property in Jaipur. Our senior civil engineers will review your requirements and provide an itemized preliminary cost schedule within 24 hours.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <a
                href={`tel:${companyConfig.phoneClean}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-navy-800/80 border border-white/10 hover:border-gold/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/20 text-gold flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:text-navy-950 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-white/60 uppercase font-medium block">Direct Phone Consultation</span>
                  <span className="text-base font-semibold text-white tracking-wide">{companyConfig.phone}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${companyConfig.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-navy-800/80 border border-white/10 hover:border-gold/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-navy-950 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-white/60 uppercase font-medium block">Instant WhatsApp Inquiry</span>
                  <span className="text-base font-semibold text-white tracking-wide">Chat Directly with Engineers</span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-800/80 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-gold/20 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-white/60 uppercase font-medium block">Jaipur Office</span>
                  <p className="text-xs text-white/80 leading-relaxed">{companyConfig.address}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gold font-medium pt-2">
              <Clock className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Average response time: 2 business hours</span>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-navy-900/90 rounded-2xl p-6 sm:p-8 md:p-10 border border-gold/40 shadow-2xl relative">
              
              {submitted ? (
                <div className="text-center py-10 space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto border-2 border-gold shadow-gold">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-white">
                    Thank You, {formData.name || 'Friend'}!
                  </h3>

                  <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                    Your enquiry for <strong className="text-gold">{formData.service}</strong> in <strong className="text-gold">{formData.location}</strong> has been received. Our chief engineer will call you shortly on <strong className="text-white">{formData.phone}</strong>.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/${companyConfig.whatsapp}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-semibold text-navy-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
                    >
                      Continue on WhatsApp
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-navy-800 hover:bg-navy-700 border border-white/20 transition-colors"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-white/10 pb-4 mb-2">
                    <h3 className="text-xl font-serif font-bold text-white">
                      Request Your Project Estimate
                    </h3>
                    <p className="text-xs text-white/60">
                      Fill out the details below. All inquiries are strictly confidential.
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Chandra"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98290 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">
                        Service Required *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white text-sm focus:outline-none focus:border-gold transition-colors"
                      >
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.title} className="bg-navy-900 text-white">
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">
                        Project Location in Jaipur *
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white text-sm focus:outline-none focus:border-gold transition-colors"
                      >
                        {serviceLocalities.map((loc) => (
                          <option key={loc} value={loc} className="bg-navy-900 text-white">
                            {loc}
                          </option>
                        ))}
                        <option value="Other Area in Rajasthan" className="bg-navy-900 text-white">
                          Other Area in Rajasthan
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Project Details */}
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">
                      Message / Project Details (Plot size, floors, timeline)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="e.g., Plot size is 250 sq.yards in Jagatpura. Planning a G+2 modern villa with 4 bedrooms. Need turnkey civil work and estimate."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold text-navy-950 bg-gold hover:bg-gold-hover active:scale-[0.99] transition-all duration-200 shadow-gold group cursor-pointer disabled:opacity-75"
                  >
                    {loading ? (
                      <span>Sending your request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        <span>Submit Project Enquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-white/50 text-center">
                    🔒 Zero spam guarantee. We will never share your contact details.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
