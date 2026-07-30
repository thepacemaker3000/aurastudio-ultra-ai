import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '10-50',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-100">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
          <Building className="w-4 h-4 text-indigo-400" />
          <span>{lang === 'ar' ? 'تواصل مع فريق الدعم والمبيعات المؤسسية' : 'Enterprise Inquiries & Support'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {lang === 'ar' ? 'هل تريد توحيد الصور لجميع موظفي شركتك؟' : 'Let\'s Standardize Your Entire Executive Team\'s Presence'}
        </h2>

        <p className="text-sm text-slate-400">
          {lang === 'ar'
            ? 'تواصل معنا للحصول على خصومات الحزم الكبيرة لفرق العمل، اتفاقية SLA مخصصة، أو الدعم الفني.'
            : 'Contact our enterprise team for volume team licensing, custom company brand-lock models, or API integration support.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">
              {lang === 'ar' ? 'معلومات التواصل المباشرة' : 'Global Headquarters & Direct Contact'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ar' ? 'فريق الدعم الفني متواجد على مدار الساعة للرد على استفساراتكم.' : 'Our enterprise SLA support team responds to all corporate inquiries within 2 hours.'}
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3.5 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">{lang === 'ar' ? 'البريد الإلكتروني للمبيعات:' : 'Enterprise Sales Mail:'}</span>
                <span className="font-bold text-slate-200">enterprise@aurastudio.ai</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">{lang === 'ar' ? 'الهاتف المباشر:' : 'Direct Phone Line:'}</span>
                <span className="font-bold text-slate-200">+1 (800) 555-AURA (2872)</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">{lang === 'ar' ? 'المقر الرئيسي:' : 'Global HQ Location:'}</span>
                <span className="font-bold text-slate-200">500 Howard St, San Francisco, CA 94105</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-500/30 space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'ضمان الأمان والخصوصية 100%' : '100% Enterprise Data Privacy Guarantee'}</span>
            </h4>
            <p className="text-[11px] text-slate-300">
              {lang === 'ar'
                ? 'جميع البيانات والصور الأصلية مشفرة بالكامل ولا يتم تدريب نماذج عامة عليها.'
                : 'All uploaded reference photos and rendered 8K assets are strictly isolated with AES-256 zero-retention encryption.'}
            </p>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {submitted ? (
            <div className="p-12 text-center space-y-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-flex">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Inquiry Successfully Submitted!'}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {lang === 'ar'
                  ? 'سيتواصل معك مستشار المبيعات المؤسسية خلال ساعتين لمناقشة تفعيل باقة فريق عملك.'
                  : 'Our executive enterprise account manager will reach out within 2 business hours with custom billing and team onboarding details.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                {lang === 'ar' ? 'أرسل استفسارك للفريق' : 'Send us a message'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">{lang === 'ar' ? 'الاسم:' : 'Full Name:'}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">{lang === 'ar' ? 'البريد الإلكتروني:' : 'Work Email:'}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@enterprise.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">{lang === 'ar' ? 'اسم الشركة / المؤسسة:' : 'Company Name:'}</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Global Inc."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">{lang === 'ar' ? 'حجم فريق العمل:' : 'Estimated Team Size:'}</label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="1-10">1 - 10 Members</option>
                    <option value="10-50">10 - 50 Members</option>
                    <option value="50-250">50 - 250 Members</option>
                    <option value="250+">250+ Enterprise Scale</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">{lang === 'ar' ? 'تفاصيل الطلب أو الاستفسار:' : 'Inquiry Message & Requirements:'}</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'ar' ? 'اكتب تفاصيل احتياجك هنا...' : 'Tell us about your team onboarding goals, custom brand style preferences, or custom SLA needs...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إرسال الرسالة الآن' : 'Submit Enterprise Inquiry'}</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
