import React from 'react';
import { Link } from 'react-router-dom';
import { Play, User, Stethoscope, Building2, ShieldEllipsis } from 'lucide-react';

export function DemoGatewaySection() {
  const roles = [
    { name: 'Patient Demo', icon: User, color: 'bg-primary-blue', route: '/demo?role=patient' },
    { name: 'Doctor Demo', icon: Stethoscope, color: 'bg-teal-600', route: '/demo?role=doctor' },
    { name: 'Medical Organization Demo', icon: Building2, color: 'bg-indigo-600', route: '/demo?role=org' },
    { name: 'Admin Demo', icon: ShieldEllipsis, color: 'bg-gray-800', route: '/demo?role=admin' },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100 text-center">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-mainText sm:text-4xl mb-4">
          Experience Medonivo
        </h2>
        <p className="text-lg text-mutedText mb-12 max-w-2xl mx-auto">
          Explore the platform from every perspective. Choose a role below to launch an interactive product demo.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {roles.map((role) => (
            <Link 
              key={role.name}
              to={role.route}
              className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-300 hover:bg-gray-100 transition group"
            >
              <div className={`h-16 w-16 rounded-full flex items-center justify-center text-white mb-6 transition-transform group-hover:scale-110 ${role.color}`}>
                <role.icon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-mainText mb-2">{role.name}</h3>
              <span className="flex items-center gap-1 text-sm font-medium text-mutedText group-hover:text-primary-blue transition">
                Launch <Play className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
