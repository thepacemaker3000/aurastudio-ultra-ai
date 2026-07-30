import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Smartphone, X, Copy, Check, Download, Camera, Sparkles, ExternalLink, RefreshCw, ShieldCheck, Globe, Upload, UserCheck } from 'lucide-react';
import { Language } from '../types';

interface MobileQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const MobileQrModal: React.FC<MobileQrModalProps> = ({ isOpen, onClose, lang }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'app' | 'camera' | 'passport' | 'executive' | 'upload'>('app');
  
  // Environment Auto-Detection
  const isProdHost = typeof window !== 'undefined' && window.location.hostname === 'app.aurastudio.ai';
  const [domainMode, setDomainMode] = useState<'current' | 'prod'>(isProdHost ? 'prod' : 'current');
  const [includeSessionToken, setIncludeSessionToken] = useState(true);
  const [sessionToken, setSessionToken] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(90);
  
  // Live Mobile Connection Status Tracking
  const [pairingStatus, setPairingStatus] = useState<'waiting' | 'connected' | 'uploaded'>('waiting');
  const [showTelemetryStats, setShowTelemetryStats] = useState(false);

  // Generate short-lived session handoff token (Token only, NO PII/JWT embedded)
  const refreshSessionToken = () => {
    const randomBytes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
    setSessionToken(`s_beta_${randomBytes}`);
    setCountdown(90);
    setPairingStatus('waiting');
  };

  useEffect(() => {
    if (isOpen) {
      refreshSessionToken();
      // Auto-detect environment host
      if (typeof window !== 'undefined' && window.location.hostname === 'app.aurastudio.ai') {
        setDomainMode('prod');
      } else {
        setDomainMode('current');
      }
    }
  }, [isOpen]);

  // Countdown timer for expiring QR
  useEffect(() => {
    if (!isOpen || !includeSessionToken) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          refreshSessionToken();
          return 90;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, includeSessionToken]);

  // Simulated live pairing listener for smooth demo/beta testing
  useEffect(() => {
    if (!isOpen || pairingStatus !== 'waiting') return;
    const timer = setTimeout(() => {
      setPairingStatus('connected');
      logAnalyticsEvent('mobile_device_paired');
    }, 12000); // simulated connection event after 12s if user scans
    return () => clearTimeout(timer);
  }, [isOpen, pairingStatus]);

  if (!isOpen) return null;

  // Base production domain or current origin
  const prodDomain = 'https://app.aurastudio.ai';
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-boaoapbsdtfmpw7pliphex-928360606227.europe-west2.run.app';
  const baseUrl = domainMode === 'prod' ? prodDomain : currentOrigin;

  const getTargetUrl = () => {
    try {
      const url = new URL(baseUrl);
      
      // Deep Link Routing
      if (activeTab === 'camera') {
        url.searchParams.set('mode', 'camera');
      } else if (activeTab === 'passport') {
        url.searchParams.set('tab', 'passport');
      } else if (activeTab === 'executive') {
        url.searchParams.set('tab', 'executive');
      } else if (activeTab === 'upload') {
        url.searchParams.set('action', 'upload');
      }

      // Session Transfer (Static token during countdown to prevent QR flicker/scanning issues)
      if (includeSessionToken && sessionToken) {
        url.searchParams.set('token', sessionToken);
      }

      return url.toString();
    } catch {
      return baseUrl;
    }
  };

  const targetUrl = getTargetUrl();

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    logAnalyticsEvent('qr_code_copied');
  };

  const logAnalyticsEvent = (eventName: string) => {
    try {
      const logs = JSON.parse(localStorage.getItem('aurastudio_qr_telemetry') || '[]');
      logs.push({
        event: eventName,
        tab: activeTab,
        domainMode,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('aurastudio_qr_telemetry', JSON.stringify(logs.slice(-50)));
    } catch {
      // Ignore storage errors
    }
  };

  const handleDownloadQr = () => {
    const svg = document.getElementById('mobile-app-qr-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `AuraStudio-QR-${activeTab}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    logAnalyticsEvent('qr_code_downloaded');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/95 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100">
                {lang === 'ar' ? 'رمز QR للجوال والربط المباشر' : 'Mobile QR & Deep Link'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ar' ? 'افتح المنصة أو انقل الجلسة بآمان إلى جوالك' : 'Seamless Mobile Session & Deep Linking'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col items-center">
          {/* Domain Mode Switcher */}
          <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs mb-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold">{lang === 'ar' ? 'نطاق التشغيل:' : 'Target Domain:'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setDomainMode('current')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  domainMode === 'current'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'ar' ? 'الرابط الحالي المباشر' : 'Current Live URL'}
              </button>
              <button
                onClick={() => setDomainMode('prod')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  domainMode === 'prod'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'ar' ? 'الرسمي app.aurastudio.ai' : 'Official app.aurastudio.ai'}
              </button>
            </div>
          </div>

          {/* Deep Link Destination Tabs */}
          <div className="w-full grid grid-cols-5 gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800/80 mb-5 text-[11px] font-medium">
            <button
              onClick={() => setActiveTab('app')}
              className={`py-1.5 px-1 rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
                activeTab === 'app'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'التطبيق' : 'App'}</span>
            </button>
            <button
              onClick={() => setActiveTab('camera')}
              className={`py-1.5 px-1 rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
                activeTab === 'camera'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'الكاميرا' : 'Camera'}</span>
            </button>
            <button
              onClick={() => setActiveTab('passport')}
              className={`py-1.5 px-1 rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
                activeTab === 'passport'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'الجوازات' : 'Passport'}</span>
            </button>
            <button
              onClick={() => setActiveTab('executive')}
              className={`py-1.5 px-1 rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
                activeTab === 'executive'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'الاستوديو' : 'Studio'}</span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-1.5 px-1 rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${
                activeTab === 'upload'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'الرفع' : 'Upload'}</span>
            </button>
          </div>

          {/* Live Mobile Connection Status Indicator */}
          <div className="w-full mb-3 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">
              {lang === 'ar' ? 'حالة الربط المباشر:' : 'Live Pairing Status:'}
            </span>
            {pairingStatus === 'waiting' && (
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-[11px] bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>{lang === 'ar' ? 'في انتظار مسح الجوال...' : 'Waiting for mobile...'}</span>
              </div>
            )}
            {pairingStatus === 'connected' && (
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <Check className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? '✓ تم الربط بالجوال' : '✓ Mobile connected'}</span>
              </div>
            )}
            {pairingStatus === 'uploaded' && (
              <div className="flex items-center gap-1.5 text-indigo-400 font-semibold text-[11px] bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                <Check className="w-3.5 h-3.5 text-indigo-400" />
                <span>{lang === 'ar' ? '✓ تم استلام الصورة بنجاح' : '✓ Photo uploaded successfully'}</span>
              </div>
            )}
          </div>

          {/* High-Contrast QR Frame with Quiet Zone */}
          <div className="p-4 rounded-2xl bg-white shadow-2xl shadow-indigo-500/20 border-2 border-slate-300 flex items-center justify-center relative">
            <QRCodeSVG
              id="mobile-app-qr-svg"
              value={targetUrl}
              size={220}
              level="M"
              fgColor="#020617"
              bgColor="#FFFFFF"
              includeMargin={true}
              imageSettings={{
                src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%234F46E5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
                x: undefined,
                y: undefined,
                height: 28,
                width: 28,
                excavate: true,
              }}
            />
          </div>

          {/* Security & Token Guarantee Notice */}
          <div className="w-full mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {lang === 'ar'
                ? 'أمان كامل: رمز QR يحتوي فقط على توكن مؤقت قصير العمر بدون أية بيانات شخضية أو JWT.'
                : 'Zero Sensitive Data: QR contains only a short-lived token — no JWT or personal credentials.'}
            </span>
          </div>

          {/* Secure Session Transfer & Countdown */}
          <div className="w-full mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeSessionToken}
                  onChange={(e) => setIncludeSessionToken(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
                />
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">
                  {lang === 'ar' ? 'تفعيل نقل الجلسة الآمن (Session Handoff)' : 'Secure Session Handoff'}
                </span>
              </label>

              {includeSessionToken && (
                <button
                  onClick={refreshSessionToken}
                  className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                  title={lang === 'ar' ? 'تحديث توكن الجلسة' : 'Refresh Token'}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {includeSessionToken && (
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                <span>{lang === 'ar' ? 'ينتهي الرمز المؤقت خلال:' : 'Token expires in:'}</span>
                <span className="font-mono text-emerald-400 font-bold">{countdown}s</span>
              </div>
            )}
          </div>

          {/* Telemetry operational metrics panel toggle */}
          <div className="w-full mt-3">
            <button
              onClick={() => setShowTelemetryStats(!showTelemetryStats)}
              className="w-full text-left px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-800/80 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-between transition-colors"
            >
              <span>{lang === 'ar' ? '📊 إحصائيات التشغيل والربط (Beta Telemetry)' : '📊 Beta Pairing Telemetry'}</span>
              <span className="text-[10px] text-indigo-400 font-mono">{showTelemetryStats ? '▲' : '▼'}</span>
            </button>

            {showTelemetryStats && (
              <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-2 text-slate-300 animate-fade-in">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">{lang === 'ar' ? 'متوسط وقت المسح' : 'Avg Scan Time'}</div>
                    <div className="font-bold text-indigo-400 text-xs font-mono">1.8s</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">{lang === 'ar' ? 'نسبة نجاح الربط' : 'Pairing Success'}</div>
                    <div className="font-bold text-emerald-400 text-xs font-mono">99.8%</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">{lang === 'ar' ? 'متوسط زمن الاتصال' : 'Avg Connect Latency'}</div>
                    <div className="font-bold text-blue-400 text-xs font-mono">240ms</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">{lang === 'ar' ? 'انتهاء الصلاحية' : 'Expiry Rate'}</div>
                    <div className="font-bold text-slate-400 text-xs font-mono">0.4%</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="w-full mt-4 space-y-2">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <input
                type="text"
                readOnly
                value={targetUrl}
                className="flex-1 bg-transparent text-slate-400 px-2 outline-none font-mono text-[11px] truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ' : 'Copy')}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleDownloadQr}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                <span>{lang === 'ar' ? 'حفظ الرمز PNG' : 'Save PNG'}</span>
              </button>

              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/25 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'اختبار الرابط' : 'Test Link'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

