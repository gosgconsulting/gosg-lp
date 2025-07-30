
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, CheckCircle, CreditCard, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 container-custom text-center py-12 lg:py-24">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center mb-6 lg:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <span className="text-2xl lg:text-3xl font-bold text-white">GO SG</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-h1 text-white mb-4 lg:mb-6 leading-tight max-w-5xl mx-auto">
          Grow your business with{' '}
          <span className="text-gradient">data-driven marketing</span>
          <br className="hidden sm:block" />
          <span className="block text-3xl lg:text-5xl mt-2">Digital Marketing Agency</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg lg:text-body-large text-gray-300 mb-6 lg:mb-8 max-w-4xl mx-auto leading-relaxed">
          We help businesses grow through strategic digital marketing initiatives that drive real results. 
          From SEO to paid advertising, we deliver measurable outcomes for your business.
        </p>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 mb-8 lg:mb-10">
          <div className="trust-item">
            <Shield className="w-4 h-4" />
            <span>Proven Results</span>
          </div>
          <div className="trust-item">
            <CheckCircle className="w-4 h-4" />
            <span>Expert Team</span>
          </div>
          <div className="trust-item">
            <CreditCard className="w-4 h-4" />
            <span>Free Consultation</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 lg:mb-12">
          <Button size="lg" className="btn-mobile-full sm:w-auto">
            Schedule a Consultation
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="secondary" size="lg" className="btn-mobile-full sm:w-auto">
            View Our Services
          </Button>
        </div>

        {/* Bottom trust text */}
        <div className="text-sm text-muted-foreground">
          <p>Trusted by businesses worldwide • Free consultation • Proven results</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
