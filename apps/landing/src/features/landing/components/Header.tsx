import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Activity } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary-blue" />
          <span className="text-xl font-bold text-mainText">Medonivo</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-mutedText">
          <Link to="#how-it-works" className="hover:text-primary-blue transition">How It Works</Link>
          <Link to="#careloop" className="hover:text-primary-blue transition">CareLoop</Link>
          <Link to="#features" className="hover:text-primary-blue transition">Features</Link>
          <Link to="#doctors" className="hover:text-primary-blue transition">For Doctors</Link>
          <Link to="#organizations" className="hover:text-primary-blue transition">For Organizations</Link>
          <Link to="#faq" className="hover:text-primary-blue transition">FAQ</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-mainText hover:text-primary-blue transition">Sign In</Link>
          <Link to="/demo" className="rounded-full bg-primary-blue px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">Try Demo</Link>
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
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col space-y-4 p-6 text-sm font-medium">
            <Link to="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
            <Link to="#careloop" onClick={() => setIsMobileMenuOpen(false)}>CareLoop</Link>
            <Link to="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
            <Link to="#doctors" onClick={() => setIsMobileMenuOpen(false)}>For Doctors</Link>
            <Link to="#organizations" onClick={() => setIsMobileMenuOpen(false)}>For Organizations</Link>
            <Link to="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
            <hr />
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
            <Link to="/demo" className="text-primary-blue font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Try Demo</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
