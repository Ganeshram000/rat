import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import CompanyIntro from '@/components/home/CompanyIntro';
import OurServices from '@/components/home/OurServices';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ConstructionProcess from '@/components/home/ConstructionProcess';
import CompanyStats from '@/components/home/CompanyStats';
import Testimonials from '@/components/home/Testimonials';
import GetQuoteCTA from '@/components/home/GetQuoteCTA';

export const metadata = {
  title: 'NeevSaathi — Premium Construction Contractor in Jaipur, Rajasthan',
  description: 'We Build Your Vision Into Reality. Turnkey residential luxury villas, commercial buildings, architectural planning, and renovations across Jaipur with certified materials and transparent BOQ estimates.',
};

export default function HomePage() {
  return (
    <>
      {/* 02 Hero Slider — Construction Projects */}
      <HeroSlider />

      {/* 03 Company Introduction */}
      <CompanyIntro />

      {/* 04 Our Services */}
      <OurServices />

      {/* 05 Featured Projects / Portfolio */}
      <FeaturedProjects />

      {/* 06 Why Choose Us? */}
      <WhyChooseUs />

      {/* 07 Construction Process */}
      <ConstructionProcess />

      {/* 08 Numbers / Company Stats */}
      <CompanyStats />

      {/* 09 Testimonials */}
      <Testimonials />

      {/* 10 Get a Quote / Contact CTA */}
      <GetQuoteCTA />
    </>
  );
}
