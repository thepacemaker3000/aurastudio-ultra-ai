import React, { useState, useEffect } from 'react';
import {
  Heart,
  Download,
  Trash2,
  Filter,
  Search,
  Sparkles,
  Layers,
  Printer,
  CheckCircle2,
} from 'lucide-react';
import { GeneratedHeadshot, Language } from '../types';

interface FavoritesHistoryManagerProps {
  lang: Language;
}

export const FavoritesHistoryManager: React.FC<FavoritesHistoryManagerProps> = ({ lang }) => {
  const [history, setHistory] = useState<GeneratedHeadshot[]>([]);
  const [filterFavoriteOnly, setFilterFavoriteOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aura_headshot_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      } else {
        // Sample baseline history
        const initialSamples: GeneratedHeadshot[] = [
          {
            id: 'sample-1',
            title: 'Fortune 500 CEO Portrait #1',
            url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
            originalUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
            styleName: 'Fortune 500 CEO Portrait',
            outfitName: 'Executive Navy Suit',
            backgroundName: 'Executive Corner Mahogany Office',
            faceLockScore: 99.85,
            resolution: '8K',
            createdAt: 'Jul 27, 2026',
            promptUsed: '8K hyper-photorealistic executive headshot',
            isFavorite: true,
            aspectRatio: '1:1',
            category: 'corporate',
          },
          {
            id: 'sample-2',
            title: 'Unicorn Tech Founder #1',
            url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            originalUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            styleName: 'Unicorn Tech Founder',
            outfitName: 'Silk Blouse Power Suit',
            backgroundName: 'Architectural Tech Loft',
            faceLockScore: 99.91,
            resolution: '8K',
            createdAt: 'Jul 27, 2026',
            promptUsed: '8K tech founder portrait',
            isFavorite: false,
            aspectRatio: '1:1',
            category: 'tech',
          },
        ];
        setHistory(initialSamples);
        localStorage.setItem('aura_headshot_history', JSON.stringify(initialSamples));
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }, []);

  const saveHistory = (items: GeneratedHeadshot[]) => {
    setHistory(items);
    try {
      localStorage.setItem('aura_headshot_history', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save history:', e);
    }
  };

  const toggleFavorite = (id: string) => {
    const updated = history.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    saveHistory(updated);
  };

  const deleteItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    saveHistory(updated);
  };

  const filteredItems = history.filter((item) => {
    if (filterFavoriteOnly && !item.isFavorite) return false;
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.styleName.toLowerCase().includes(q) ||
        item.outfitName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {lang === 'ar' ? 'سجل الصور المفضلة والمستخرجة' : 'Studio History & Favorites Library'}
              </h1>
              <p className="text-xs text-slate-400">
                {lang === 'ar'
                  ? 'إدارة وحفظ الصور التي تم توليدها وتصديرها بدقة 8K عالية الوضوح.'
                  : 'Locally persisted 8K render cache with instant search, favoriting, and high-DPI export.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterFavoriteOnly(!filterFavoriteOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all ${
                filterFavoriteOnly
                  ? 'bg-rose-600 text-white border-rose-500 shadow-lg'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${filterFavoriteOnly ? 'fill-current' : ''}`} />
              <span>{lang === 'ar' ? 'المفضلة فقط' : 'Favorites Only'}</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث عن اسم النمط، البدلة أو الخلفية...' : 'Search by style, outfit, or background...'}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Image Grid */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs bg-slate-950 rounded-2xl border border-slate-800">
            {lang === 'ar' ? 'لا توجد صور محفوظة تتطابق مع البحث الحالي.' : 'No saved headshots match your current filter criteria.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-3 group hover:border-indigo-500/50 transition-all"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-900">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Top Overlay Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>{item.resolution} • {item.faceLockScore}%</span>
                    </span>

                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                        item.isFavorite
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {item.outfitName} • {item.backgroundName}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono">{item.createdAt}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Downloading 8K file for ${item.title}`)}
                        className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
