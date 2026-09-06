import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../features/landing/components/Header';
import { Footer } from '../features/landing/components/Footer';

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
