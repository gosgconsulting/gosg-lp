import React from 'react';
import { CheckCircle, Zap, Shield, Users, TrendingUp, Award } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "{{feature1Title}}",
      description: "{{feature1Description}}",
      benefits: ["{{feature1Benefit1}}", "{{feature1Benefit2}}", "{{feature1Benefit3}}"]
    },
    {
      icon: Shield,
      title: "{{feature2Title}}",
      description: "{{feature2Description}}",
      benefits: ["{{feature2Benefit1}}", "{{feature2Benefit2}}", "{{feature2Benefit3}}"]
    },
    {
      icon: Users,
      title: "{{feature3Title}}",
      description: "{{feature3Description}}",
      benefits: ["{{feature3Benefit1}}", "{{feature3Benefit2}}", "{{feature3Benefit3}}"]
    },
    {
      icon: TrendingUp,
      title: "{{feature4Title}}",
      description: "{{feature4Description}}",
      benefits: ["{{feature4Benefit1}}", "{{feature4Benefit2}}", "{{feature4Benefit3}}"]
    },
    {
      icon: Award,
      title: "{{feature5Title}}",
      description: "{{feature5Description}}",
      benefits: ["{{feature5Benefit1}}", "{{feature5Benefit2}}", "{{feature5Benefit3}}"]
    }
  ];

  return (
    <section className="py-12 lg:py-20 relative">
      <div className="container-custom">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-h2 text-white mb-6 lg:mb-8">
            {{featuresSectionTitle}}
          </h2>
          <p className="text-body-large text-gray-300 max-w-3xl mx-auto">
            {{featuresSectionDescription}}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 lg:p-8 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:shadow-primary/20 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/30 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary-light" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-primary-light mr-2 flex-shrink-0" strokeWidth={1.5} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
