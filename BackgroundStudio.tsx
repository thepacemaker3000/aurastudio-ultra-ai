import React, { useState } from 'react';
import { Image as ImageIcon, Sun, Check, Compass, Layers } from 'lucide-react';
import { Language } from '../types';
import { BACKGROUND_PRESETS } from '../data/backgrounds';
import { TRANSLATIONS } from '../data/translations';

interface BackgroundStudioProps {
  lang: Language;
}

export const BackgroundStudio: React.FC<BackgroundStudioProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedBg, setSelectedBg] = useState(BACKGROUND_PRESETS[0]);
  const [blurLevel, setBlurLevel] = useState<'sharp' | 'soft-bokeh' | 'heavy-bokeh'>('soft-bokeh');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'ar' ? 'مولد الخلفيات وإضاءة الاستوديو الفاخرة' : 'AI Background & Studio Lighting Generator'}
            </h1>
            <p className="text-xs text-slate-400">
              {lang === 'ar'
                ? 'مئات الخلفيات العالمية: أبراج دبي، مكتبات حقوقية، مكاتب تنفيذية، مع التحكم في عمق المجال والبوكيه.'
                : 'Select from high-end locations including Dubai skylines, law libraries, and executive suites with optical bokeh control.'}
            </p>
          </div>
        </div>

        {/* Background Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-slate-800">
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {lang === 'ar' ? 'خلفيات الاستوديو والمواقع العالمية:' : 'Studio Backdrops & Global Environments:'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BACKGROUND_PRESETS.map((bg) => {
                const isSelected = selectedBg.id === bg.id;
                return (
                  <div
                    key={bg.id}
                    onClick={() => {
                      setSelectedBg(bg);
                      setBlurLevel(bg.blurLevel);
                    }}
                    className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all ${
                      isSelected
                        ? 'border-indigo-500 ring-2 ring-indigo-500/40 bg-indigo-950/20'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                      <img
                        src={bg.image}
                        alt={bg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1 rounded-full">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-xs font-bold text-white truncate">
                          {lang === 'ar' ? bg.titleAr : bg.title}
                        </p>
                        <span className="text-[10px] text-slate-300 block">
                          📍 {bg.location}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optical Bokeh & Light Panel */}
          <div className="md:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ar' ? 'عمق المجال العزلي (البوكيه)' : 'Optical Depth of Field (Bokeh)'}</span>
            </h3>

            <div className="space-y-2">
              {[
                { id: 'sharp', label: lang === 'ar' ? 'تفاصيل واضحة (f/5.6)' : 'Crisp Environment (f/5.6)' },
                { id: 'soft-bokeh', label: lang === 'ar' ? 'بوكيه ناعم متوازن (f/2.8)' : 'Soft Studio Bokeh (f/2.8)' },
                { id: 'heavy-bokeh', label: lang === 'ar' ? 'عزل سينمائي قوي (f/1.4)' : 'Heavy Cinematic Blur (f/1.4)' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBlurLevel(b.id as any)}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-left flex items-center justify-between border transition-all ${
                    blurLevel === b.id
                      ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span>{b.label}</span>
                  {blurLevel === b.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <span className="font-bold text-slate-200 block">
                {lang === 'ar' ? 'نمط الإضاءة المعتمد:' : 'Active Lighting Preset:'}
              </span>
              <p className="text-indigo-300 font-medium">{selectedBg.lightingStyle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
