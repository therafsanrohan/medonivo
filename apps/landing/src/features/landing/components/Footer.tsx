import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Activity className="h-6 w-6 text-primary-blue" />
            <span className="text-xl font-bold text-mainText">Medonivo</span>
          </Link>
          <p className="text-sm text-mutedText max-w-xs">
            From doctor's advice to completed care. The modern healthcare and care-continuity platform.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-mainText mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-mutedText">
            <li><Link to="#careloop" className="hover:text-primary-blue">CareLoop</Link></li>
            <li><Link to="#features" className="hover:text-primary-blue">Features</Link></li>
            <li><Link to="#doctors" className="hover:text-primary-blue">For Doctors</Link></li>
            <li><Link to="#organizations" className="hover:text-primary-blue">For Organizations</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-mainText mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-mutedText">
            <li><Link to="#" className="hover:text-primary-blue">About Us</Link></li>
            <li><Link to="#" className="hover:text-primary-blue">Careers</Link></li>
            <li><Link to="#" className="hover:text-primary-blue">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-mainText mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-mutedText">
            <li><Link to="#" className="hover:text-primary-blue">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-primary-blue">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-12 pt-8 border-t border-gray-100 text-sm text-mutedText flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Medonivo. All rights reserved.</p>
      </div>
    </footer>
  );
}
