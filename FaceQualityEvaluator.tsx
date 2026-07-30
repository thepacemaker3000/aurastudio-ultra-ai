import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Camera,
  Eye,
  Smile,
  ShieldAlert,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FaceQualityEvaluatorProps {
  lang: Language;
  onSelectPhotoForStudio?: (imageUrl: string) => void;
}

export interface BiometricEvaluation {
  overallScore: number; // e.g. 96
  smileScore: number; // e.g. 92
  eyeContactScore: number; // e.g. 98
  executivePresenceScore: number; // e.g. 97
  lightingScore: number; // e.g. 89
  skinFidelityScore: number; // e.g. 95
  expressionVerdict: string;
  expressionVerdictAr: string;
  recommendations: string[];
  recommendationsAr: string[];
  recommendedStyle: string;
}

export const FaceQualityEvaluator: React.FC<FaceQualityEvaluatorProps> = ({
  lang,
  onSelectPhotoForStudio,
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedImage, setSelectedImage] = useState<string>(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'
  );
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<BiometricEvaluation | null>({
    overallScore: 96,
    smileScore: 94,
    eyeContactScore: 98,
    executivePresenceScore: 97,
    lightingScore: 91,
    skinFidelityScore: 99,
    expressionVerdict: 'High-Authority Executive Alignment',
    expressionVerdictAr: 'تطابق جودة قيادي رفيع المستوى بوقار عالي',
    recommendations: [
      'Facial symmetry is within top 2% of executive portrait standards.',
      'Eye focus is direct, conveying strong trust and boardroom confidence.',
      'Slight Rembrandt key lighting detected; 8K upscaling will amplify jawline definition.',
    ],
    recommendationsAr: [
      'تناسق معالم الوجه يدخل ضمن أعلى 2% من معايير البورتريه التنفيذي العالمية.',
      'تركيز العينين مباشر ويعكس موثوقية عالية وثقة قيادية.',
      'إضاءة ريمبرانت الجانبية متاحة؛ الترقية بدقة 8K ستزيد تحدد زاوية الفك بصورة مذهلة.',
    ],
    recommendedStyle: 'ceo-fortune-500',
  });

  const samplePhotos = [
    {
      name: 'Executive Male',
      url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Tech Founder Female',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Corporate Partner',
      url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Creative Leader',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleRunEvaluation = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/face-quality-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: selectedImage, lang }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setEvaluation(json.data);
      }
    } catch (e) {
      console.error('Face quality eval failed:', e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const renderMeter = (label: string, labelAr: string, score: number, icon: any) => {
    const IconComponent = icon;
    return (
      <div className="space-y-1 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-bold text-slate-300">
            <IconComponent className="w-3.5 h-3.5 text-indigo-400" />
            <span>{lang === 'ar' ? labelAr : label}</span>
          </span>
          <span className="font-extrabold text-indigo-300">{score}%</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800/60">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              score >= 90
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                : score >= 75
                ? 'bg-gradient-to-r from-indigo-500 to-blue-400'
                : 'bg-gradient-to-r from-amber-500 to-orange-400'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {lang === 'ar' ? 'مقياس جودة الوجه والتحليل الحيوي AI Face Quality Score' : 'AI Face Quality Score & Biometric Evaluation'}
              </h1>
              <p className="text-xs text-slate-400">
                {lang === 'ar'
                  ? 'تقييم دقيق لنسبة الابتسامة، التواصل البصري، الثقة التنفيذية، وجودة الإضاءة قبل التوليد.'
                  : 'Pre-generation biometric grading quantifying smile warmth, eye contact angle, executive look & lighting posture.'}
              </p>
            </div>
          </div>

          {evaluation && (
            <div className="px-4 py-2 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center gap-3 shadow-lg">
              <span className="text-xs text-slate-400 font-semibold">{lang === 'ar' ? 'الدرجة الكلية:' : 'Overall Rating:'}</span>
              <span className="text-2xl font-extrabold text-emerald-400">{evaluation.overallScore}/100</span>
            </div>
          )}
        </div>

        {/* Image Selection & Radar Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-800">
          
          {/* Left Column: Image Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-indigo-500/40 bg-slate-950 shadow-2xl group">
              <img src={selectedImage} alt="Evaluated Subject" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ar' ? 'تم الفحص الحيوي' : 'Biometric Scanned'}</span>
                </span>
                <button
                  onClick={handleRunEvaluation}
                  disabled={isEvaluating}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isEvaluating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5 text-amber-300" />}
                  <span>{lang === 'ar' ? 'إعادة الفحص' : 'Re-Evaluate'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">{lang === 'ar' ? 'اختر صورة للاختبار الحيوي:' : 'Select Sample Image to Grade:'}</label>
              <div className="grid grid-cols-4 gap-2">
                {samplePhotos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(photo.url)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === photo.url ? 'border-indigo-500 scale-105 shadow-md' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Score Metrics & Recommendations */}
          <div className="lg:col-span-7 space-y-6">
            {evaluation && (
              <>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-400">
                    {lang === 'ar' ? 'التشخيص الحيوي والنمط الموصى به:' : 'AI Verdict & Executive Posture:'}
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    {lang === 'ar' ? evaluation.expressionVerdictAr : evaluation.expressionVerdict}
                  </h3>
                </div>

                {/* Metric Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {renderMeter('Smile Warmth', 'دفء الابتسامة', evaluation.smileScore, Smile)}
                  {renderMeter('Direct Eye Contact', 'التواصل البصري المباشر', evaluation.eyeContactScore, Eye)}
                  {renderMeter('Executive Authority', 'الهيبة والثقة التنفيذية', evaluation.executivePresenceScore, Award)}
                  {renderMeter('Studio Lighting Contrast', 'توازن الإضاءة والظل', evaluation.lightingScore, Camera)}
                </div>

                {/* Actionable Tips List */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'ar' ? 'توصيات الذكاء الاصطناعي لرفع الجودة لأقصى حد:' : 'AI Studio Recommendations Before Generation:'}</span>
                  </h4>

                  <ul className="space-y-2 text-xs text-slate-300">
                    {(lang === 'ar' ? evaluation.recommendationsAr : evaluation.recommendations).map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
