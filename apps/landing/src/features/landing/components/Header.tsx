import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Activity } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/50 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
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
          <Link to="/login" className="text-sm font-medium text-mainText hover:text-primary-blue transition">Sign In</Link>
          <Link to="/demo" className="rounded-full bg-primary-blue px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 hover:scale-105 transition-all shadow-md">Try Demo</Link>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full left-0 top-[100%] border-t border-white/40 bg-white/95 backdrop-blur-3xl shadow-lg pb-4">
          <nav className="flex flex-col space-y-4 p-6 text-sm font-medium">
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <a href="#careloop" onClick={() => setIsMobileMenuOpen(false)}>CareLoop</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#doctors" onClick={() => setIsMobileMenuOpen(false)}>For Doctors</a>
            <a href="#organizations" onClick={() => setIsMobileMenuOpen(false)}>For Organizations</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <hr className="border-gray-200/50" />
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
            <Link to="/demo" className="text-primary-blue font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Try Demo</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
