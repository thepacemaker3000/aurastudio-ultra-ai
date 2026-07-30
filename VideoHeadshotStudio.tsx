import React, { useState } from 'react';
import { Video, Zap, RefreshCw, Play, Pause, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface VideoHeadshotStudioProps {
  lang: Language;
  initialHeadshotUrl?: string;
}

export const VideoHeadshotStudio: React.FC<VideoHeadshotStudioProps> = ({
  lang,
  initialHeadshotUrl,
}) => {
  const t = TRANSLATIONS[lang];
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);

  const headshotImage = initialHeadshotUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80';

  const handleGenerateVideo = () => {
    setIsGeneratingVideo(true);
    setTimeout(() => {
      setIsGeneratingVideo(false);
      setHasVideo(true);
      setIsPlaying(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{t.videoTitle}</h1>
            <p className="text-xs text-slate-400">{t.videoSubtitle}</p>
          </div>
        </div>

        {/* Video Canvas & Motion Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-800 items-center">
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 w-full max-w-md aspect-square shadow-2xl group">
              <img
                src={headshotImage}
                alt="Motion Headshot"
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  isPlaying ? 'scale-105 filter brightness-105 animate-pulse' : ''
                }`}
              />

              {isPlaying && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  <span>4K LIVE MOTION</span>
                </div>
              )}

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto w-14 h-14 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-white">{lang === 'ar' ? 'إعدادات حركة الوجه الدقيقة:' : 'Micro-Expression Motion Controls:'}</h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span>👁️ {lang === 'ar' ? 'طرفات العين والتحديق الطبيعي' : 'Natural Eye Blink Rate'}</span>
                <span className="text-indigo-400 font-bold">1.2s</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span>😊 {lang === 'ar' ? 'حركة الابتسامة والإيماءة الخفيفة' : 'Micro-Smile & Head Nod'}</span>
                <span className="text-indigo-400 font-bold">Active</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span>💡 {lang === 'ar' ? 'تغير الإضاءة السينمائية المحيطة' : 'Ambient Studio Lighting Shift'}</span>
                <span className="text-indigo-400 font-bold">Soft Rembrant</span>
              </div>
            </div>

            <button
              onClick={handleGenerateVideo}
              disabled={isGeneratingVideo}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-xl flex items-center justify-center gap-2"
            >
              {isGeneratingVideo ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 text-amber-300" />}
              <span>{t.generateVideoBtn}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
