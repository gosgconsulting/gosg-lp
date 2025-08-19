import React from 'react';
import { Star, Quote } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      name: "Wardah S.",
      role: "Freelance Writer",
      company: "Upwork",
      quote: "A game changer for the writing industry! GO SG is a total game-changer! Their SEO services helped me rank my content higher and get more clients.",
      rating: 5,
      initials: "WS"
    },
    {
      name: "Zafar A.",
      role: "Creator",
      company: "Content Creator",
      quote: "My Favorite Digital Agency! I have been using GO SG for over several months. The team is easy to work with and helps me come up with great outlines for my YouTube content.",
      rating: 5,
      initials: "ZA"
    },
    {
      name: "Emiliano G.",
      role: "Founder & CEO",
      company: "Rivin",
      quote: "Great Services With A Great Team! Overall it is a great company with great products. Especially the ability to generate content that ranks well in search engines.",
      rating: 5,
      initials: "EG"
    },
    {
      name: "Ani D.",
      role: "Business Owner",
      company: "FineFireThings",
      quote: "GO SG is the best digital agency every website owner needs! Their SEO solutions are amazing to have, especially for businesses that take online presence seriously.",
      rating: 5,
      initials: "AD"
    },
    {
      name: "Krystian Z.",
      role: "CEO",
      company: "0101 Marketing",
      quote: "The best digital marketing team I've ever used! Thanks to GO SG, we have saved thousands of dollars a month on our marketing efforts while getting better results.",
      rating: 5,
      initials: "KZ"
    },
    {
      name: "Dennis H.",
      role: "Project Manager",
      company: "FedEx Services",
      quote: "Best Web Design On The Market! GO SG delivered a beautiful website that perfectly represents our brand and converts visitors into customers.",
      rating: 5,
      initials: "DH"
    }
  ];

  // Display first 3 testimonials initially
  const displayedTestimonials = testimonials.slice(0, 3);

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Hear from our customers
        </h2>
        
        <p className="text-xl text-gray-300 mb-12">
          See what our clients have to say about working with GO SG and the results we've delivered.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {displayedTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 relative">
              <Quote className="w-8 h-8 text-primary mb-4" />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-300 text-lg mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold text-lg">
                    {testimonial.initials}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <p className="text-primary text-sm">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/30 to-primary/20 p-8 rounded-2xl border border-primary/20">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary mb-2">90%</p>
              <p className="text-gray-300">of clients report positive results within the first month</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">8x</p>
              <p className="text-gray-300">average ROI on marketing campaigns</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">24/7</p>
              <p className="text-gray-300">client support and campaign monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
