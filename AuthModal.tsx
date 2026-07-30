import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialMode?: 'login' | 'register';
  onSuccessAuth?: (user: { name: string; email: string; tier: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialMode = 'login',
  onSuccessAuth,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      const mockUser = {
        name: fullName || (email.split('@')[0] ?? 'Executive User'),
        email: email || 'user@aurastudio.ai',
        tier: 'Pro Tier Member',
      };

      if (onSuccessAuth) {
        onSuccessAuth(mockUser);
      }

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AuraStudio AI SaaS Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {mode === 'login'
              ? (lang === 'ar' ? 'تسجيل الدخول لمنصتك' : 'Sign in to AuraStudio AI')
              : (lang === 'ar' ? 'إنشاء حساب جديد' : 'Create Your Pro Account')}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'ar'
              ? 'الوصول الفوري لتوليد صور البورتريه التنفيذية بدقة 8K مع ميزة ثبات معالم الوجه.'
              : 'Unlock 8K executive headshot rendering with face-lock precision & instant brand kit.'}
          </p>
        </div>

        {/* Social SSO Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleSubmit}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-bold text-xs text-white flex items-center justify-center gap-2.5 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
            </svg>
            <span>{lang === 'ar' ? 'المتابعة بواسطة حساب Google' : 'Continue with Google Account'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 my-2">
          <div className="h-px bg-slate-800 flex-1"></div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
            {lang === 'ar' ? 'أو عبر البريد الإلكتروني' : 'OR WITH EMAIL'}
          </span>
          <div className="h-px bg-slate-800 flex-1"></div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">{lang === 'ar' ? 'الاسم الكامل:' : 'Full Name:'}</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alexander Vance"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 block">{lang === 'ar' ? 'البريد الإلكتروني:' : 'Work Email Address:'}</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exec@company.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 block">{lang === 'ar' ? 'كلمة المرور:' : 'Password:'}</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full py-3 px-4 rounded-xl font-extrabold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span>{lang === 'ar' ? 'جاري التحقق...' : 'Authenticating...'}</span>
            ) : isSuccess ? (
              <span className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Successfully Logged In!'}</span>
              </span>
            ) : (
              <>
                <span>
                  {mode === 'login'
                    ? (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In to Workspace')
                    : (lang === 'ar' ? 'إنشاء الحساب' : 'Create Account & Start Free')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="text-center pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            {mode === 'login' ? (
              <>
                {lang === 'ar' ? 'ليس لديك حساب بعد؟' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-indigo-400 font-bold hover:underline"
                >
                  {lang === 'ar' ? 'سجل الآن مجاناً' : 'Sign Up Free'}
                </button>
              </>
            ) : (
              <>
                {lang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-indigo-400 font-bold hover:underline"
                >
                  {lang === 'ar' ? 'تسجيل الدخول' : 'Log In'}
                </button>
              </>
            )}
          </p>
        </div>

      </div>
    </div>
  );
};
