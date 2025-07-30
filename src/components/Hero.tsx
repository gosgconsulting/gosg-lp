
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-cyan-600/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">Sparti</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Stop Managing
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Multiple AI Tools
          </span>
          <span className="block text-4xl md:text-6xl">Start Automating Everything</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Sparti combines SEO automation, data scraping, and lead generation into one powerful platform. 
          Use your tokens for any task, scale as you grow.
        </p>

        {/* Social proof badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-gray-400">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span>99.9% Uptime</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>SOC2 Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-purple-400 font-semibold">10K+</span>
            <span>Active Users</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Free with 100 Tokens
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-xl transition-all duration-300">
            See How It Works
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-sm text-gray-400">
          <p>Trusted by businesses worldwide • No credit card required • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
