import React from 'react';
import HeroSection from '../components/store/HeroSection';
import FeaturedProducts from '../components/store/FeaturedProducts';
import CollectionBanner from '../components/store/CollectionBanner';
import NewsletterFooter from '../components/store/NewsletterFooter';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <CollectionBanner />
      <NewsletterFooter />
    </div>
  );
}