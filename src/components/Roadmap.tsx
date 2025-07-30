
import React from 'react';
import { Sparkles, Users, TrendingUp, Smartphone, Code, Lightbulb } from 'lucide-react';

const Roadmap = () => {
  const upcomingFeatures = [
    { icon: Users, title: "HR Talent Sourcing", description: "Find candidates by job description" },
    { icon: TrendingUp, title: "E-commerce Price Monitoring", description: "Track competitor pricing automatically" },
    { icon: Smartphone, title: "Social Media Automation", description: "Cross-platform content scheduling" },
    { icon: Code, title: "Custom Workflow Builder", description: "Drag-and-drop automation designer" },
    { icon: Sparkles, title: "API Access for Developers", description: "Build custom integrations" }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <Lightbulb className="w-12 h-12 text-purple-400 mr-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Built for Tomorrow's Automation
          </h2>
        </div>
        
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          We're constantly expanding Sparti's capabilities. Here's what's coming next.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingFeatures.map((feature, index) => (
            <div key={index} className="relative bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full">
                Coming Soon
              </div>
              
              <div className="flex items-center justify-center mb-4">
                <feature.icon className="w-10 h-10 text-purple-400" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 p-8 rounded-2xl border border-purple-500/30">
          <h3 className="text-2xl font-bold text-white mb-4">
            Your suggestions shape our roadmap.
          </h3>
          <p className="text-gray-300 text-lg">
            Have an automation need we haven't covered? Let us know and we'll prioritize it for development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
