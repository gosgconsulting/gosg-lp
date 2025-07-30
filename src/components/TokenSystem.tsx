
import React from 'react';
import { Coins, Zap } from 'lucide-react';

const TokenSystem = () => {
  const tokenExamples = [
    { tokens: 10, description: "100 SEO keywords researched", color: "from-green-400 to-blue-500" },
    { tokens: 15, description: "500 Google Maps leads scraped", color: "from-purple-400 to-pink-500" },
    { tokens: 25, description: "1 complete blog post with humanization", color: "from-orange-400 to-red-500" },
    { tokens: 5, description: "50 LinkedIn outreach messages", color: "from-cyan-400 to-blue-500" }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <Coins className="w-12 h-12 text-yellow-400 mr-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Flexible Tokens, Unlimited Potential
          </h2>
        </div>
        
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          No rigid plans. No wasted features. Use Sparti Tokens for any automation task.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tokenExamples.map((example, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/40 transition-all duration-300">
              <div className={`w-16 h-16 bg-gradient-to-br ${example.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white font-bold text-lg">{example.tokens}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{example.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-8 rounded-2xl border border-yellow-500/20">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-yellow-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">The choice is yours.</h3>
          </div>
          <p className="text-gray-300 text-lg">
            Mix and match any automation tasks. Scale up or down based on your needs. 
            Pay for results, not unused features.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TokenSystem;
