import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Search, MousePointer, Share2, BarChart, ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Feature 1: Website Design */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Beautiful Websites That Convert</h3>
              </div>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Upgrade and enhance your business through top-notch website design that perfectly represents 
                your brand and converts visitors into customers. Mobile-responsive and user-friendly.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Mobile-responsive design for all devices",
                  "User-friendly interface and navigation",
                  "Brand-consistent visual identity",
                  "Conversion-optimized layouts",
                  "Fast loading and SEO-friendly"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-3 rounded-xl">
                Start Your Website
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-8 rounded-2xl border border-primary/20">
              <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
                <p className="text-primary text-sm font-mono">✓ Modern, professional design</p>
                <p className="text-gray-400 text-sm mt-2">✓ Fully responsive across devices</p>
                <p className="text-gray-400 text-sm">✓ Optimized for conversions</p>
                <p className="text-gray-400 text-sm">✓ SEO-friendly structure</p>
                <p className="text-gray-400 text-sm">✓ Fast loading performance</p>
                <p className="text-gray-400 text-sm">✓ Brand-consistent styling</p>
              </div>
              <p className="text-gray-300 text-sm">Beautiful websites that drive business results</p>
            </div>
          </div>
        </div>

        {/* Feature 2: SEO & Digital Marketing */}
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mr-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Dominate Search Results & Social Media</h3>
              </div>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Boost your search engine ranking and social media presence with our comprehensive 
                digital marketing strategies. From SEO to paid ads and social media management.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Humanised SEO that ranks higher",
                  "Targeted paid advertising campaigns",
                  "Engaging social media content",
                  "Analytics and performance tracking",
                  "Data-driven strategy optimization"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-3 rounded-xl">
                Boost Your Visibility
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="lg:order-1 bg-gradient-to-br from-primary/20 to-primary/10 p-8 rounded-2xl border border-primary/20">
              <div className="space-y-3">
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <p className="text-white font-medium">SEO Results</p>
                  <p className="text-gray-400 text-sm">Page 1 rankings • 300% traffic increase</p>
                  <p className="text-primary text-sm">ROI: 8x marketing investment</p>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <p className="text-white font-medium">Paid Advertising</p>
                  <p className="text-gray-400 text-sm">Google & Facebook Ads • Targeted campaigns</p>
                  <p className="text-primary text-sm">Conversion rate: 15.2%</p>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <p className="text-white font-medium">Social Media</p>
                  <p className="text-gray-400 text-sm">Engaging content • Community growth</p>
                  <p className="text-primary text-sm">Engagement: +250%</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-4">Comprehensive digital marketing success</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;