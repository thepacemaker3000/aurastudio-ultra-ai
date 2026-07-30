import React from 'react';
import { BookOpen, Sparkles, Clock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface BlogSectionProps {
  lang: Language;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ lang }) => {
  const articles = [
    {
      id: 'linkedin-headshot-guide-2026',
      title: 'How an 8K Executive Headshot Increases LinkedIn Profile Views by 300%',
      titleAr: 'كيف تزيد صور البورتريه التنفيذية 8K من مشاهدات ملفك على LinkedIn بنسبة 300%',
      excerpt: 'Discover the exact facial lighting angles, Rembrandt keys, and collar choices that build immediate trust with executive recruiters and VCs.',
      excerptAr: 'اكتشف زوايا الإضاءة التنفيذية، وإضاءة ريمبرانت المعتمدة لبناء الموثوقية الفورية مع مستثمري رأس المال الجريء والمشرّفين.',
      readTime: '4 min read',
      readTimeAr: 'قراءة 4 دقائق',
      author: 'AuraStudio Editorial Team',
      date: 'Jul 27, 2026',
      category: 'Executive Branding',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'biometric-passport-rules',
      title: 'Complete Guide to Official Biometric Passport Photo Requirements (US, Schengen, UK)',
      titleAr: 'الدليل الشامل لمعايير صور الجوازات والفيزا العالمية الرسمية (أمريكا، الشنغن، بريطانيا)',
      excerpt: 'Avoid visa rejections with white background normalization, head-height ratio math, and anti-glare specs generated automatically.',
      excerptAr: 'تجنب رفض طلبات الفيزا والجوازات من خلال ضبط نسب الرأس وخلفيات البيضاء النظيفة المتوافقة مع الشروط الرسمية.',
      readTime: '6 min read',
      readTimeAr: 'قراءة 6 دقائق',
      author: 'Biometric Compliance Board',
      date: 'Jul 25, 2026',
      category: 'Passport & Visa',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ai-resume-parsing-tips',
      title: 'Mapping Your CV Career Summary to Your Ideal AI Portrait Outfit',
      titleAr: 'ربط ملخص السيرة الذاتية بالنمط والبدلة المثالية لصور الذكاء الاصطناعي',
      excerpt: 'How AI resume parsing automatically maps candidate skills into C-Suite, Tech Founder, or Legal Partner portrait archetypes.',
      excerptAr: 'كيف يقوم نظام تحليل السيرة الذاتية بتحديد نمط الصور والملابس الأنسب لمجالك المهني تلقائياً.',
      readTime: '5 min read',
      readTimeAr: 'قراءة 5 دقائق',
      author: 'Career Advisory Council',
      date: 'Jul 22, 2026',
      category: 'Resume AI',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-100">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'ar' ? 'المدونة ودليل العلامة الشخصية' : 'Executive AI Headshots & SEO Knowledge Base'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {lang === 'ar' ? 'أحدث المقالات والإرشادات لبناء هويتك المهنية' : 'Mastering Personal Branding & Biometric Compliance'}
        </h2>

        <p className="text-sm text-slate-400">
          {lang === 'ar'
            ? 'مقالات متخصصة في لغة الجسد التنفيذية، التقاط صور الجوازات الحيوية، وتحسين الملفات الشخصية.'
            : 'Insights from executive directors, biometric photographers, and talent sourcers on mastering your online presence.'}
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art) => (
          <div
            key={art.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-indigo-500/40 transition-all"
          >
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-indigo-400">
                  {art.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? art.readTimeAr : art.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {lang === 'ar' ? art.titleAr : art.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'ar' ? art.excerptAr : art.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => alert(`Opening article: ${art.title}`)}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
              >
                <span>{lang === 'ar' ? 'اقرأ المقال المقال بالكامل' : 'Read Full Guide'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
