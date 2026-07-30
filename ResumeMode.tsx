import React, { useState } from 'react';
import { FileText, Sparkles, CheckCircle2, ArrowRight, RefreshCw, Briefcase, Award } from 'lucide-react';
import { Language, ResumeAnalysis } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ResumeModeProps {
  lang: Language;
}

export const ResumeMode: React.FC<ResumeModeProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [cvText, setCvText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);

  const sampleCV = `FAHAD AL-MANSOORI
Senior Vice President & Chief Digital Officer | 14+ Years Leadership
Extensive background leading enterprise digital transformation, cloud architecture, and multi-million dollar technology investments across MENA and international markets. Proven track record in C-suite strategic advisory, scaling cross-functional AI engineering teams, and optimizing corporate governance.
Key Competencies: Digital Innovation, Executive Strategy, Cloud Infrastructure, AI Product Delivery.`;

  const handleAnalyzeCV = async () => {
    const textToProcess = cvText.trim() || sampleCV;
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/resume-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText: textToProcess, lang }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setAnalysisResult(json.data);
      }
    } catch (err) {
      console.error('Failed to parse CV:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{t.resumeTitle}</h1>
            <p className="text-xs text-slate-400">{t.resumeSubtitle}</p>
          </div>
        </div>

        {/* CV Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-800">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {lang === 'ar' ? 'نص السيرة الذاتية أو نبذة LinkedIn:' : 'CV Text / LinkedIn Overview:'}
              </label>
              <button
                onClick={() => setCvText(sampleCV)}
                className="text-[11px] text-indigo-400 hover:underline font-medium"
              >
                {lang === 'ar' ? 'تحميل مثال سيرة ذاتية تنفذية' : 'Load Executive Sample CV'}
              </button>
            </div>

            <textarea
              rows={8}
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder={t.pasteCvPlaceholder}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />

            <button
              onClick={handleAnalyzeCV}
              disabled={isAnalyzing}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{lang === 'ar' ? 'جاري تحليل السيرة الذاتية بـ Gemini 3.6...' : 'Analyzing CV with Gemini 3.6 Flash...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t.analyzeCvBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* Analysis & Recipe Output */}
          <div className="lg:col-span-6">
            {analysisResult ? (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {t.parsedResultTitle}
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                    Verified Match
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-slate-400">{lang === 'ar' ? 'الاسم المستخلص والدور:' : 'Candidate Role:'}</span>
                    <h3 className="text-base font-bold text-white">{analysisResult.candidateName}</h3>
                    <p className="text-xs text-indigo-300 font-semibold">{analysisResult.parsedRole}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-xs bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300">
                      🏢 {analysisResult.industry}
                    </span>
                    <span className="text-xs bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300">
                      ⭐ {analysisResult.experienceLevel}
                    </span>
                  </div>

                  {/* Recommended Headshot Recipes */}
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-bold text-slate-300">{lang === 'ar' ? 'الوصفة والتوصية المقترحة للصور:' : 'Recommended Headshot Recipe:'}</p>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
                      <p>👔 <strong className="text-white">{lang === 'ar' ? 'الزي المناسب:' : 'Outfit:'}</strong> {analysisResult.recommendedOutfit}</p>
                      <p>🌆 <strong className="text-white">{lang === 'ar' ? 'الخلفية الموصى بها:' : 'Background:'}</strong> {analysisResult.recommendedBackground}</p>
                      <p>💡 <strong className="text-white">{lang === 'ar' ? 'نصيحة لينكد إن:' : 'LinkedIn Headline Tip:'}</strong> {analysisResult.linkedinBioTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-800 rounded-2xl text-center space-y-3 bg-slate-950/40">
                <Briefcase className="w-10 h-10 text-slate-600 animate-pulse" />
                <p className="text-xs font-semibold text-slate-400">
                  {lang === 'ar'
                    ? 'قم بلصق سيرة ذاتية وانقر على "تحليل السيرة الذاتية" لاقتراح أنماط الصور المناسبة لمجالك المهني.'
                    : 'Paste a CV and click "Analyze Resume" to let Gemini deduce your career recipe.'}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
