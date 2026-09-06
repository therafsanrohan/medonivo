import React from 'react';
import { Stethoscope, Pill, FlaskConical, FileCheck2, UserCheck, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section id="careloop" className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-mainText sm:text-4xl mb-4">
            Meet Medonivo CareLoop
          </h2>
          <p className="text-lg text-mutedText max-w-2xl mx-auto">
            A single, continuous timeline connecting every step of your health journey, ensuring nothing gets lost between visits.
          </p>
        </motion.div>

        <div className="relative mt-12">
          {/* Connector Line (Desktop) */}
          <motion.div 
            className="hidden md:block absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-gray-100 rounded-full origin-left" 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 relative z-10">
            {journeySteps.map((step, index) => (
              <motion.div 
                key={step.id} 
                className="flex flex-col items-center group"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-full shadow-sm border-4 border-white transition-transform duration-300 group-hover:scale-110
                  ${index === 0 || index === 7 ? 'bg-primary-blue text-white' : 'bg-gray-50 text-primary-blue group-hover:bg-blue-50'}`}>
                  <step.icon className="h-7 w-7" />
                </div>
                <p className="mt-4 text-sm font-semibold text-mainText text-center">{step.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
