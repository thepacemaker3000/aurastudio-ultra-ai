import React, { useState } from 'react';
import { Briefcase, Sparkles, Copy, Download, Check, ExternalLink, Mail, Palette } from 'lucide-react';
import { Language, BrandKit } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface BrandingKitStudioProps {
  lang: Language;
  initialHeadshotUrl?: string;
}

export const BrandingKitStudio: React.FC<BrandingKitStudioProps> = ({
  lang,
  initialHeadshotUrl,
}) => {
  const t = TRANSLATIONS[lang];

  const [fullName, setFullName] = useState<string>('FAHAD AL-MANSOORI');
  const [jobTitle, setJobTitle] = useState<string>('Chief Executive Officer & Board Director');
  const [companyName, setCompanyName] = useState<string>('Aura Capital & Global Advisory');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedSig, setCopiedSig] = useState<boolean>(false);

  const [brandKit, setBrandKit] = useState<BrandKit | null>({
    id: 'bk-default',
    fullName: 'FAHAD AL-MANSOORI',
    jobTitle: 'Chief Executive Officer & Board Director',
    companyName: 'Aura Capital & Global Advisory',
    headshotUrl: initialHeadshotUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    avatarUrl: initialHeadshotUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    brandColors: ['#0F172A', '#1E293B', '#3B82F6', '#6366F1', '#F8FAFC'],
    typographyPairing: 'Playfair Display + Plus Jakarta Sans',
    tagline: 'Transforming Enterprise Value & Leading High-Impact Growth',
    taglineAr: 'تحويل القيمة التنافسية للشركات وقيادة النمو الاستراتيجي المستدام',
    emailSignatureHtml: `<div style="font-family: sans-serif; padding: 16px; border-left: 4px solid #3B82F6; background: #ffffff; color: #0F172A;">
  <h3 style="margin: 0; font-size: 18px; font-weight: 700;">FAHAD AL-MANSOORI</h3>
  <p style="margin: 2px 0; color: #3B82F6; font-size: 13px; font-weight: 600;">CEO & Board Director | Aura Capital</p>
  <p style="margin: 4px 0; font-size: 12px; color: #64748B;">Transforming Enterprise Value & Leading High-Impact Growth</p>
</div>`,
  });

  const handleGenerateBrandKit = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/brand-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          jobTitle,
          companyName,
          headshotUrl: initialHeadshotUrl || brandKit?.headshotUrl,
          lang,
        }),
      });

      const json = await response.json();
      if (json.success && json.brandKit) {
        setBrandKit(json.brandKit);
      }
    } catch (e) {
      console.error('Brand kit generation error:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSig(true);
    setTimeout(() => setCopiedSig(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{t.brandKitTitle}</h1>
            <p className="text-xs text-slate-400">{t.brandKitSubtitle}</p>
          </div>
        </div>

        {/* Input Form & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-800">
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{lang === 'ar' ? 'الاسم الكامل:' : 'Full Name:'}</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{lang === 'ar' ? 'المسمى الوظيفي:' : 'Job Title:'}</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">{lang === 'ar' ? 'اسم الشركة أو المنظمة:' : 'Company / Enterprise:'}</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleGenerateBrandKit}
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{lang === 'ar' ? 'إنشاء بنر لينكد إن وتوقيع البريد الإلكتروني' : 'Generate LinkedIn Kit & Email Signature'}</span>
            </button>
          </div>

          {/* Rendered Brand Kit Assets */}
          {brandKit && (
            <div className="lg:col-span-7 space-y-6">
              
              {/* LinkedIn Banner Mockup */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{lang === 'ar' ? 'بنر وسائط LinkedIn المعياري:' : 'LinkedIn Executive Banner (1584x396):'}</span>
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-36 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-between shadow-2xl">
                  <div className="space-y-1 max-w-sm">
                    <h3 className="text-lg font-bold text-white">{brandKit.fullName}</h3>
                    <p className="text-xs text-indigo-400 font-semibold">{brandKit.jobTitle}</p>
                    <p className="text-[11px] text-slate-300">{lang === 'ar' ? brandKit.taglineAr : brandKit.tagline}</p>
                  </div>

                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500 shadow-xl shrink-0">
                    <img src={brandKit.headshotUrl} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Email Signature Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{lang === 'ar' ? 'توقيع البريد الإلكتروني (HTML):' : 'HTML Email Signature:'}</span>
                  <button
                    onClick={() => copyToClipboard(brandKit.emailSignatureHtml)}
                    className="flex items-center gap-1 text-[11px] text-indigo-400 hover:underline font-semibold"
                  >
                    {copiedSig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSig ? 'Copied HTML!' : t.copyEmailSig}</span>
                  </button>
                </div>

                <div className="p-4 bg-white rounded-xl text-slate-900 shadow-lg border border-slate-200">
                  <div dangerouslySetInnerHTML={{ __html: brandKit.emailSignatureHtml }} />
                </div>
              </div>

              {/* Color Palette */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{lang === 'ar' ? 'لوحة الألوان المعتمدة:' : 'Personal Brand Swatches:'}</span>
                <div className="flex items-center gap-2">
                  {brandKit.brandColors.map((hex, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: hex }}></span>
                      <span className="text-[11px] font-mono text-slate-300">{hex}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
