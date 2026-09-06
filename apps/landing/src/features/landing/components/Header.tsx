import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Activity } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/20 backdrop-blur-2xl shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary-blue" />
          <span className="text-xl font-bold text-mainText">Medonivo</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-mutedText">
          <a href="#how-it-works" className="hover:text-primary-blue transition">How It Works</a>
          <a href="#careloop" className="hover:text-primary-blue transition">CareLoop</a>
          <a href="#features" className="hover:text-primary-blue transition">Features</a>
          <a href="#doctors" className="hover:text-primary-blue transition">For Doctors</a>
          <a href="#organizations" className="hover:text-primary-blue transition">For Organizations</a>
          <a href="#faq" className="hover:text-primary-blue transition">FAQ</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="#demos" className="text-sm font-medium text-mainText hover:text-primary-blue transition">Sign In</a>
          <a href="#demos" className="rounded-full bg-primary-blue px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 hover:scale-105 transition-all shadow-md">Try Demo</a>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Full-Screen Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-3xl shadow-lg h-[calc(100vh-4rem)] flex flex-col justify-between">
          <nav className="flex flex-col space-y-6 p-8 text-lg font-medium text-mainText flex-grow justify-center">
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary-blue transition-colors">How It Works</a>
            <a href="#careloop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary-blue transition-colors">CareLoop</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary-blue transition-colors">Features</a>
            <a href="#doctors" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary-blue transition-colors">For Doctors</a>
            <a href="#organizations" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary-blue transition-colors">For Organizations</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary-blue transition-colors">FAQ</a>
            <hr className="border-gray-200/50 my-4" />
            <a href="#demos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary-blue transition-colors">Sign In</a>
            <a href="#demos" className="text-white bg-primary-blue py-3 rounded-full text-center hover:bg-blue-600 transition-colors mt-4 shadow-lg shadow-primary-blue/30" onClick={() => setIsMobileMenuOpen(false)}>Try Demo</a>
          </nav>
        </div>
      )}
    </header>
  );
}
