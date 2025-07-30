
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Database, ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Feature 1: SEO Automation */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Dominate Search Results on Autopilot</h3>
              </div>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Discover winning keywords, scrape competitor content, generate SEO-optimized articles, and publish directly to your CMS. 
                Our AI humanization ensures content passes all detection tools while ranking on page 1.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Keyword research to published content in one workflow",
                  "Google Search & competitor analysis",
                  "AI humanization that bypasses detection",
                  "Direct CMS integration",
                  "Automated publishing schedules"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl">
                Start SEO Automation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 p-8 rounded-2xl border border-green-500/20">
              <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
                <p className="text-green-400 text-sm font-mono">$ sparti seo --target="best project management tools"</p>
                <p className="text-gray-400 text-sm mt-2">✓ Found 247 keyword opportunities</p>
                <p className="text-gray-400 text-sm">✓ Analyzed 15 competitor articles</p>
                <p className="text-gray-400 text-sm">✓ Generated 2,500-word optimized article</p>
                <p className="text-gray-400 text-sm">✓ Humanized content (98% human score)</p>
                <p className="text-gray-400 text-sm">✓ Published to WordPress</p>
              </div>
              <p className="text-gray-300 text-sm">Complete SEO workflow in under 10 minutes</p>
            </div>
          </div>
        </div>

        {/* Feature 2: Lead Generation */}
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Find & Convert Leads While You Sleep</h3>
              </div>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Extract qualified leads from Google Maps, LinkedIn, and search results with full contact details. 
                Launch personalized outreach across email, LinkedIn, and WhatsApp automatically.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Google Maps, LinkedIn, and web scraping",
                  "Email, phone, and social profile extraction",
                  "Multi-channel campaign automation",
                  "Personalized message crafting",
                  "Lead scoring and prioritization"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl">
                Generate Leads Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="lg:order-1 bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 rounded-2xl border border-purple-500/20">
              <div className="space-y-3">
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <p className="text-white font-medium">TechStart Inc.</p>
                  <p className="text-gray-400 text-sm">john@techstart.com • LinkedIn • +1-555-0123</p>
                  <p className="text-purple-400 text-sm">Score: 94/100</p>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <p className="text-white font-medium">Innovation Labs</p>
                  <p className="text-gray-400 text-sm">sarah@innovlabs.io • LinkedIn • +1-555-0124</p>
                  <p className="text-purple-400 text-sm">Score: 89/100</p>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <p className="text-white font-medium">Growth Co.</p>
                  <p className="text-gray-400 text-sm">mike@growth.co • LinkedIn • +1-555-0125</p>
                  <p className="text-purple-400 text-sm">Score: 87/100</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-4">1,247 qualified leads found in your area</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
