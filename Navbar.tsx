import React from 'react';
import {
  Camera,
  Shirt,
  Image as ImageIcon,
  FileText,
  Briefcase,
  Users,
  User,
  Wand2,
  Video,
  ShieldCheck,
  Activity,
  Sparkles,
  Globe,
  Sun,
  Moon,
  Globe2,
  Award,
  Layers,
  Home,
  Tag,
  BookOpen,
  Mail,
  ChevronDown,
  QrCode,
  Smartphone,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MobileQrModal } from './MobileQrModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  darkMode,
  setDarkMode,
}) => {
  const t = TRANSLATIONS[lang];

  const languages: { code: Language; label: string; flag: string; dir: 'rtl' | 'ltr' }[] = [
    { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'en', label: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'es', label: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  ];

  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = React.useState(false);
  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  const navItems = [
    { id: 'landing', label: lang === 'ar' ? 'الرئيسية والمنصة' : lang === 'fr' ? 'Accueil & SaaS' : lang === 'es' ? 'Inicio y Plataforma' : lang === 'de' ? 'Startseite' : 'Overview & SaaS', icon: Home, badge: 'Phase 1' },
    { id: 'user-dashboard', label: lang === 'ar' ? 'لوحة المستخدم' : lang === 'fr' ? 'Tableau de bord' : lang === 'es' ? 'Panel de Usuario' : lang === 'de' ? 'Benutzer-Dashboard' : 'User Dashboard', icon: User, badge: 'SaaS' },
    { id: 'studio', label: t.studioTab, icon: Camera },
    { id: 'pricing', label: lang === 'ar' ? 'الأسعار والاشتراكات' : lang === 'fr' ? 'Tarifs & Abonnements' : lang === 'es' ? 'Precios y Planes' : lang === 'de' ? 'Preise & Tarife' : 'Pricing & Plans', icon: Tag, badge: 'Pro $22' },
    { id: 'history', label: lang === 'ar' ? 'المفضلة والسجل' : lang === 'fr' ? 'Bibliothèque' : lang === 'es' ? 'Biblioteca' : lang === 'de' ? 'Bibliothek' : 'Favorites & Library', icon: Layers, badge: '8K' },
    { id: 'passport', label: lang === 'ar' ? 'الجوازات والفيزا' : lang === 'fr' ? 'Passeport & Visa' : lang === 'es' ? 'Pasaporte y Visa' : lang === 'de' ? 'Pass & Visum' : 'Passport & Visa', icon: Globe2, badge: 'Official' },
    { id: 'face-quality', label: lang === 'ar' ? 'جودة الوجه' : lang === 'fr' ? 'Qualité Visage' : lang === 'es' ? 'Calidad Facial' : lang === 'de' ? 'Gesichtsqualität' : 'Face Score', icon: Award, badge: '98%' },
    { id: 'outfits', label: t.outfitsTab, icon: Shirt },
    { id: 'backgrounds', label: t.backgroundsTab, icon: ImageIcon },
    { id: 'resume', label: t.resumeTab, icon: FileText, badge: 'AI' },
    { id: 'branding', label: t.brandingTab, icon: Briefcase },
    { id: 'blog', label: lang === 'ar' ? 'المدونة والإرشادات' : lang === 'fr' ? 'Blog & Guides' : lang === 'es' ? 'Blog y Guías' : lang === 'de' ? 'Blog & Anleitungen' : 'Blog & Guides', icon: BookOpen },
    { id: 'contact', label: lang === 'ar' ? 'اتصل بنا والشركات' : lang === 'fr' ? 'Contact & Entreprises' : lang === 'es' ? 'Contacto' : lang === 'de' ? 'Kontakt' : 'Contact & Enterprise', icon: Mail },
    { id: 'team', label: t.teamTab, icon: Users },
    { id: 'admin', label: t.adminTab, icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-slate-800 text-slate-100 shadow-2xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Brand Bar */}
        <div className="flex items-center justify-between h-16 border-b border-slate-800/80">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('studio')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-slate-300 bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full uppercase tracking-wider">
                  Ultra Pro 8K
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Right Header Status & Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-emerald-300 font-medium">{t.modelStatus}</span>
            </div>

            {/* Multi-Language Dropdown Switcher */}
            <div className="relative">
              <button
                id="btn-lang-dropdown"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all shadow-sm"
                title="Select Platform Language"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>{currentLangObj.flag}</span>
                <span>{currentLangObj.label}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl z-50 overflow-hidden py-1.5 text-xs">
                    <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800/80 mb-1">
                      {lang === 'ar' ? 'اختر اللغة / Language' : 'Select Language'}
                    </div>
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left rtl:text-right hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors ${
                          lang === l.code ? 'bg-indigo-600/30 text-indigo-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{l.flag}</span>
                          <span>{l.label}</span>
                        </div>
                        {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile QR Code Button */}
            <button
              id="btn-mobile-qr"
              onClick={() => setIsQrModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all shadow-sm group"
              title={lang === 'ar' ? 'مسح رمز QR للجوال' : 'Mobile QR Code'}
            >
              <QrCode className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">
                {lang === 'ar' ? 'رمز QR للجوال' : 'Mobile QR'}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              id="btn-theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
              title="Toggle Dark / Light Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>
          </div>
        </div>

        {/* Mobile QR Modal */}
        <MobileQrModal
          isOpen={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          lang={lang}
        />

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-md shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 text-[9px] font-bold rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
