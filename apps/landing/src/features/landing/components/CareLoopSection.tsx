import React from 'react';
import { Stethoscope, Pill, FlaskConical, FileCheck2, UserCheck, CalendarCheck, CheckCircle2 } from 'lucide-react';

export function CareLoopSection() {
  const journeySteps = [
    { id: 1, name: 'Doctor Visit', icon: Stethoscope },
    { id: 2, name: 'Prescription', icon: FileCheck2 },
    { id: 3, name: 'Medicine', icon: Pill },
    { id: 4, name: 'Test', icon: FlaskConical },
    { id: 5, name: 'Report', icon: FileCheck2 },
    { id: 6, name: 'Doctor Review', icon: UserCheck },
    { id: 7, name: 'Follow-up', icon: CalendarCheck },
    { id: 8, name: 'Care Completed', icon: CheckCircle2 },
  ];

  return (
    <section id="careloop" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-mainText sm:text-4xl mb-4">
            Meet Medonivo CareLoop
          </h2>
          <p className="text-lg text-mutedText max-w-2xl mx-auto">
            A single, continuous timeline connecting every step of your health journey, ensuring nothing gets lost between visits.
          </p>
        </div>

        <div className="relative mt-12">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-gray-100 rounded-full" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 relative z-10">
            {journeySteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full shadow-sm border-4 border-white
                  ${index === 0 || index === 7 ? 'bg-primary-blue text-white' : 'bg-gray-50 text-primary-blue'}`}>
                  <step.icon className="h-7 w-7" />
                </div>
                <p className="mt-4 text-sm font-semibold text-mainText text-center">{step.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
