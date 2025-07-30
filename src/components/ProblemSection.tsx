
import React from 'react';
import { XCircle, TrendingDown, Clock, Target, AlertCircle } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    { icon: TrendingDown, text: "Declining website traffic" },
    { icon: Clock, text: "Time-consuming marketing tasks" },
    { icon: Target, text: "Poor conversion rates" },
    { icon: AlertCircle, text: "Limited marketing expertise" },
    { icon: TrendingDown, text: "Low return on ad spend" }
  ];

  return (
    <section className="py-12 lg:py-20 relative">
      <div className="container-custom text-center">
        <h2 className="text-h2 text-white mb-6 lg:mb-8">
          Struggling with <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent font-bold">Marketing Challenges</span>?
        </h2>
        
        <p className="text-body-large text-gray-300 mb-8 lg:mb-12 max-w-3xl mx-auto">
          You're juggling multiple subscriptions, learning different interfaces, and struggling with integrations that break.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {problems.map((problem, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/30 hover:shadow-lg hover:shadow-primary/20 group">
              <div className="flex items-center justify-center mb-3">
                <XCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white/80 mr-2 group-hover:text-primary-light transition-colors duration-300" strokeWidth={1.5} />
                <problem.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white/60 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <p className="text-white/80 text-sm lg:text-base font-medium">{problem.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/30 to-primary/20 p-6 lg:p-8 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
            What if one agency could solve it all?
          </h3>
          <p className="text-white/80 text-base lg:text-lg">
            Stop struggling with ineffective marketing. Start growing with proven strategies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
