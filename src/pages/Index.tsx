import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import SolutionOverview from '../components/SolutionOverview';
import FeaturesSection from '../components/FeaturesSection';
import TokenSystem from '../components/TokenSystem';
import SocialProof from '../components/SocialProof';
import PricingSection from '../components/PricingSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import VisualEditorBar from '../components/VisualEditorBar';

const Index = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Check URL params for edit mode
    const urlParams = new URLSearchParams(window.location.search);
    const editParam = urlParams.get('sparti');
    if (editParam === 'edit') {
      setIsEditMode(true);
    }
  }, []);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    // Update URL without page reload
    const url = new URL(window.location.href);
    if (!isEditMode) {
      url.searchParams.set('sparti', 'edit');
    } else {
      url.searchParams.delete('sparti');
    }
    window.history.replaceState({}, '', url.toString());
  };

  const handleSave = () => {
    console.log('Saving changes...');
    // TODO: Implement save functionality
  };

  const handleOpenSettings = () => {
    window.open('/admin', '_blank');
  };

  return (
    <>
      <VisualEditorBar 
        isEditMode={isEditMode}
        onToggleEditMode={handleToggleEditMode}
        onSave={handleSave}
        onOpenSettings={handleOpenSettings}
      />
      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${isEditMode ? 'pt-12' : ''}`}>
        <Hero />
        <ProblemSection />
        <SolutionOverview />
        <FeaturesSection />
        <TokenSystem />
        <SocialProof />
        <PricingSection />
        <FAQ />
        <Footer />
      </div>
    </>
  );
};

export default Index;
