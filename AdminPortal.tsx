import React, { useEffect, useState } from 'react';
import { Activity, Server, Cpu, Database, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Language, SystemStats } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AdminPortalProps {
  lang: Language;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/system-stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error('Failed to fetch stats:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const timer = setInterval(fetchStats, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {lang === 'ar' ? 'لوحة الإدارة العلية ومراقبة أداء الخوادم' : 'Enterprise Admin & Model Telemetry Portal'}
              </h1>
              <p className="text-xs text-slate-400">
                {lang === 'ar'
                  ? 'مراقبة حية لقوائم معالجة الصور، زمن الاستجابة لموديل Gemini، وحالة مصفوفة الخوادم.'
                  : 'Live telemetry tracking cluster queue depth, Gemini latency, GPU load, and model operations.'}
              </p>
            </div>
          </div>

          <button
            onClick={fetchStats}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">{lang === 'ar' ? 'إجمالي الصور المولدة:' : 'Total Generated Portraits:'}</span>
              <p className="text-2xl font-extrabold text-white">{stats.totalGeneratedCount.toLocaleString()}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">{lang === 'ar' ? 'متوسط سرعة التوليد:' : 'Avg Latency:'}</span>
              <p className="text-2xl font-extrabold text-emerald-400">{stats.avgLatencyMs} ms</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">{lang === 'ar' ? 'دقة قفل الوجه الحيوية:' : 'Face Lock Precision:'}</span>
              <p className="text-2xl font-extrabold text-indigo-400">{stats.faceLockPrecision}%</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">{lang === 'ar' ? 'حمولة مصفوفة GPU:' : 'GPU Cluster Load:'}</span>
              <p className="text-2xl font-extrabold text-amber-400">{stats.gpuClusterLoad}%</p>
            </div>
          </div>
        )}

        {/* Active AI Models Table */}
        <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-indigo-400" />
            <span>{lang === 'ar' ? 'حالة النماذج وسرعة الاستجابة:' : 'Active Gemini Models & Status:'}</span>
          </h3>

          <div className="space-y-2">
            {stats?.activeModels.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-bold text-slate-200">{m.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400">{m.latencyMs}ms</span>
                  <span className="text-emerald-400 font-bold uppercase">{m.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
