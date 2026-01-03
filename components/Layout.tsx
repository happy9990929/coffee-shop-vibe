
import React from 'react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
  cartCount: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, cartCount }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onViewChange(AppView.Home)}
          >
            <div className="w-10 h-10 starbucks-green rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-serif text-xl">A</span>
            </div>
            <h1 className="text-xl font-serif starbucks-text-green font-bold tracking-tight">AROMA AI</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onViewChange(AppView.Menu)}
              className={`text-sm font-semibold hover:text-green-800 transition-colors ${activeView === AppView.Menu ? 'starbucks-text-green underline underline-offset-8' : 'text-slate-600'}`}
            >
              MENU
            </button>
            <button 
              onClick={() => onViewChange(AppView.Checkout)}
              className="relative p-2 text-slate-600 hover:text-green-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-serif text-lg mb-4">Aroma AI Café</h3>
            <p className="text-sm leading-relaxed">
              Crafting premium coffee experiences powered by intelligent recommendations since 2024.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onViewChange(AppView.Home)} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => onViewChange(AppView.Menu)} className="hover:text-white transition-colors">Our Menu</button></li>
              <li><button className="hover:text-white transition-colors">Locations</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Contact</h4>
            <p className="text-sm">hello@aroma-ai.cafe</p>
            <p className="text-sm mt-2">123 Brew Avenue, Coffee City</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-xs text-center">
          &copy; 2024 Aroma AI Café. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
