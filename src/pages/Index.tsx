
import React from 'react';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import SolutionOverview from '../components/SolutionOverview';
import FeaturesSection from '../components/FeaturesSection';
import TokenSystem from '../components/TokenSystem';
import Roadmap from '../components/Roadmap';
import SocialProof from '../components/SocialProof';
import PricingSection from '../components/PricingSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Hero />
      <ProblemSection />
      <SolutionOverview />
      <FeaturesSection />
      <TokenSystem />
      <Roadmap />
      <SocialProof />
      <PricingSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
