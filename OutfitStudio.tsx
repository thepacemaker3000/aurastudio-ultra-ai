import React, { useState } from 'react';
import { Shirt, Check, Sparkles, Palette, Shield } from 'lucide-react';
import { Language } from '../types';
import { OUTFIT_PRESETS } from '../data/outfits';
import { TRANSLATIONS } from '../data/translations';

interface OutfitStudioProps {
  lang: Language;
}

export const OutfitStudio: React.FC<OutfitStudioProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedOutfit, setSelectedOutfit] = useState(OUTFIT_PRESETS[0]);
  const [selectedColor, setSelectedColor] = useState(OUTFIT_PRESETS[0].colorOptions[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Shirt className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'ar' ? 'مولد الملابس والأزياء الرسمية الاحترافي' : 'AI Professional Wardrobe & Fashion Studio'}
            </h1>
            <p className="text-xs text-slate-400">
              {lang === 'ar'
                ? 'استبدل الملابس ببدل رسمية، زي أطباء، أزياء طيران، أو البشت المقصب الملكي مع حفظ ثبات الوجه.'
                : 'Swap attire with executive suits, judicial robes, pilot uniforms, or royal Bisht with 100% facial posture lock.'}
            </p>
          </div>
        </div>

        {/* Outfit Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-slate-800">
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {lang === 'ar' ? 'كتالوج الملابس والأكواد التخصصية:' : 'Wardrobe Preset Collection:'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {OUTFIT_PRESETS.map((outfit) => {
                const isSelected = selectedOutfit.id === outfit.id;
                return (
                  <div
                    key={outfit.id}
                    onClick={() => {
                      setSelectedOutfit(outfit);
                      setSelectedColor(outfit.colorOptions[0]);
                    }}
                    className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all ${
                      isSelected
                        ? 'border-indigo-500 ring-2 ring-indigo-500/40 bg-indigo-950/20'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                      <img
                        src={outfit.image}
                        alt={outfit.title}
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
                          {lang === 'ar' ? outfit.titleAr : outfit.title}
                        </p>
                        <span className="text-[10px] text-indigo-300 bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-800">
                          {outfit.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color & Customize Panel */}
          <div className="md:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-400" />
              <span>{lang === 'ar' ? 'تخصيص لون الزي والقماش' : 'Fabric Color Variants'}</span>
            </h3>

            <div className="space-y-2">
              <p className="text-xs text-slate-400">
                {lang === 'ar' ? 'اختر التدرج اللوني للزي المختار:' : 'Select primary fabric color shade:'}
              </p>
              <div className="space-y-2">
                {selectedOutfit.colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-left flex items-center justify-between border transition-all ${
                      selectedColor === color
                        ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>{color}</span>
                    {selectedColor === color && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <Shield className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تركيب الزي بدقة خياطة ثلاثية الأبعاد' : '3D Tailored AI Fit Simulation'}</span>
              </div>
              <p>
                {lang === 'ar'
                  ? 'سيتم تطبيق هذا الزي تلقائياً عند توليد الصور من الاستوديو الرئيسي.'
                  : 'This outfit will be seamlessly draped onto your portrait during studio generation.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
