
import React from 'react';
import { Star, Quote } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechFlow Solutions",
      quote: "Sparti eliminated 5 different tools from our stack while doubling our lead generation. The token system is genius.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Content Manager",
      company: "Digital Growth Co.",
      quote: "The SEO automation alone saved us 20 hours per week. Our content now ranks consistently on page 1.",
      rating: 5
    },
    {
      name: "Jessica Park",
      role: "Small Business Owner",
      company: "LocalBiz Marketing",
      quote: "Token flexibility means we only pay for what we actually use. Perfect for growing businesses like ours.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Join Businesses Automating Their Growth
        </h2>
        
        <p className="text-xl text-gray-300 mb-12">
          See how companies are transforming their operations with Sparti
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 relative">
              <Quote className="w-8 h-8 text-purple-400 mb-4" />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-300 text-lg mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <p className="text-purple-400 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-8 rounded-2xl border border-green-500/20">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-green-400 mb-2">10,000+</p>
              <p className="text-gray-300">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400 mb-2">2.5M+</p>
              <p className="text-gray-300">Tasks Automated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-400 mb-2">99.9%</p>
              <p className="text-gray-300">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
