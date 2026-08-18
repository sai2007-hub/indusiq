/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { ProcessingModal } from './components/ProcessingModal';
import { ToastContainer } from './components/Toast';

// 10 Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyzeProductPage } from './pages/AnalyzeProductPage';
import { ProductIntelligencePage } from './pages/ProductIntelligencePage';
import { EvidenceCenterPage } from './pages/EvidenceCenterPage';
import { ConflictQueuePage } from './pages/ConflictQueuePage';
import { TrustCenterPage } from './pages/TrustCenterPage';
import { ProductsCatalogPage } from './pages/ProductsCatalogPage';
import { ExportsPage } from './pages/ExportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { Menu, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'analyze':
        return <AnalyzeProductPage />;
      case 'intelligence':
        return <ProductIntelligencePage />;
      case 'evidence':
        return <EvidenceCenterPage />;
      case 'conflicts':
        return <ConflictQueuePage />;
      case 'trust':
        return <TrustCenterPage />;
      case 'products':
        return <ProductsCatalogPage />;
      case 'exports':
        return <ExportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <Navbar />

      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{mobileMenuOpen ? 'Close Navigation' : 'Open Navigation Menu'}</span>
        </button>
        <span className="text-[11px] font-mono font-semibold text-slate-400 capitalize">
          Current: {currentPage}
        </span>
      </div>

      {/* Main Workspace Layout with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        {/* Mobile Slideout Sidebar */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden flex bg-slate-900/70 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-72 h-full bg-slate-900" onClick={(e) => e.stopPropagation()}>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderPage()}</div>
        </main>
      </div>

      {/* Interactive Global Drawers & Modals */}
      <EvidenceDrawer />
      <ProcessingModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
