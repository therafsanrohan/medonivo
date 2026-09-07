'use client';
import React from 'react';
import { ArrowRight, Activity, Calendar, FileText } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32">
      {/* Background abstract gradient/glass effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 h-96 w-[80vw] md:w-96 rounded-full bg-primary-blue/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-[80vw] md:w-96 rounded-full bg-secondary-cyan/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-12">
        {/* Text Content */}
        <motion.div 
          className="lg:w-1/2 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-4xl font-extrabold tracking-tight text-mainText sm:text-5xl xl:text-6xl mb-6">
            Your healthcare journey should not stop after the appointment.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-mutedText mb-10 max-w-2xl mx-auto lg:mx-0">
            Medonivo connects prescriptions, medicines, tests, reports, reviews, and follow-ups into a clear, continuous care journey.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <a href="#demos" className="group flex items-center justify-center gap-2 rounded-full bg-primary-blue px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Try Medonivo
              <ArrowRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#careloop" className="flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-mainText hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-0.5">
              See How CareLoop Works
            </a>
          </motion.div>
        </motion.div>

        {/* UI Preview Card */}
        <motion.div 
          className="mt-16 lg:mt-0 lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <motion.div 
            className="relative mx-auto w-full max-w-md rounded-2xl bg-white/60 p-2 shadow-2xl backdrop-blur-xl border border-white/40"
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6 overflow-hidden">
              {/* Mock UI Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-mainText flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary-blue" />
                  Active CareLoop
                </h3>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-success">
                  On Track
                </span>
              </div>
              
              {/* Mock Timeline */}
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-primary-blue">
                  <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary-blue" />
                  <p className="text-sm font-medium text-mainText">Consultation Completed</p>
                  <p className="text-xs text-mutedText mt-1">Dr. Shania Esha • Today</p>
                </div>
                <div className="relative pl-6 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0.5 h-4 w-4 rounded-full border-2 border-white bg-warning shadow-sm" />
                  <p className="text-sm font-semibold text-warning">Action Required</p>
                  <div className="mt-2 rounded-lg bg-yellow-50 p-3 flex items-start gap-3 border border-yellow-100 transition-all hover:bg-yellow-100/50 cursor-pointer">
                     <FileText className="h-5 w-5 text-warning flex-shrink-0" />
                     <div>
                       <p className="text-sm font-medium text-mainText">CBC Blood Test</p>
                       <p className="text-xs text-mutedText mt-1">Please complete this test within 2 days.</p>
                     </div>
                  </div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-gray-200" />
                  <p className="text-sm font-medium text-mutedText flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Follow-up Appointment
                  </p>
                  <p className="text-xs text-mutedText mt-1">Due in 14 days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
