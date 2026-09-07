'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Stethoscope, Building2, Sparkles, X, RotateCcw } from 'lucide-react';

export function DemoToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const router = useRouter();

  // Read the cookie on mount to set initial state
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const demoCookie = cookies.find((c) => c.trim().startsWith('medonivo_demo_role='));
    if (demoCookie) {
      setCurrentRole(demoCookie.split('=')[1]);
    }
  }, []);

  const handleRoleSelect = (role: string, path: string) => {
    // Set cookie that expires in 1 day
    document.cookie = `medonivo_demo_role=${role}; path=/; max-age=86400`;
    setCurrentRole(role);
    setIsOpen(false);
    
    // Hard navigate to trigger middleware
    window.location.href = path;
  };

  const handleClearDemo = () => {
    // Expire cookie immediately
    document.cookie = 'medonivo_demo_role=; path=/; max-age=0';
    setCurrentRole(null);
    setIsOpen(false);
    window.location.href = '/';
  };

  // Only show in development or if specifically enabled via env
  if (process.env.NODE_ENV !== 'development' && process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE !== 'true') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {isOpen && (
        <div className="absolute bottom-14 right-0 mb-2 w-60 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden transform origin-bottom-right transition-all duration-200">
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-400" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Demo Switcher
              </h4>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="p-2 space-y-1.5">
            <button 
              onClick={() => handleRoleSelect('patient', '/patient')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentRole === 'patient' 
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <User className="h-4 w-4 text-sky-400 flex-shrink-0" />
              <span>Patient Portal</span>
            </button>
            <button 
              onClick={() => handleRoleSelect('doctor', '/doctor')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentRole === 'doctor' 
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Stethoscope className="h-4 w-4 text-teal-400 flex-shrink-0" />
              <span>Doctor Workspace</span>
            </button>
            <button 
              onClick={() => handleRoleSelect('medical', '/medical')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentRole === 'medical' 
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Building2 className="h-4 w-4 text-indigo-400 flex-shrink-0" />
              <span>Medical Admin</span>
            </button>
          </div>
          
          <div className="p-2 border-t border-slate-800 bg-slate-950/40">
            <button 
              onClick={handleClearDemo}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-slate-800 transition-all active:scale-95 border border-slate-700/80 group"
        title="Toggle Demo Mode"
      >
        <Sparkles className="h-5 w-5 text-sky-400 group-hover:rotate-12 transition-transform duration-200" />
      </button>
    </div>
  );
}
