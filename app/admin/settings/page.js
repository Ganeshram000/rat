'use client';

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Loader2, 
  Building2, 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Globe, 
  Share2, 
  Search,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/components/admin/Toast';

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    legalName: '',
    tagline: '',
    shortDescription: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    googleMapsEmbed: '',
    serviceAreasText: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: '',
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
    },
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings) {
        const s = data.settings;
        setFormData({
          businessName: s.businessName || '',
          legalName: s.legalName || '',
          tagline: s.tagline || '',
          shortDescription: s.shortDescription || '',
          phone: s.phone || '',
          whatsapp: s.whatsapp || '',
          email: s.email || '',
          address: s.address || '',
          city: s.city || '',
          state: s.state || '',
          postalCode: s.postalCode || '',
          country: s.country || '',
          googleMapsEmbed: s.googleMapsEmbed || '',
          serviceAreasText: (s.serviceAreas || []).join('\n'),
          socialLinks: {
            facebook: s.socialLinks?.facebook || '',
            instagram: s.socialLinks?.instagram || '',
            linkedin: s.socialLinks?.linkedin || '',
            youtube: s.socialLinks?.youtube || '',
          },
          seo: {
            metaTitle: s.seo?.metaTitle || '',
            metaDescription: s.seo?.metaDescription || '',
            keywords: s.seo?.keywords || '',
          },
        });
      }
    } catch (err) {
      showToast('Failed to load settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        businessName: formData.businessName,
        legalName: formData.legalName,
        tagline: formData.tagline,
        shortDescription: formData.shortDescription,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        googleMapsEmbed: formData.googleMapsEmbed,
        serviceAreas: formData.serviceAreasText.split('\n').map(s => s.trim()).filter(Boolean),
        socialLinks: formData.socialLinks,
        seo: formData.seo,
      };

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');

      showToast('Website settings updated successfully', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center text-brown-medium gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-terracotta" />
        <span className="text-xs">Loading website settings...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 font-sans pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brown-dark">
            Website & Business Settings
          </h1>
          <p className="text-xs sm:text-sm text-brown-medium mt-0.5">
            Configure contact phone numbers, WhatsApp shortcut, office address, Google Map embed, and SEO metadata.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs sm:text-sm font-semibold shadow-terracotta transition-colors duration-200 disabled:opacity-70 self-start sm:self-auto"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving Settings...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Section 1: Business Identity & Contact */}
      <div className="bg-white rounded-2xl border border-beige-300 shadow-soft p-6 space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-beige-200">
          <Building2 className="w-5 h-5 text-terracotta" />
          <h2 className="font-serif font-bold text-base sm:text-lg text-brown-dark">
            Business Details & Direct Contacts
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Brand / Display Name
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Registered Legal Name
            </label>
            <input
              type="text"
              value={formData.legalName}
              onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Calling Phone Number (with Country Code)
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98290 12345"
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
              />
              <Phone className="w-3.5 h-3.5 text-brown-medium absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              WhatsApp Contact Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+91 98290 12345"
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
              />
              <MessageSquare className="w-3.5 h-3.5 text-terracotta absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Official Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@neevsaathi.com"
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
              />
              <Mail className="w-3.5 h-3.5 text-brown-medium absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Brand Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Short Company Bio (Footer & Meta)
            </label>
            <textarea
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full p-2.5 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Physical Office & Map Integration */}
      <div className="bg-white rounded-2xl border border-beige-300 shadow-soft p-6 space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-beige-200">
          <MapPin className="w-5 h-5 text-terracotta" />
          <h2 className="font-serif font-bold text-base sm:text-lg text-brown-dark">
            Physical Office & Google Maps Embed
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Complete Office Address in Jaipur
            </label>
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Google Maps Embed URL (Iframe src URL)
            </label>
            <input
              type="url"
              value={formData.googleMapsEmbed}
              onChange={(e) => setFormData({ ...formData, googleMapsEmbed: e.target.value })}
              placeholder="https://www.google.com/maps/embed?..."
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
            <p className="text-[11px] text-brown-medium mt-1">
              In Google Maps, click Share &gt; Embed a map, and paste only the URL inside the src=&quot;...&quot; attribute.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Jaipur Service Areas */}
      <div className="bg-white rounded-2xl border border-beige-300 shadow-soft p-6 space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-beige-200">
          <Globe className="w-5 h-5 text-terracotta" />
          <h2 className="font-serif font-bold text-base sm:text-lg text-brown-dark">
            Jaipur Localities & Service Coverage
          </h2>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brown-dark mb-1">
            Service Areas List (One area per line)
          </label>
          <textarea
            rows={6}
            value={formData.serviceAreasText}
            onChange={(e) => setFormData({ ...formData, serviceAreasText: e.target.value })}
            placeholder="Vaishali Nagar, Jaipur&#10;Mansarovar, Jaipur&#10;Malviya Nagar & Jagatpura"
            className="w-full p-2.5 text-xs font-mono rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
          />
          <p className="text-[11px] text-brown-medium mt-1">
            These areas are featured on the home page service area map, contact page, and estimate enquiry form.
          </p>
        </div>
      </div>

      {/* Section 4: Social Media Links */}
      <div className="bg-white rounded-2xl border border-beige-300 shadow-soft p-6 space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-beige-200">
          <Share2 className="w-5 h-5 text-terracotta" />
          <h2 className="font-serif font-bold text-base sm:text-lg text-brown-dark">
            Social Media Profiles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Instagram Profile URL
            </label>
            <input
              type="url"
              value={formData.socialLinks.instagram}
              onChange={(e) => setFormData({
                ...formData,
                socialLinks: { ...formData.socialLinks, instagram: e.target.value }
              })}
              placeholder="https://instagram.com/neevsaathi.constructions"
              className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Facebook Page URL
            </label>
            <input
              type="url"
              value={formData.socialLinks.facebook}
              onChange={(e) => setFormData({
                ...formData,
                socialLinks: { ...formData.socialLinks, facebook: e.target.value }
              })}
              placeholder="https://facebook.com/neevsaathi"
              className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              LinkedIn Company Page
            </label>
            <input
              type="url"
              value={formData.socialLinks.linkedin}
              onChange={(e) => setFormData({
                ...formData,
                socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
              })}
              placeholder="https://linkedin.com/company/neevsaathi"
              className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              YouTube Channel URL
            </label>
            <input
              type="url"
              value={formData.socialLinks.youtube}
              onChange={(e) => setFormData({
                ...formData,
                socialLinks: { ...formData.socialLinks, youtube: e.target.value }
              })}
              placeholder="https://youtube.com/@neevsaathi"
              className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>
        </div>
      </div>

      {/* Section 5: SEO Meta Tags */}
      <div className="bg-white rounded-2xl border border-beige-300 shadow-soft p-6 space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-beige-200">
          <Search className="w-5 h-5 text-terracotta" />
          <h2 className="font-serif font-bold text-base sm:text-lg text-brown-dark">
            SEO & Search Engine Optimization
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Default Meta Title
            </label>
            <input
              type="text"
              value={formData.seo.metaTitle}
              onChange={(e) => setFormData({
                ...formData,
                seo: { ...formData.seo, metaTitle: e.target.value }
              })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Meta Description
            </label>
            <textarea
              rows={2}
              value={formData.seo.metaDescription}
              onChange={(e) => setFormData({
                ...formData,
                seo: { ...formData.seo, metaDescription: e.target.value }
              })}
              className="w-full p-2.5 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brown-dark mb-1">
              Keywords (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.seo.keywords}
              onChange={(e) => setFormData({
                ...formData,
                seo: { ...formData.seo, keywords: e.target.value }
              })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-beige-300 focus:outline-none focus:ring-1 focus:ring-terracotta text-brown-dark"
            />
          </div>
        </div>
      </div>

      {/* Floating Save Actions Bar at bottom */}
      <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-beige-300 shadow-card p-4 flex items-center justify-between">
        <span className="text-xs text-brown-medium font-medium">
          Make sure to click &quot;Save Settings&quot; to apply changes to the live site.
        </span>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs sm:text-sm font-semibold shadow-terracotta transition-colors duration-200 disabled:opacity-70"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>
    </form>
  );
}

