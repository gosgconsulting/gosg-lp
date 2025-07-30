
import React from 'react';
import { Check, Search, Database, Users, Zap, Sparkles } from 'lucide-react';

const SolutionOverview = () => {
  const features = [
    { icon: Search, text: "SEO Content & Optimization" },
    { icon: Database, text: "Google Maps & Social Scraping" },
    { icon: Users, text: "Multi-Channel Lead Generation" },
    { icon: Zap, text: "Automated Campaign Deployment" },
    { icon: Sparkles, text: "Future Tools (Coming Soon)" }
  ];

  return (
    <section className="py-12 lg:py-20 relative">
      <div className="container-custom text-center">
        <h2 className="text-h2 text-white mb-4 lg:mb-6">
          Meet <span className="text-gradient">Sparti</span>
        </h2>
        
        <p className="text-body-large text-muted-foreground mb-8 lg:mb-4">Your Unified Automation Command Center</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Check className="w-5 h-5 lg:w-6 lg:h-6 text-success-green mr-2" />
                <feature.icon className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
              </div>
              <p className="text-muted-foreground font-medium text-sm lg:text-base">{feature.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 lg:p-8 rounded-2xl border border-primary/30">
          <h3 className="text-xl lg:text-3xl font-bold text-white mb-4">
            One platform. One login. Unlimited possibilities.
          </h3>
          <p className="text-muted-foreground text-base lg:text-xl max-w-4xl mx-auto">
            Transform your business operations with the first truly unified automation platform. 
            Scale from startup to enterprise without changing tools.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;
