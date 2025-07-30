import React, { useState } from 'react';
import { Play, X, DollarSign, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const VideoExplainerSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const problems = [
    { icon: DollarSign, text: "Separate SEO tools", cost: "$299/mo" },
    { icon: Zap, text: "Multiple scraping platforms", cost: "$149/mo" },
    { icon: Users, text: "Different lead gen systems", cost: "$199/mo" },
    { icon: X, text: "Complex integrations", cost: "Hours lost" },
    { icon: DollarSign, text: "Unused subscriptions", cost: "$200/mo" }
  ];

  const solution = [
    "One unified platform",
    "Token-based flexibility", 
    "Seamless integrations",
    "Automated workflows",
    "Continuous innovation"
  ];

  return (
    <section className="py-12 lg:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-sparti-primary-light/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="container-custom relative">
        {/* Problem Statement */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-4">
            <X className="w-4 h-4" />
            Tool Sprawl Crisis
          </div>
          <h2 className="text-h2 text-foreground mb-4">
            Stop Paying for <span className="text-destructive">Scattered Tools</span>
          </h2>
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            Most businesses waste thousands on overlapping subscriptions while struggling with broken integrations
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 lg:mb-12">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="group bg-card border border-border rounded-xl p-4 lg:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="relative">
                  <X className="w-5 h-5 lg:w-6 lg:h-6 text-destructive absolute -top-1 -right-1 z-10" />
                  <problem.icon className="w-6 h-6 lg:w-8 lg:h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm lg:text-base mb-2 text-center">{problem.text}</p>
              <p className="text-destructive text-xs lg:text-sm font-semibold text-center">{problem.cost}</p>
            </div>
          ))}
        </div>

        {/* Video Explainer */}
        <div className="max-w-4xl mx-auto mb-8 lg:mb-12">
          <div className="relative bg-gradient-to-br from-sparti-primary/5 to-sparti-primary-dark/5 rounded-2xl p-1">
            <div className="bg-card rounded-xl overflow-hidden">
              {!isVideoPlaying ? (
                <div className="relative aspect-video bg-gradient-to-br from-sparti-primary-dark to-sparti-primary flex items-center justify-center group cursor-pointer"
                     onClick={() => setIsVideoPlaying(true)}>
                  {/* Video Thumbnail Placeholder */}
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 lg:w-10 lg:h-10 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">
                      See How Sparti Transforms Your Workflow
                    </h3>
                    <p className="text-white/90 text-sm lg:text-base">
                      Watch how one platform replaces 5+ tools • 3 min overview
                    </p>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                    3:24
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  {/* Video Player Placeholder */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Play className="w-8 h-8 text-white" fill="currentColor" />
                    </div>
                    <p className="text-muted-foreground">Video player will be embedded here</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsVideoPlaying(false)}
                      className="mt-2"
                    >
                      Close Preview
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Before */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                <X className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Your Current Reality</h3>
                <p className="text-muted-foreground">Managing multiple tools is expensive and complex</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <X className="w-4 h-4 text-destructive flex-shrink-0" />
                  <span className="text-muted-foreground flex-grow">{problem.text}</span>
                  <span className="text-destructive text-sm font-medium">{problem.cost}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
              <p className="text-destructive font-semibold">Total Monthly Waste: $847+ plus countless hours</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* After */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">With Sparti</h3>
                <p className="text-muted-foreground">One platform, unlimited possibilities</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {solution.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground flex-grow">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <p className="text-primary font-semibold">Start at $49/month • Save 80%+ on tools</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 lg:mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Ready to Escape Tool Sprawl?
            </h3>
            <p className="text-body-large text-muted-foreground mb-6">
              Join thousands of businesses consolidating their automation stack with Sparti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base">
                Start Free with 100 Tokens
              </Button>
              <Button variant="outline" size="lg" className="text-base">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoExplainerSection;