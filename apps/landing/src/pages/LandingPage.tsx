import React from 'react';
import { HeroSection } from '../features/landing/components/HeroSection';
import { CareLoopSection } from '../features/landing/components/CareLoopSection';
import { FeaturesSection } from '../features/landing/components/FeaturesSection';
import { NextActionSection } from '../features/landing/components/NextActionSection';
import { RolesPreviewSection } from '../features/landing/components/RolesPreviewSection';
import { DemoGatewaySection } from '../features/landing/components/DemoGatewaySection';
import { FAQSection } from '../features/landing/components/FAQSection';

export function LandingPage() {
  return (
    <div className="w-full">
      <HeroSection />
      <CareLoopSection />
      <NextActionSection />
      <FeaturesSection />
      <RolesPreviewSection />
      <DemoGatewaySection />
      <FAQSection />
      
      {/* Final CTA */}
      <section className="py-24 bg-primary-blue text-center text-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-4xl font-bold mb-8">
            Healthcare should move forward, not get lost between visits.
          </h2>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Try Medonivo
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
