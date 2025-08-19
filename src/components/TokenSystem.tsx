import React from 'react';
import { TrendingUp, Target, Users, Award } from 'lucide-react';

const TokenSystem = () => {
  const serviceExamples = [
    { 
      value: "90%", 
      description: "Client satisfaction rate with our services", 
      color: "from-primary to-primary-dark",
      icon: Award
    },
    { 
      value: "8x", 
      description: "Average ROI on marketing campaigns", 
      color: "from-primary to-primary-dark",
      icon: TrendingUp
    },
    { 
      value: "24/7", 
      description: "Campaign monitoring and support", 
      color: "from-primary to-primary-dark",
      icon: Target
    },
    { 
      value: "500+", 
      description: "Successful campaigns launched", 
      color: "from-primary to-primary-dark",
      icon: Users
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Why Choose Us
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          We're committed to your success with proven strategies that deliver real results.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {serviceExamples.map((example, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-primary/40 transition-all duration-300">
              <div className={`w-16 h-16 bg-gradient-to-br ${example.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <example.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{example.value}</div>
              <p className="text-gray-300 text-sm leading-relaxed">{example.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20">
            <h3 className="text-lg font-bold text-white mb-3">Expert Team</h3>
            <p className="text-gray-300 text-sm">Our professionals have years of experience in digital marketing and web development.</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20">
            <h3 className="text-lg font-bold text-white mb-3">Custom Strategies</h3>
            <p className="text-gray-300 text-sm">We create tailored solutions specific to your business needs and goals.</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20">
            <h3 className="text-lg font-bold text-white mb-3">Data-Driven Approach</h3>
            <p className="text-gray-300 text-sm">All our decisions are backed by analytics and performance metrics.</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20">
            <h3 className="text-lg font-bold text-white mb-3">Transparent Reporting</h3>
            <p className="text-gray-300 text-sm">Regular updates and clear reports on campaign performance and ROI.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenSystem;
