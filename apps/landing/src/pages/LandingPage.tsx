import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../features/landing/components/HeroSection';
import { CareLoopSection } from '../features/landing/components/CareLoopSection';
import { FeaturesSection } from '../features/landing/components/FeaturesSection';
import { NextActionSection } from '../features/landing/components/NextActionSection';
import { RolesPreviewSection } from '../features/landing/components/RolesPreviewSection';
import { DemoGatewaySection } from '../features/landing/components/DemoGatewaySection';
import { FAQSection } from '../features/landing/components/FAQSection';

export function LandingPage() {
  return (
    <div className="w-full bg-mesh relative text-foreground selection:bg-primary-blue/30 overflow-x-hidden">
      <HeroSection />
      <CareLoopSection />
      <NextActionSection />
      <FeaturesSection />
      <RolesPreviewSection />
      <DemoGatewaySection />
      <FAQSection />
      
      {/* Final CTA */}
      <section className="py-24 bg-slate-900 text-center text-white">
        <div className="mx-auto max-w-4xl px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-8">
            Healthcare should move forward, not get lost between visits.
          </h2>
          <div className="flex justify-center gap-4">
            <a 
              href="#demos"
              className="bg-primary-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:scale-105 transition-all shadow-lg shadow-primary-blue/30"
            >
              Try Medonivo
            </a>
            <a 
              href="#demos"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
