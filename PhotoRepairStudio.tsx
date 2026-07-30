import React, { useState } from 'react';
import { Wand2, Sparkles, RefreshCw, Zap, Sliders, Check } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface PhotoRepairStudioProps {
  lang: Language;
}

export const PhotoRepairStudio: React.FC<PhotoRepairStudioProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const [activeTab, setActiveTab] = useState<'repair' | 'avatar'>('repair');
  const [selectedAvatarStyle, setSelectedAvatarStyle] = useState('pixar-3d');
  const [isProcessing, setIsProcessing] = useState(false);

  const avatarStyles = [
    { id: 'pixar-3d', title: 'Pixar 3D Animation', titleAr: 'أنيميشن ثلاثي الأبعاد - بيكسار', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { id: 'anime-cyberpunk', title: 'Cyberpunk Anime', titleAr: 'أنمي سايبربانك مستقبلي', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
    { id: 'oil-painting', title: 'Renaissance Oil Painting', titleAr: 'لوحة زيتية كلاسيكية', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { id: 'watercolor', title: 'Soft Watercolor Portrait', titleAr: 'بورتريه ألوان مائية ناعمة', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  ];

  const handleApplyRepair = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(lang === 'ar' ? 'تم تحسين وتصفية الوجه بنجاح وترقية الدقة إلى 8K!' : 'Photo denoised, face restored & upscaled to 8K Master!');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Wand2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'ar' ? 'استوديو ترميم الصور والأفاتار الفني' : 'AI Photo Repair & Avatar Art Studio'}
            </h1>
            <p className="text-xs text-slate-400">
              {lang === 'ar'
                ? 'إزالة التشوهات، إزالة الضبابية، ترقية الدقة إلى 8K، أو تحويل البورتريه إلى أسلوب بيكسار 3D والأنمي.'
                : 'Denoise, deblur, upscale old photos to 8K, or transform portraits into 3D Pixar & Cyberpunk avatars.'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('repair')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'repair' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'
            }`}
          >
            🛠️ {lang === 'ar' ? 'ترميم وترقية دقة الصور (8K Restore)' : 'Photo Repair & 8K Restoration'}
          </button>
          <button
            onClick={() => setActiveTab('avatar')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'avatar' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'
            }`}
          >
            🎨 {lang === 'ar' ? 'أنماط الأفاتار الفنية (3D Avatar)' : 'Artistic 3D Avatar Styles'}
          </button>
        </div>

        {activeTab === 'repair' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-200">{lang === 'ar' ? 'مرشحات الترميم والتصفية:' : 'Restoration Filters:'}</h3>
              
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <label className="flex items-center gap-3 text-xs text-slate-300 font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-indigo-500 w-4 h-4 rounded" />
                  <span>{lang === 'ar' ? 'إزالة الضوضاء الضوئية (Denoise & Artifact Clear)' : 'Denoise & Grain Artifact Removal'}</span>
                </label>

                <label className="flex items-center gap-3 text-xs text-slate-300 font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-indigo-500 w-4 h-4 rounded" />
                  <span>{lang === 'ar' ? 'إعادة تركيب ملامح الوجه وحفظ العينين (Face Reconstruction)' : 'Facial Reconstruction & Ocular Clarification'}</span>
                </label>

                <label className="flex items-center gap-3 text-xs text-slate-300 font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-indigo-500 w-4 h-4 rounded" />
                  <span>{lang === 'ar' ? 'ترقية الرزليوشن إلى 8K Vector Upscaling' : '8K Master Vector Supersampling'}</span>
                </label>
              </div>

              <button
                onClick={handleApplyRepair}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-xl flex items-center justify-center gap-2"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
                <span>{lang === 'ar' ? 'بدء ترميم الصورة وترقيتها' : 'Run 8K Repair & Enhancement'}</span>
              </button>
            </div>

            <div className="lg:col-span-6 flex items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="text-center space-y-2">
                <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" alt="Repair Preview" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-emerald-400 font-bold">8K Ultra HD Restored</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {avatarStyles.map((style) => (
              <div
                key={style.id}
                onClick={() => setSelectedAvatarStyle(style.id)}
                className={`group rounded-xl overflow-hidden cursor-pointer border p-2 transition-all ${
                  selectedAvatarStyle === style.id ? 'border-indigo-500 bg-indigo-950/20 ring-2 ring-indigo-500/40' : 'border-slate-800 bg-slate-950'
                }`}
              >
                <img src={style.image} alt={style.title} className="w-full h-32 object-cover rounded-lg mb-2" />
                <p className="text-xs font-bold text-white truncate">{lang === 'ar' ? style.titleAr : style.title}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
