
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Building } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "3,300",
      duration: "total package",
      description: "Perfect for small businesses getting started",
      icon: Zap,
      popular: false,
      features: [
        "1x Landing page + 1 blog",
        "3 months SEO optimization",
        "$1,500 SGD website development",
        "$600 SGD/month SEO (3 months)",
        "Basic analytics & reporting"
      ]
    },
    {
      name: "Growth",
      price: "4,500",
      duration: "starting from",
      description: "Starter + targeted advertising",
      icon: Crown,
      popular: true,
      features: [
        "Everything in Starter",
        "6 months SEM OR SMA",
        "15% ad spend management fee",
        "$200 SGD minimum monthly fee",
        "Enhanced performance tracking"
      ]
    },
    {
      name: "Scale",
      price: "10,200",
      duration: "starting from",
      description: "Complete digital marketing solution",
      icon: Building,
      popular: false,
      features: [
        "Multi-page site with blog",
        "12 months SEO ($600/month)",
        "Both SEM + SMA campaigns",
        "15% ad spend management fee",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Digital Marketing Packages
        </h2>
        
        <p className="text-xl text-gray-300 mb-12">
          Choose the package that fits your business goals
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
              plan.popular ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-gray-700'
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center justify-center mb-6">
                <plan.icon className="w-12 h-12 text-purple-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-400"> SGD {plan.duration}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button className={`w-full py-3 rounded-xl transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}>
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* Enterprise section */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 rounded-2xl border border-purple-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">Need More Power?</h3>
          <p className="text-gray-300 text-lg mb-6">
            Enterprise plans with unlimited tokens, on-premise deployment, and dedicated infrastructure.
          </p>
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
