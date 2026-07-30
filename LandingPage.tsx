import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  ShieldCheck,
  Zap,
  Globe2,
  Award,
  ArrowRight,
  Layers,
  Shirt,
  Image as ImageIcon,
  CheckCircle2,
  Star,
  Users,
  Building,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Language } from '../types';
import { PricingTable } from './PricingTable';
import { ShowcaseGallery } from './ShowcaseGallery';
import { BlogSection } from './BlogSection';

interface LandingPageProps {
  lang: Language;
  onOpenStudio: () => void;
  onOpenAuth: () => void;
  onSelectPlan: (planId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  lang,
  onOpenStudio,
  onOpenAuth,
  onSelectPlan,
}) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const stats = [
    { num: '500,000+', label: '8K Headshots Rendered', labelAr: 'صورة بورتريه تم توليدها' },
    { num: '99.85%', label: 'Face Lock Precision', labelAr: 'دقة ثبات وتطابق الوجه' },
    { num: '40+', label: 'Passport & Visa Specs', labelAr: 'دولة تدعم معايير الجوازات' },
    { num: '1,200+', label: 'Enterprise Teams', labelAr: 'شركة ومؤسسة تعتمد المنصة' },
  ];

  const faqs = [
    {
      q: 'How does AuraStudio AI maintain my exact face lock identity?',
      qAr: 'كيف تضمن المنصة الحفاظ على ملامح وجهي الحقيقية بنسبة 99.8%؟',
      a: 'AuraStudio AI uses a biometrically tuned 3D facial feature extractor that locks 128 facial landmark vectors before generating lighting, hair, or outfits. Your facial identity is preserved, not morphed.',
      aAr: 'تستخدم المنصة نظام استخراج المعالم ثلاثي الأبعاد لتثبيت 128 نقطة حيوية في الوجه قبل تطبيق الإضاءة والبدلات، مما يحفظ الهوية الحقيقية دون تشويه.',
    },
    {
      q: 'Are these headshots accepted for official US/UK/Schengen Passports?',
      qAr: 'هل الصور معتمدة رسمياً للفيزا وجوازات السفر الأمريكية والشنغن؟',
      a: 'Yes. Our Passport Engine strictly normalizes white backgrounds, enforces eye-height ratios, and removes shadows according to official state department regulations.',
      aAr: 'نعم. يقوم محرك الجوازات بتعديل نسبة ارتفاع العينين وضبط خلفيات البيضاء النقية ومنع الوهج طبقاً لمعايير وزارات الخارجية الرسمية.',
    },
    {
      q: 'Do I own full commercial rights to my generated 8K portraits?',
      qAr: 'هل أمتلك حقوق الاستخدام التجاري الكاملة للصور الناتجة؟',
      a: 'Yes. All rendered headshots in Pro and Enterprise plans come with a 100% royalty-free, perpetual commercial usage license for LinkedIn, press releases, corporate websites, and billboards.',
      aAr: 'نعم. تمنحك جميع الباقات رخصة استخدام تجاري كاملة وبدون حقوق ملكية لاستخدام الصور في LinkedIn والمواقع والمطبوعات الإعلانية.',
    },
  ];

  return (
    <div className="space-y-20 pb-16 text-slate-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 text-center">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900 border border-indigo-500/30 shadow-xl backdrop-blur-md">
            <span className="p-1 rounded-full bg-indigo-600/30 text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-extrabold text-indigo-300">
              {lang === 'ar' ? 'منصة الذكاء الاصطناعي الأولى للصور التنفيذية الهوية 8K' : 'AuraStudio AI 2.0 — Executive 8K Portrait & Branding SaaS'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-5xl mx-auto">
            {lang === 'ar' ? (
              <span>حول صور السيلفي العادية إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">بورتريه تنفيذي بدقة 8K</span> متطابق مع ملامحك 100%</span>
            ) : (
              <span>Transform Smartphone Selfies into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">C-Suite 8K Executive Portraits</span></span>
            )}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'احصل على صور استوديو بدقة 8K، صور جوازات معتمدة رسمياً، توقيع إلكتروني تفاعلي، وتحليل جودة الوجه خلال ثوانٍ معدودة.'
              : 'The enterprise AI headshots platform with 99.85% face-lock fidelity, official passport compliance, AI resume parsing, and team branding kits.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenStudio}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-[0_0_35px_rgba(99,102,241,0.4)] flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
            >
              <Camera className="w-5 h-5" />
              <span>{lang === 'ar' ? 'افتح استوديو التوليد الآن' : 'Launch 8K Headshot Studio'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenAuth}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Users className="w-5 h-5 text-indigo-400" />
              <span>{lang === 'ar' ? 'إنشاء حساب Pro مجاني' : 'Sign In / Create Account'}</span>
            </button>
          </div>

          {/* Key Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'توليد 3 صور مجانية فوراً' : '3 Free Trial Headshots Included'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'ثبات معالم الوجه 99.85%' : '99.85% Biometric Face Lock'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'لا يتطلب بطاقة ائتمان للتجربة' : 'No Credit Card Required'}</span>
            </span>
          </div>

        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-md">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center space-y-1">
              <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono">{s.num}</span>
              <p className="text-xs text-slate-400 font-semibold">
                {lang === 'ar' ? s.labelAr : s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Gallery */}
      <ShowcaseGallery lang={lang} onTryStyleInStudio={onOpenStudio} />

      {/* Pricing Matrix */}
      <PricingTable lang={lang} onSelectPlan={onSelectPlan} />

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">
            {lang === 'ar' ? 'الأسئلة الشائعة حول المنصة' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'ar' ? 'إليك كل ما تحتاجه للبدء في استخدام منصة AuraStudio AI.' : 'Everything you need to know about our biometric face lock, licenses, and official specifications.'}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-all"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:bg-slate-800/50 transition-colors"
                >
                  <span>{lang === 'ar' ? faq.qAr : faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs text-slate-400 border-t border-slate-800/50 leading-relaxed">
                    {lang === 'ar' ? faq.aAr : faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Blog & Knowledge Base */}
      <BlogSection lang={lang} />

      {/* Footer CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {lang === 'ar' ? 'جاهز للارتقاء بهويتك وعلامتك الشخصية؟' : 'Ready to Elevate Your Executive Persona?'}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200">
              {lang === 'ar'
                ? 'انضم إلى أكثر من 1,200 شركة ومؤسسة تثق بـ AuraStudio AI للحصول على صور استوديو بدقة 8K.'
                : 'Join over 500,000 professionals using AuraStudio AI for instant 8K headshots and official biometric passport photos.'}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenStudio}
              className="px-8 py-3.5 rounded-xl bg-white text-indigo-950 font-extrabold text-xs shadow-2xl hover:bg-slate-100 transition-all"
            >
              {lang === 'ar' ? 'ابدأ تجربة الاستوديو المجانية' : 'Start Free Studio Trial'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
