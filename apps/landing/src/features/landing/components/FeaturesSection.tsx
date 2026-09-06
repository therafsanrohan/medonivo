import React from 'react';
import { Users, Clock, ShieldAlert, Pill, CalendarCheck } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      name: 'Family Health Hub',
      description: 'Manage your entire family\'s healthcare from a single account. Easily switch profiles and keep track of everyone\'s CareLoops, appointments, and records.',
      icon: Users,
    },
    {
      name: 'Smart Health Timeline',
      description: 'View a chronological history of your health. All your consultations, medicines, and reports are grouped intuitively.',
      icon: Clock,
    },
    {
      name: 'Emergency Health Card',
      description: 'Keep your blood group, allergies, current medicines, and emergency contacts accessible instantly via a secure QR code.',
      icon: ShieldAlert,
    },
    {
      name: 'Medicine Schedule',
      description: 'Never miss a dose. Your doctor\'s prescription automatically turns into an actionable daily medicine schedule.',
      icon: Pill,
    },
    {
      name: 'Smart Follow-up Tracker',
      description: 'Get timely reminders when it\'s time for a follow-up visit. Book directly from the reminder and keep your CareLoop active.',
      icon: CalendarCheck,
    },
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-mainText sm:text-4xl">
            Core Features
          </h2>
          <p className="mt-4 text-lg text-mutedText">
            Everything you need to manage your family's health seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="h-12 w-12 rounded-xl bg-primary-blue/10 flex items-center justify-center text-primary-blue mb-6">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-mainText mb-3">{feature.name}</h3>
              <p className="text-mutedText leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
