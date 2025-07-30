
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
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Sparti</span>
        </h2>
        
        <p className="text-2xl text-gray-300 mb-4">Your Unified Automation Command Center</p>
        
        <div className="grid md:grid-cols-5 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-green-400 mr-2" />
                <feature.icon className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-gray-300 font-medium">{feature.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 p-8 rounded-2xl border border-purple-500/30">
          <h3 className="text-3xl font-bold text-white mb-4">
            One platform. One login. Unlimited possibilities.
          </h3>
          <p className="text-gray-300 text-xl max-w-4xl mx-auto">
            Transform your business operations with the first truly unified automation platform. 
            Scale from startup to enterprise without changing tools.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;
