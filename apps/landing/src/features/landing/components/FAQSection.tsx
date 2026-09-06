import React, { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';

const faqs = [
  { question: "What is Medonivo?", answer: "Medonivo is a modern healthcare platform that connects the entire care journey—from finding a doctor and booking an appointment, to tracking medicines, tests, and follow-ups." },
  { question: "What is CareLoop?", answer: "CareLoop is our core feature. It's a structured timeline that translates doctor's instructions into actionable tasks for the patient, ensuring care is fully completed." },
  { question: "Can I manage my family's health?", answer: "Yes. The Family Health Hub allows you to manage multiple family members from a single account, keeping their CareLoops and records separate but easily accessible." },
  { question: "How does temporary access work?", answer: "Using the Care Passport feature, you can generate a secure QR code or access code to temporarily share your selected health records with a new doctor." }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:gap-16">
        
        {/* Security Info */}
        <div className="lg:w-1/3 mb-12 lg:mb-0">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-green-100 text-success mb-6">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-mainText mb-4">
            Security and Privacy First
          </h2>
          <p className="text-mutedText mb-6">
            Patient-controlled sharing, consent-based access, and an audit-oriented architecture ensure your health data remains secure and private.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="lg:w-2/3">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${openIndex === index ? 'border-primary-blue shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-mainText">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-mutedText transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`px-6 pb-6 text-mutedText overflow-hidden transition-all duration-200 ${openIndex === index ? 'block' : 'hidden'}`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
