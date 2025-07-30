
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
    <section className="py-12 lg:py-20 relative">
      <div className="container-custom text-center">
        <h2 className="text-h2 text-white mb-6 lg:mb-8">
          Tired of <span className="text-destructive">Tool Sprawl</span>?
        </h2>
        
        <p className="text-body-large text-gray-300 mb-8 lg:mb-12 max-w-3xl mx-auto">
          You're juggling multiple subscriptions, learning different interfaces, and struggling with integrations that break.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {problems.map((problem, index) => (
            <div key={index} className="bg-muted/50 backdrop-blur-sm p-4 lg:p-6 rounded-xl border border-border">
              <div className="flex items-center justify-center mb-3">
                <X className="w-5 h-5 lg:w-6 lg:h-6 text-destructive mr-2" />
                <problem.icon className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm lg:text-base">{problem.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 lg:p-8 rounded-2xl border border-primary/20">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
            What if one platform could do it all?
          </h3>
          <p className="text-muted-foreground text-base lg:text-lg">
            Stop paying for scattered tools. Start automating with unified power.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
