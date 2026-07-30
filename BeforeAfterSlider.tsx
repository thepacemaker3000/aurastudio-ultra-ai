import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  lang?: Language;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Photo',
  afterLabel = 'AI Executive 8K',
  lang = 'en',
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
        <span className="flex items-center gap-1.5 text-indigo-400">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'مقارنة التباين التفاعلية (قبل / بعد):' : 'Interactive Before / After Contrast:'}</span>
        </span>
        <span className="text-[11px] font-mono text-slate-400">{Math.round(sliderPosition)}% AI Enhancements</span>
      </div>

      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 select-none cursor-ew-resize shadow-2xl group"
      >
        {/* After Image (Background Layer) */}
        <img
          src={afterImage}
          alt="After AI"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-indigo-600/90 backdrop-blur-md border border-indigo-400/40 text-[10px] font-extrabold text-white flex items-center gap-1 shadow-lg">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>{lang === 'ar' ? 'بعد: بورتريه AI' : afterLabel}</span>
        </div>

        {/* Before Image (Clipped Layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before Original"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-slate-200 shadow-lg">
            <span>{lang === 'ar' ? 'قبل: الأصل' : beforeLabel}</span>
          </div>
        </div>

        {/* Vertical Drag Line Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xl border border-slate-300 transform -translate-x-1/2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
