import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function RolesPreviewSection() {
  return (
    <section id="doctors" className="py-24 bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Doctor Experience */}
        <div className="lg:flex lg:items-center lg:gap-16 mb-24">
          <motion.div 
            className="lg:w-1/2 order-2 lg:order-1 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="glass-card rounded-3xl p-6 shadow-xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
               {/* Doctor UI Mockup */}
               <div className="flex items-center justify-between border-b border-white/30 pb-4 mb-4">
                 <div className="flex items-center gap-3">
                   <div className="h-10 w-10 bg-primary-blue rounded-full text-white flex items-center justify-center font-bold">Dr</div>
                   <div>
                     <p className="font-semibold text-mainText">Dr. Workspace</p>
                     <p className="text-xs text-mutedText">Active Consultation</p>
                   </div>
                 </div>
               </div>
               <div className="space-y-3">
                 <div className="h-8 bg-white/50 backdrop-blur-sm rounded w-1/3"></div>
                 <div className="h-24 bg-white/40 backdrop-blur-sm rounded border border-white/50"></div>
                 <div className="h-12 bg-blue-50/70 backdrop-blur-sm rounded border border-blue-100 mt-4"></div>
               </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 order-1 lg:order-2 text-center lg:text-left flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 backdrop-blur-md text-primary-blue text-sm font-semibold mb-6">
              <Stethoscope className="h-4 w-4" /> For Doctors
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-mainText sm:text-4xl mb-6">
              A clinical workspace that thinks like you do.
            </h2>
            <p className="text-lg text-mutedText mb-8 max-w-2xl">
              Write prescriptions, recommend tests, and set follow-ups. Medonivo automatically translates your instructions into a structured CareLoop for the patient.
            </p>
            <a href="#demos" className="inline-flex items-center justify-center gap-2 text-primary-blue font-semibold hover:text-blue-700 transition group">
              Explore Doctor Experience <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Organization Experience */}
        <div className="lg:flex lg:items-center lg:gap-16" id="organizations">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/50 backdrop-blur-md text-teal-700 text-sm font-semibold mb-6">
              <Building2 className="h-4 w-4" /> For Medical Organizations
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-mainText sm:text-4xl mb-6">
              Manage your healthcare operations seamlessly.
            </h2>
            <p className="text-lg text-mutedText mb-8 max-w-2xl">
              Verify doctors, manage departments and branches, and oversee appointment capacity without compromising patient data privacy.
            </p>
            <a href="#demos" className="inline-flex items-center justify-center gap-2 text-teal-700 font-semibold hover:text-teal-800 transition group">
              Explore Medical Dashboard <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="glass-card rounded-3xl p-6 shadow-xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
               {/* Org UI Mockup */}
               <div className="flex items-center justify-between border-b border-white/30 pb-4 mb-4">
                 <p className="font-semibold text-mainText">Pending Verification (3)</p>
               </div>
               <div className="space-y-4">
                 {[1, 2].map((i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm rounded-lg border border-white/50">
                     <div className="flex items-center gap-3">
                       <div className="h-8 w-8 bg-white/60 rounded-full"></div>
                       <div>
                         <p className="font-semibold text-sm text-mainText">Dr. Specialist {i}</p>
                         <p className="text-xs text-mutedText">Cardiology</p>
                       </div>
                     </div>
                     <button onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-primary-blue bg-blue-50/70 backdrop-blur-sm px-3 py-1.5 rounded hover:bg-blue-100 transition-colors cursor-not-allowed">Review</button>
                   </div>
                 ))}
               </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
