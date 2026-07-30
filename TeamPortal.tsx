import React, { useState } from 'react';
import { Users, UserPlus, Download, RefreshCw, CheckCircle2, Building, ShieldCheck } from 'lucide-react';
import { Language, TeamMember } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface TeamPortalProps {
  lang: Language;
}

export const TeamPortal: React.FC<TeamPortalProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'tm-1',
      name: 'Dr. Tariq Al-Hassan',
      role: 'Managing Partner & Executive',
      department: 'Board & Legal Advisory',
      email: 'tariq@enterprise.com',
      outfit: 'Executive Navy Suit',
      status: 'completed',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tm-2',
      name: 'Noura Al-Ghamdi',
      role: 'Chief Technology Officer',
      department: 'Engineering & AI',
      email: 'noura@enterprise.com',
      outfit: 'Women Power Suit',
      status: 'completed',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tm-3',
      name: 'Marcus Vance',
      role: 'VP of Global Operations',
      department: 'Corporate Strategy',
      email: 'marcus@enterprise.com',
      outfit: 'Charcoal Wool Suit',
      status: 'completed',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDept, setNewDept] = useState('');
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);

  const handleAddMember = () => {
    if (!newName) return;
    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: newName,
      role: newRole || 'Senior Associate',
      department: newDept || 'General Management',
      email: `${newName.toLowerCase().replace(/\s+/g, '.')}@company.com`,
      outfit: 'Corporate Executive Suit',
      status: 'pending',
    };
    setTeamMembers([...teamMembers, newMember]);
    setNewName('');
    setNewRole('');
    setNewDept('');
  };

  const handleBulkGenerate = () => {
    setIsBulkGenerating(true);
    setTimeout(() => {
      setTeamMembers(
        teamMembers.map((m) => ({
          ...m,
          status: 'completed',
          photoUrl: m.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        }))
      );
      setIsBulkGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">{t.teamTitle}</h1>
              <p className="text-xs text-slate-400">{t.teamSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkGenerate}
              disabled={isBulkGenerating}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {isBulkGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
              <span>{t.bulkGenerate}</span>
            </button>

            <button
              onClick={() => alert('Exporting ZIP directory package...')}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{t.exportZip}</span>
            </button>
          </div>
        </div>

        {/* Add Employee Form Bar */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
          <input
            type="text"
            placeholder={lang === 'ar' ? 'اسم الموظف' : 'Employee Full Name'}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder={lang === 'ar' ? 'المسمى الوظيفي' : 'Job Title / Role'}
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder={lang === 'ar' ? 'القسم / الإدارة' : 'Department'}
            value={newDept}
            onChange={(e) => setNewDept(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleAddMember}
            className="py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t.addEmployee}</span>
          </button>
        </div>

        {/* Team Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-all"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shrink-0">
                {member.photoUrl ? (
                  <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs font-bold">
                    PENDING
                  </div>
                )}
              </div>

              <div className="space-y-0.5 overflow-hidden">
                <h4 className="text-sm font-bold text-white truncate">{member.name}</h4>
                <p className="text-xs text-indigo-400 font-medium truncate">{member.role}</p>
                <p className="text-[10px] text-slate-400 truncate">{member.department}</p>
                <div className="pt-1 flex items-center gap-1 text-[10px]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">{lang === 'ar' ? 'موحد الهوية' : 'Brand Matched'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
