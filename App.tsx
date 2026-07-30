import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { PricingTable } from './components/PricingTable';
import { BlogSection } from './components/BlogSection';
import { ContactPage } from './components/ContactPage';
import { AuthModal } from './components/AuthModal';
import { StudioGenerator } from './components/StudioGenerator';
import { OutfitStudio } from './components/OutfitStudio';
import { BackgroundStudio } from './components/BackgroundStudio';
import { ResumeMode } from './components/ResumeMode';
import { BrandingKitStudio } from './components/BrandingKitStudio';
import { TeamPortal } from './components/TeamPortal';
import { PhotoRepairStudio } from './components/PhotoRepairStudio';
import { VideoHeadshotStudio } from './components/VideoHeadshotStudio';
import { ConstitutionViewer } from './components/ConstitutionViewer';
import { AdminPortal } from './components/AdminPortal';
import { UserDashboard } from './components/UserDashboard';
import { PassportStudio } from './components/PassportStudio';
import { FaceQualityEvaluator } from './components/FaceQualityEvaluator';
import { FavoritesHistoryManager } from './components/FavoritesHistoryManager';
import { Language } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/ToastContainer';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const { lang, setLang, darkMode, setDarkMode } = useTheme();
  const [sharedHeadshotUrl, setSharedHeadshotUrl] = useState<string | undefined>(undefined);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Sync RTL / LTR document attributes when language changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Handle handoff from Studio generator to Brand Kit or Video Mode
  const handleBrandKitRequest = (headshotUrl: string) => {
    setSharedHeadshotUrl(headshotUrl);
    setActiveTab('branding');
  };

  const handleVideoRequest = (headshotUrl: string) => {
    setSharedHeadshotUrl(headshotUrl);
    setActiveTab('video');
  };

  const handleSelectPlan = (planId: string) => {
    setIsAuthOpen(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-300`}>
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Tab Content View */}
      <main className="pb-16">
        {activeTab === 'landing' && (
          <LandingPage
            lang={lang}
            onOpenStudio={() => setActiveTab('studio')}
            onOpenAuth={() => setIsAuthOpen(true)}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {activeTab === 'user-dashboard' && <UserDashboard lang={lang} />}

        {activeTab === 'pricing' && (
          <PricingTable
            lang={lang}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {activeTab === 'blog' && <BlogSection lang={lang} />}

        {activeTab === 'contact' && <ContactPage lang={lang} />}

        {activeTab === 'studio' && (
          <StudioGenerator
            lang={lang}
            onBrandKitRequest={handleBrandKitRequest}
            onVideoRequest={handleVideoRequest}
          />
        )}

        {activeTab === 'passport' && <PassportStudio lang={lang} />}

        {activeTab === 'history' && <FavoritesHistoryManager lang={lang} />}

        {activeTab === 'face-quality' && <FaceQualityEvaluator lang={lang} />}

        {activeTab === 'outfits' && <OutfitStudio lang={lang} />}

        {activeTab === 'backgrounds' && <BackgroundStudio lang={lang} />}

        {activeTab === 'resume' && <ResumeMode lang={lang} />}

        {activeTab === 'branding' && (
          <BrandingKitStudio lang={lang} initialHeadshotUrl={sharedHeadshotUrl} />
        )}

        {activeTab === 'team' && <TeamPortal lang={lang} />}

        {activeTab === 'repair' && <PhotoRepairStudio lang={lang} />}

        {activeTab === 'video' && (
          <VideoHeadshotStudio lang={lang} initialHeadshotUrl={sharedHeadshotUrl} />
        )}

        {activeTab === 'constitution' && <ConstitutionViewer lang={lang} />}

        {activeTab === 'admin' && <AdminPortal lang={lang} />}
      </main>

      {/* Global Auth / Checkout Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        lang={lang}
      />

      {/* Global Toast Alerts */}
      <ToastContainer />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} <strong className="text-white">AuraStudio AI SaaS Platform</strong>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>99.85% Face Lock Precision</span>
            <span>•</span>
            <span>PostgreSQL / Supabase Schema Ready</span>
            <span>•</span>
            <span>Stripe Commercial Billing Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
