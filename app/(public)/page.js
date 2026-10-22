import React from 'react';
import Hero from '@/components/home/Hero';
import TrustHighlights from '@/components/home/TrustHighlights';
import ServicesPreview from '@/components/home/ServicesPreview';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ProcessSection from '@/components/home/ProcessSection';
import EstimateCTA from '@/components/home/EstimateCTA';
import Testimonials from '@/components/home/Testimonials';
import ServiceAreaMap from '@/components/home/ServiceAreaMap';
import { getServices, getProjects, getSettings } from '@/lib/db';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: 'NeevSaathi — Trusted Construction Contractor in Jaipur, Rajasthan',
  description: 'Building Your Vision, From Foundation to Finish. Premium residential villa construction, commercial spaces, turnkey contracts, and renovations in Jaipur and nearby Rajasthan.',
};

export default async function HomePage() {
  const allServices = getServices() || [];
  const allProjects = getProjects() || [];
  const settings = getSettings() || {};

  const publishedServices = allServices.filter(s => s.published);
  const featuredProjects = allProjects.filter(p => p.published);

  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Highlights Banner */}
      <TrustHighlights />

      {/* 3. Our Services Preview */}
      <ServicesPreview services={publishedServices} />

      {/* 4. Featured Projects Showcase */}
      <FeaturedProjects projects={featuredProjects} />

      {/* 5. Why Choose NeevSaathi */}
      <WhyChooseUs />

      {/* 6. Four-Step Construction Process */}
      <ProcessSection />

      {/* 7. Estimate Enquiry CTA Banner */}
      <EstimateCTA />

      {/* 8. Verified Homeowner & Client Testimonials */}
      <Testimonials />

      {/* 9. Jaipur Service Area & Map Section */}
      <ServiceAreaMap settings={settings} />
    </>
  );
}
