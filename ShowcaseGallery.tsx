import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, Award, Layers, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Language } from '../types';

interface ShowcaseGalleryProps {
  lang: Language;
  onTryStyleInStudio?: (styleId: string) => void;
}

export const ShowcaseGallery: React.FC<ShowcaseGalleryProps> = ({ lang, onTryStyleInStudio }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const galleryItems = [
    {
      id: 'fortune-500-ceo',
      category: 'executive',
      title: 'Fortune 500 CEO Portrait',
      titleAr: 'بورتريه الرئيس التنفيذي للشركات الكبرى',
      beforeImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      afterImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
      outfit: 'Executive Navy Italian Suit',
      background: 'Corner Executive Office with Skyline',
      faceLockScore: 99.88,
    },
    {
      id: 'tech-unicorn-founder',
      category: 'tech',
      title: 'Unicorn Tech Founder',
      titleAr: 'مؤسس شركة تقنية بمليارات الدولارات',
      beforeImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      afterImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      outfit: 'Silk Power Blazer & Modern Collar',
      background: 'Architectural Industrial Glass Loft',
      faceLockScore: 99.92,
    },
    {
      id: 'supreme-law-partner',
      category: 'legal',
      title: 'Supreme Court Senior Partner',
      titleAr: 'شريك أول في مكتب محاماة دولي',
      beforeImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      afterImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      outfit: 'Double-Breasted Tailored Suit',
      background: 'Mahogany Leather Law Library',
      faceLockScore: 99.85,
    },
    {
      id: 'chief-medical-officer',
      category: 'medical',
      title: 'Chief Medical Specialist',
      titleAr: 'استشاري ورئيس قسم طبي',
      beforeImg: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
      afterImg: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      outfit: 'Clinical White Lab Coat & Stethoscope',
      background: 'High-Tech Hospital Atrium',
      faceLockScore: 99.81,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Styles', nameAr: 'جميع الأنماط' },
    { id: 'executive', name: 'C-Suite & Corporate', nameAr: 'الإدارة العليا' },
    { id: 'tech', name: 'Tech Founders', nameAr: 'رواد التقنية' },
    { id: 'legal', name: 'Legal & Finance', nameAr: 'القانون والمالية' },
    { id: 'medical', name: 'Medical & Science', nameAr: 'الطب والعلوم' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter((i) => i.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-100">
      
      {/* Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
          <Award className="w-4 h-4" />
          <span>{lang === 'ar' ? 'معرض النتائج الواقعية بدقة 8K' : 'Ultra-Realistic 8K Portrait Showcase'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {lang === 'ar' ? 'قارن التباين بين الصورة العادية وناتـج الذكاء الاصطناعي' : 'Transform Raw Selfies into C-Suite Executive Portraits'}
        </h2>

        <p className="text-sm text-slate-400">
          {lang === 'ar'
            ? 'حرك مؤشر المقارنة لرؤية الدقة المتناهية للحفاظ على معالم الوجه الأصلية بنسبة 99.8%.'
            : 'Slide the comparison controls below to inspect our 99.8% biometric face lock and studio light rendering.'}
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {lang === 'ar' ? cat.nameAr : cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 hover:border-indigo-500/40 transition-all"
          >
            <BeforeAfterSlider
              beforeImage={item.beforeImg}
              afterImage={item.afterImg}
              lang={lang}
            />

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {lang === 'ar' ? item.titleAr : item.title}
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-extrabold border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.faceLockScore}% Face Lock</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-sans font-bold">{lang === 'ar' ? 'البدلة:' : 'Outfit:'}</span>
                  <span className="text-slate-200">{item.outfit}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-sans font-bold">{lang === 'ar' ? 'الخلفية:' : 'Background:'}</span>
                  <span className="text-slate-200">{item.background}</span>
                </div>
              </div>

              {onTryStyleInStudio && (
                <button
                  onClick={() => onTryStyleInStudio(item.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 hover:border-indigo-500 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{lang === 'ar' ? 'تجربة هذا النمط الآن' : 'Generate Headshot with this Style'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
