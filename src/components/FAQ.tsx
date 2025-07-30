
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "How do tokens work?",
      answer: "Tokens are Sparti's flexible currency system. Each automation task consumes a specific number of tokens based on complexity. You can use your tokens for any feature - SEO research, data scraping, lead generation, or content creation. Unused tokens roll over to the next month."
    },
    {
      question: "Can I switch between tools freely?",
      answer: "Absolutely! That's the beauty of Sparti's unified platform. You can use your tokens for SEO work today, lead generation tomorrow, and data scraping next week. No need to manage separate subscriptions or learn different interfaces."
    },
    {
      question: "What happens to unused tokens?",
      answer: "Unused tokens automatically roll over to the next billing cycle. We believe in fair pricing - you shouldn't lose what you've paid for. Tokens only expire if your account is inactive for 12 months."
    },
    {
      question: "How do you ensure data compliance?",
      answer: "Sparti is SOC2 Type II certified and GDPR compliant. We use enterprise-grade encryption, regular security audits, and follow strict data handling protocols. All scraped data respects robots.txt and rate limiting guidelines."
    },
    {
      question: "Do you offer API access?",
      answer: "API access is coming soon and will be available for Growth and Scale plan users. You'll be able to integrate Sparti's automation capabilities directly into your existing workflows and applications."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your account remains active until the end of your current billing period, and you can continue using your remaining tokens during that time."
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
            Everything you need to know about Sparti
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-600">
                <AccordionTrigger className="text-white hover:text-purple-400 text-left">
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
