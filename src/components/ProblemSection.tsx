
import React from 'react';
import { X, DollarSign, Zap, Users } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    { icon: DollarSign, text: "Separate SEO tools" },
    { icon: Zap, text: "Multiple scraping platforms" },
    { icon: Users, text: "Different lead gen systems" },
    { icon: X, text: "Complex integrations" },
    { icon: DollarSign, text: "Unused subscriptions" }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Tired of <span className="text-red-400">Tool Sprawl</span>?
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          You're juggling multiple subscriptions, learning different interfaces, and struggling with integrations that break.
        </p>

        <div className="grid md:grid-cols-5 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-center mb-3">
                <X className="w-6 h-6 text-red-400 mr-2" />
                <problem.icon className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-300 text-sm">{problem.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 rounded-2xl border border-purple-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            What if one platform could do it all?
          </h3>
          <p className="text-gray-300 text-lg">
            Stop paying for scattered tools. Start automating with unified power.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
