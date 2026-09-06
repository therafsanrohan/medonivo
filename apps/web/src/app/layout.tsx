import React from 'react';
import './globals.css';
import { OrgAuthProvider } from '../context/OrgAuthContext';
import { Sidebar } from '../components/Sidebar';

export const metadata = {
  title: 'Medonivo Hospital Operations Workspace',
  description: 'Multi-branch healthcare organization command center and clinical management hub.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        <OrgAuthProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto">
              {children}
            </main>
          </div>
        </OrgAuthProvider>
      </body>
    </html>
  );
}
