import React from 'react';
import './globals.css';

import { DemoToggle } from '@/components/ui/DemoToggle';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <DemoToggle />
      </body>
    </html>
  );
}
