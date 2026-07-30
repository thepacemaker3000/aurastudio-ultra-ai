import React, { useState } from 'react';
import { Check, Sparkles, Zap, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface PricingTableProps {
  lang: Language;
  onSelectPlan?: (planId: string) => void;
}

export const PricingTable: React.FC<PricingTableProps> = ({ lang, onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      id: 'free',
      name: 'Starter Trial',
      nameAr: 'التجربة المجانية',
      priceMonthly: 0,
      priceAnnual: 0,
      desc: 'Perfect for trying 8K face-lock studio headshots with 3 free renders.',
      descAr: 'مثالية لتجربة توليد 3 صور استوديو بدقة 8K مع ثبات الوجه.',
      badge: 'Free',
      badgeAr: 'مجاناً',
      isPopular: false,
      features: [
        '3 High-Res AI Headshots (8K)',
        'Standard Face Lock Precision (98%)',
        'US & UK Passport Photo Spec',
        'Basic AI Resume Summary',
        'Personal Usage License',
      ],
      featuresAr: [
        'توليد 3 صور بورتريه بدقة 8K',
        'دقة ثبات معالم الوجه (98%)',
        'مواصفات صور الجواز الأمريكي والبريطاني',
        'ملخص السيرة الذاتية التلقائي',
        'ترخيص للاستخدام الشخصي',
      ],
    },
    {
      id: 'pro',
      name: 'Executive Pro',
      nameAr: 'الباقة التنفيذية Pro',
      priceMonthly: 29,
      priceAnnual: 22,
      desc: 'The complete AI branding suite for executives, founders, & professionals.',
      descAr: 'المجموعة الكاملة للعلامة الشخصية للمدراء، المؤسسين والمهنيين.',
      badge: 'Most Popular',
      badgeAr: 'الأكثر طلباً',
      isPopular: true,
      features: [
        '50 Ultra-Fidelity 8K AI Headshots / mo',
        'Ultra Face Lock Precision (99.8%)',
        'All 40+ Official Passport & Visa Specs',
        'Full Executive Brand Kit & Signature HTML',
        'Prioritized Fast AI Generation Queue (2x)',
        'Full Commercial Royalty-Free License',
      ],
      featuresAr: [
        '50 صورة بورتريه فائقة الدقة 8K شهرياً',
        'دقة ثبات وتأكيد الهوية للوجه (99.8%)',
        'جميع مواصفات الفيزا والجوازات العالمية (40+ دولة)',
        'حزمة العلامة الشخصية وتوقيع البريد التفاعلي',
        'أولوية المعالجة الفائقة في طابور الذكاء الاصطناعي',
        'ترخيص تجاري كامل للاستخدام التجاري والمؤسسي',
      ],
    },
    {
      id: 'enterprise',
      name: 'Corporate Enterprise',
      nameAr: 'باقة الشركات والمؤسسات',
      priceMonthly: 99,
      priceAnnual: 79,
      desc: 'For HR teams, law firms, & enterprises standardizing team headshots.',
      descAr: 'فرق الموارد البشرية، شركات المحاماة والشركات لتوحيد صور الفريق.',
      badge: 'Team Scale',
      badgeAr: 'لفرق العمل',
      isPopular: false,
      features: [
        '250 Team Headshots / mo + Dedicated Support',
        'Custom Fine-Tuned Company Style Lock',
        'Bulk Batch Passport Printing Grid',
        'Admin Portal & Multi-Member Access',
        'Dedicated GPU Cluster (Instant Generation)',
        'SLA 99.9% Uptime & Custom Billing',
      ],
      featuresAr: [
        '250 صورة بورتريه للفريق شهرياً + دعم مخصص',
        'تدريب وتخصيص نمط بصري خاص بالشركة',
        'شبكة طباعة جوازات السفر الجماعية',
        'لوحة تحكم الإدارة وصلاحيات الفريق',
        'سيرفرات GPU مخصصة (توليد فوري)',
        'اتفاقية مستوى الخدمة SLA 99.9% وفواتير مخصصة',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-100">
      
      {/* Title Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>{lang === 'ar' ? 'خطط أسعار بسيطة بدون تعقيد' : 'Transparent Enterprise SaaS Pricing'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {lang === 'ar' ? 'اختر الباقة المناسبة للارتقاء بحضورك المهني' : 'Invest in Your Professional Executive Presence'}
        </h2>

        <p className="text-sm text-slate-400">
          {lang === 'ar'
            ? 'احصل على صور استوديو بدقة 8K مع ثبات كلي للوجه وتوقيع إلكتروني احترافي خلال ثوانٍ.'
            : 'Get studio-grade 8K headshots with 99.8% face lock, official passport compliance, and brand kits in seconds.'}
        </p>

        {/* Billing Cycle Toggle */}
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'الدفع الشهري' : 'Monthly Billing'}
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{lang === 'ar' ? 'الدفع السنوي' : 'Annual Billing'}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30">
              {lang === 'ar' ? 'خصم 25%' : 'SAVE 25%'}
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? 'bg-slate-900 border-2 border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.25)] scale-105 z-10'
                  : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-xl'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 border border-indigo-400 text-white text-[11px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{lang === 'ar' ? plan.badgeAr : plan.badge}</span>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    {lang === 'ar' ? plan.nameAr : plan.name}
                  </h3>
                  <p className="text-xs text-slate-400 min-h-[32px]">
                    {lang === 'ar' ? plan.descAr : plan.desc}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 pt-2 border-t border-slate-800">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">${price}</span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {price === 0
                      ? (lang === 'ar' ? '/ للأبد' : '/ forever')
                      : (lang === 'ar' ? '/ شهرياً' : '/ month')}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  {(lang === 'ar' ? plan.featuresAr : plan.features).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onSelectPlan && onSelectPlan(plan.id)}
                  className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                    plan.isPopular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span>{lang === 'ar' ? 'ابدأ مع هذه الباقة' : 'Get Started Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
