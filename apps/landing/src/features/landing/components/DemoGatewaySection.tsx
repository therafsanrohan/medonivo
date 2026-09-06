import React from 'react';
import { Link } from 'react-router-dom';
import { Play, User, Stethoscope, Building2, ShieldEllipsis } from 'lucide-react';
import { motion } from 'framer-motion';

export function DemoGatewaySection() {
  const roles = [
    { name: 'Patient Demo', icon: User, color: 'bg-primary-blue', route: '/demo?role=patient' },
    { name: 'Doctor Demo', icon: Stethoscope, color: 'bg-teal-600', route: '/demo?role=doctor' },
    { name: 'Medical Organization Demo', icon: Building2, color: 'bg-indigo-600', route: '/demo?role=org' },
    { name: 'Admin Demo', icon: ShieldEllipsis, color: 'bg-gray-800', route: '/demo?role=admin' },
  ];

  return (
    <section className="py-24 bg-transparent border-t border-white/20 text-center overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-mainText sm:text-4xl mb-4">
            Experience Medonivo
          </h2>
          <p className="text-lg text-mutedText mb-12 max-w-2xl mx-auto">
            Explore the platform from every perspective. Choose a role below to launch an interactive product demo.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {roles.map((role) => (
            <motion.div 
              key={role.name}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}
            >
              <Link 
                to={role.route}
                className="flex flex-col items-center p-8 glass-card hover:bg-white/70 rounded-2xl transition-all duration-300 group h-full hover:-translate-y-1"
              >
                <div className={`h-16 w-16 rounded-full flex items-center justify-center text-white mb-6 transition-transform group-hover:scale-110 ${role.color}`}>
                  <role.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-mainText mb-2">{role.name}</h3>
                <span className="flex items-center gap-1 text-sm font-medium text-mutedText group-hover:text-primary-blue transition mt-auto pt-4">
                  Launch <Play className="h-3 w-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
