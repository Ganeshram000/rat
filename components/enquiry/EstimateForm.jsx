'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  Maximize2,
  FileCheck
} from 'lucide-react';
import { WORK_TYPES, BUDGET_RANGES, TIMELINES, JAIPUR_AREAS, validateIndianPhone } from '@/lib/constants';

export default function EstimateForm({ 
  initialWorkType = '', 
  onSuccess, 
  isCompact = false,
  title = "Request a Free Construction Estimate",
  subtitle = "Tell us about your plot or project in Jaipur. Our civil engineers will conduct a requirement analysis and provide a transparent, itemized estimate."
}) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    location: '',
    customLocation: '',
    workType: initialWorkType || 'New Construction',
    plotArea: '',
    budget: '',
    startDate: '',
    requirements: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your full name';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!validateIndianPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9829012345)';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const effectiveLocation = formData.location === 'Other Area in Jaipur / Rajasthan' 
      ? formData.customLocation 
      : formData.location;
    if (!effectiveLocation || !effectiveLocation.trim()) {
      newErrors.location = 'Please select or specify your project location';
    }

    if (!formData.workType) {
      newErrors.workType = 'Please select the type of work';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError('');

    try {
      const payload = {
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        location: formData.location === 'Other Area in Jaipur / Rajasthan' && formData.customLocation 
          ? formData.customLocation.trim() 
          : (formData.location || 'Jaipur'),
        workType: formData.workType,
        plotArea: formData.plotArea.trim() || undefined,
        budget: formData.budget || undefined,
        startDate: formData.startDate || undefined,
        requirements: formData.requirements.trim() || undefined,
      };

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit estimate request. Please try again.');
      }

      setSubmitted(true);
      setSubmittedData(data.enquiry);
      if (onSuccess) onSuccess(data.enquiry);
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      location: '',
      customLocation: '',
      workType: initialWorkType || 'New Construction',
      plotArea: '',
      budget: '',
      startDate: '',
      requirements: ''
    });
    setSubmitted(false);
    setSubmittedData(null);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-sand/50 shadow-soft text-center animate-fade-in">
        <div className="w-16 h-16 bg-beige-200 text-terracotta rounded-full flex items-center justify-center mx-auto mb-4 border border-sand/40">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl font-serif font-bold text-brown-dark mb-2">
          Enquiry Received Successfully!
        </h3>
        <p className="text-brown-medium font-sans max-w-md mx-auto mb-6 text-xs sm:text-sm leading-relaxed">
          Thank you, <strong className="text-brown-dark">{submittedData?.customerName}</strong>. 
          Our lead civil engineer for <strong className="text-brown-dark">{submittedData?.location}</strong> will review your specifications and connect with you on <strong className="text-brown-dark">{submittedData?.phone}</strong> within 24 working hours.
        </p>

        <div className="bg-beige-100 rounded-xl p-4 text-left max-w-md mx-auto text-xs font-sans text-brown-dark mb-6 space-y-1.5 border border-beige-300">
          <div className="flex justify-between">
            <span className="text-brown-medium">Enquiry Reference:</span>
            <span className="font-mono font-semibold text-terracotta">{submittedData?.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brown-medium">Service Requested:</span>
            <span className="font-medium text-brown-dark">{submittedData?.workType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brown-medium">Location:</span>
            <span className="font-medium text-brown-dark">{submittedData?.location}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/919829012345?text=${encodeURIComponent(`Hello NeevSaathi, I just submitted estimate request #${submittedData?.id} for ${submittedData?.workType} at ${submittedData?.location}. Let's discuss!`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-terracotta hover:bg-terracotta-hover text-white text-xs sm:text-sm font-sans font-semibold rounded-xl shadow-terracotta transition-all duration-200"
          >
            Chat with Engineer on WhatsApp
          </a>
          <button
            type="button"
            onClick={resetForm}
            className="w-full sm:w-auto px-5 py-2.5 border border-beige-300 text-brown-dark hover:bg-beige-100 text-xs sm:text-sm font-sans font-medium rounded-xl transition-colors duration-200"
          >
            Submit Another Request
          </button>
        </div>

        <p className="text-[11px] text-brown-medium font-sans mt-5">
          * NeevSaathi provides verified on-site structural estimates. We do not provide computer-generated approximate gimmicks.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl ${isCompact ? 'p-5 sm:p-6' : 'p-6 sm:p-8 lg:p-9'} border border-beige-300 shadow-soft`}>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige-200 text-terracotta text-xs font-sans font-semibold mb-2.5 border border-beige-300">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Zero Obligation • Accurate BOQ Breakdown</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-brown-dark">
          {title}
        </h3>
        {subtitle && (
          <p className="text-brown-medium font-sans text-xs sm:text-sm mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {apiError && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm font-sans flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-sans font-semibold text-brown-dark mb-1.5">
              Full Name <span className="text-terracotta">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown-medium/70">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="e.g. Rajesh Meena"
                className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border ${
                  errors.customerName ? 'border-red-400 bg-red-50/20' : 'border-beige-300 focus:border-terracotta'
                } focus:outline-none focus:ring-1 focus:ring-terracotta transition-colors duration-200`}
              />
            </div>
            {errors.customerName && <p className="text-red-600 font-sans text-xs mt-1">{errors.customerName}</p>}
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold text-brown-dark mb-1.5">
              Mobile Number (WhatsApp) <span className="text-terracotta">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown-medium font-sans font-medium text-xs">
                +91
              </div>
              <input
                type="tel"
                name="phone"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                placeholder="98290 12345"
                className={`w-full pl-12 pr-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border ${
                  errors.phone ? 'border-red-400 bg-red-50/20' : 'border-beige-300 focus:border-terracotta'
                } focus:outline-none focus:ring-1 focus:ring-terracotta transition-colors duration-200`}
              />
            </div>
            {errors.phone && <p className="text-red-600 font-sans text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Row 2: Email and Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-sans font-semibold text-brown-dark mb-1.5">
              Email Address <span className="text-brown-medium/70 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown-medium/70">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rajesh@example.com"
                className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border ${
                  errors.email ? 'border-red-400' : 'border-beige-300 focus:border-terracotta'
                } focus:outline-none focus:ring-1 focus:ring-terracotta transition-colors duration-200`}
              />
            </div>
            {errors.email && <p className="text-red-600 font-sans text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold text-brown-dark mb-1.5">
              Project Location in Jaipur <span className="text-terracotta">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown-medium/70">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border ${
                  errors.location ? 'border-red-400 bg-red-50/20' : 'border-beige-300 focus:border-terracotta'
                } bg-white focus:outline-none focus:ring-1 focus:ring-terracotta transition-colors duration-200 text-brown-dark`}
              >
                <option value="">Select Colony / Locality</option>
                {JAIPUR_AREAS.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
            {errors.location && <p className="text-red-600 font-sans text-xs mt-1">{errors.location}</p>}
          </div>
        </div>

        {/* If 'Other Area' is chosen */}
        {formData.location === 'Other Area in Jaipur / Rajasthan' && (
          <div className="animate-fade-in">
            <label className="block text-xs font-sans font-semibold text-brown-dark mb-1.5">
              Specify Colony, Road, or Town <span className="text-terracotta">*</span>
            </label>
            <input
              type="text"
              name="customLocation"
              value={formData.customLocation}
              onChange={handleChange}
              placeholder="e.g. Khatipura, Jagatpura Extension, or Dausa"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border border-beige-300 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
            />
          </div>
        )}

        {/* Row 3: Work Type and Plot Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-sans font-semibold text-brown-dark mb-1.5">
              Type of Construction Work <span className="text-terracotta">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown-medium/70">
                <Building2 className="w-4 h-4" />
              </div>
              <select
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border border-beige-300 bg-white focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
              >
                {WORK_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold text-brown-dark mb-1.5">
              Plot Size or Built-up Area <span className="text-brown-medium/70 font-normal">(e.g. 200 sq yd / 2500 sq ft)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown-medium/70">
                <Maximize2 className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="plotArea"
                value={formData.plotArea}
                onChange={handleChange}
                placeholder="e.g. 30x60 (200 Gaj) or 3,000 sq ft"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border border-beige-300 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
              />
            </div>
          </div>
        </div>

        {/* Row 4: Budget Range & Expected Start Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-sans font-semibold text-brown-dark mb-1.5">
              Approximate Budget <span className="text-brown-medium/70 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown-medium/70">
                <IndianRupee className="w-4 h-4" />
              </div>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border border-beige-300 bg-white focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
              >
                <option value="">Select Budget Preference</option>
                {BUDGET_RANGES.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold text-brown-dark mb-1.5">
              Expected Start Date <span className="text-brown-medium/70 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown-medium/70">
                <Calendar className="w-4 h-4" />
              </div>
              <select
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border border-beige-300 bg-white focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
              >
                <option value="">When do you plan to begin?</option>
                {TIMELINES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Additional Requirements */}
        <div>
          <label className="block text-xs font-sans font-semibold text-brown-dark mb-1.5">
            Brief Project Details or Specific Requirements
          </label>
          <textarea
            name="requirements"
            rows={3}
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Tell us about number of floors (e.g. G+1 or G+2), architectural preferences, whether foundation is already cast, or any special requirements..."
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border border-beige-300 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta placeholder:text-brown-medium/50"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-terracotta hover:bg-terracotta-hover active:bg-terracotta-700 text-white font-sans font-semibold text-sm rounded-xl shadow-terracotta transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Your Estimate Request...</span>
              </>
            ) : (
              <>
                <span>Submit Request for Free Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <div className="pt-1 text-center text-[11px] text-brown-medium font-sans flex items-center justify-center gap-2">
          <span>🔒 Privacy guaranteed. Your contact details are kept strictly confidential.</span>
        </div>
      </form>
    </div>
  );
}
