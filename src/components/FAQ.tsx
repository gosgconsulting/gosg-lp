
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What is a digital agency?",
      answer: "A digital agency is a company that provides comprehensive digital marketing services to help businesses grow their online presence. We specialize in website design, SEO, paid advertising, social media management, and analytics to drive measurable results for your business."
    },
    {
      question: "What is a full-service digital agency?",
      answer: "A full-service digital agency like GO SG offers all aspects of digital marketing under one roof. From website design and development to SEO, paid ads, social media, and reporting - we handle every aspect of your digital marketing strategy so you don't need multiple vendors."
    },
    {
      question: "Why hire a professional digital marketing agency?",
      answer: "Professional agencies bring expertise, proven strategies, and dedicated resources that most businesses can't maintain in-house. We stay current with the latest trends, have access to premium tools, and can deliver results faster and more cost-effectively than building an internal team."
    },
    {
      question: "How can a digital agency help?",
      answer: "We help businesses increase their online visibility, attract more qualified leads, improve conversion rates, and grow revenue. Our data-driven approach ensures every campaign is optimized for maximum ROI, while our expert team handles the technical complexity so you can focus on running your business."
    },
    {
      question: "How to select a digital agency?",
      answer: "Look for agencies with proven results, transparent reporting, industry experience, and a full range of services. Check their portfolio, read client testimonials, and ensure they offer clear communication and regular updates. GO SG provides all of this plus a free consultation to discuss your specific needs."
    },
    {
      question: "What does a digital agency do?",
      answer: "Digital agencies develop and execute comprehensive online marketing strategies. This includes creating websites, optimizing for search engines, managing paid advertising campaigns, creating social media content, tracking performance analytics, and continuously optimizing for better results and higher ROI."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about GO SG
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-600">
                <AccordionTrigger className="text-white hover:text-primary text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
