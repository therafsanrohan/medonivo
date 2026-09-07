'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
        <div className="absolute bottom-14 right-0 mb-2 w-56 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden transform origin-bottom-right transition-all duration-200">
          <div className="p-3 border-b border-slate-800 bg-slate-900/50">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider text-center">
              Demo Switcher
            </h4>
          </div>
          
          <div className="p-2 space-y-1">
            <button 
              onClick={() => handleRoleSelect('patient', '/patient')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRole === 'patient' 
                  ? 'bg-sky-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              👩‍⚕️ Login as Patient
            </button>
            <button 
              onClick={() => handleRoleSelect('doctor', '/doctor')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRole === 'doctor' 
                  ? 'bg-sky-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              🩺 Login as Doctor
            </button>
            <button 
              onClick={() => handleRoleSelect('medical', '/medical')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRole === 'medical' 
                  ? 'bg-sky-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              🏢 Login as Admin
            </button>
          </div>
          
          <div className="p-2 border-t border-slate-800">
            <button 
              onClick={handleClearDemo}
              className="w-full text-center px-3 py-2 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              Clear Demo State
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all active:scale-95 border-2 border-slate-700 group"
        title="Toggle Demo Mode"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform duration-200">
          🎮
        </span>
      </button>
    </div>
  );
}
