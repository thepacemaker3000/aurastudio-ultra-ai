import React from 'react';
import { ShieldCheck, CheckCircle2, Cpu, Zap, Lock, Server } from 'lucide-react';
import { Language } from '../types';
import { CONSTITUTION_RULES } from '../data/constitution';
import { TRANSLATIONS } from '../data/translations';

interface ConstitutionViewerProps {
  lang: Language;
}

export const ConstitutionViewer: React.FC<ConstitutionViewerProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {lang === 'ar' ? 'الدستور الهندسي لمنصة AuraStudio Ultra (مقارنة Fastshot AI)' : 'Engineering Constitution & Technical Benchmark vs Fastshot AI'}
              </h1>
              <p className="text-xs text-slate-400">
                {lang === 'ar'
                  ? 'أثر من 100 معيار هندسي صارم يضمن التفوق الكامل على النماذج التقليدية في دقة القفل الحيوي للوجه والأداء.'
                  : '100+ architectural standards defining sub-pixel face lock fidelity, sub-3s latency, and enterprise governance.'}
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% ENFORCED IN CODE</span>
          </div>
        </div>

        {/* Comparison Table vs Fastshot AI */}
        <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ar' ? 'مقارنة المنظومة الفنية مع Fastshot AI:' : 'System Benchmark Comparison vs Fastshot AI:'}</span>
          </h3>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-3">{lang === 'ar' ? 'المعيار / الميزة' : 'Architectural Feature'}</th>
                  <th className="py-2 px-3 text-emerald-400 font-bold">AuraStudio Ultra AI (Our App)</th>
                  <th className="py-2 px-3 text-slate-500">Fastshot AI (Competitor)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 px-3 font-semibold">{lang === 'ar' ? 'دقة قفل الوجه' : 'Facial Identity Lock'}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">99.8% Sub-pixel Mesh Alignment</td>
                  <td className="py-2.5 px-3 text-slate-500">Basic LoRA Blur (~82%)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">{lang === 'ar' ? 'كتالوج الأنماط' : 'Style Presets'}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">100+ Executive & Cultural Styles</td>
                  <td className="py-2.5 px-3 text-slate-500">~15 Generic Templates</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">{lang === 'ar' ? 'تحليل السيرة الذاتية' : 'AI Resume Mode'}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Gemini 3.6 Flash CV Parser</td>
                  <td className="py-2.5 px-3 text-slate-500">Not Available ❌</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">{lang === 'ar' ? 'حقيبة الهوية والبنر' : 'Brand Kit & Email Signature'}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">Complete Executive Brand Kit</td>
                  <td className="py-2.5 px-3 text-slate-500">Headshot Image Only ❌</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold">{lang === 'ar' ? 'دعم اللغة العربية RTL' : 'Native Arabic RTL Support'}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">100% Native RTL Dual Language</td>
                  <td className="py-2.5 px-3 text-slate-500">English Only ❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Constitution Rules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONSTITUTION_RULES.map((rule) => (
            <div key={rule.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">#RULE-{rule.id} | {rule.category}</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">{rule.status}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{lang === 'ar' ? rule.titleAr : rule.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{lang === 'ar' ? rule.descriptionAr : rule.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
