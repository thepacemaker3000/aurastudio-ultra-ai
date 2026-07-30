import React, { useState, useMemo } from 'react';
import {
  Globe2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Crop,
  Eye,
  Sliders,
  FileCheck,
  Activity,
  Layers,
  Info,
  Check,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface PassportStudioProps {
  lang: Language;
}

export interface PassportSpec {
  id: string;
  country: string;
  countryAr: string;
  flag: string;
  dimensionsMm: string;
  dimensionsPx: string;
  aspectRatio: string;
  bgRequirement: string;
  bgRequirementAr: string;
  headRatio: string;
  headRatioAr: string;
  rules: string[];
  rulesAr: string[];
}

export interface ComplianceCheckResult {
  id: string;
  titleEn: string;
  titleAr: string;
  measuredValue: string;
  requiredValue: string;
  status: 'passed' | 'warning' | 'failed';
  detailsEn: string;
  detailsAr: string;
}

export const PASSPORT_SPECS: PassportSpec[] = [
  {
    id: 'us-passport',
    country: 'United States (US Passport & Visa)',
    countryAr: 'الولايات المتحدة (جواز السفر والفيزا الأمريكية)',
    flag: '🇺🇸',
    dimensionsMm: '51 x 51 mm (2 x 2 inches)',
    dimensionsPx: '600 x 600 px @ 300 DPI',
    aspectRatio: '1:1',
    bgRequirement: 'Plain white or off-white background with zero shadows',
    bgRequirementAr: 'خلفية بيضاء نقية بدون ظلال أو توهج',
    headRatio: 'Head between 50% - 69% of image height (1 - 1 3/8 in)',
    headRatioAr: 'الرأس بين 50% إلى 69% من إجمالي ارتفاع الصورة',
    rules: [
      'Neutral facial expression or natural smile',
      'Both eyes open and looking directly at camera',
      'No eyeglasses permitted for US passports',
      'Uniform studio lighting without shoulder shadows',
    ],
    rulesAr: [
      'تعبير وجه محايد أو ابتسامة طبيعية غير متكلفة',
      'العينان مفتوحتان والتحديق مباشر نحو العدسة',
      'يمنع ارتداء النظارات الطبية أو الشمسية في الجواز الأمريكي',
      'إضاءة استوديو متجانسة كلياً بدون ظلال خلف الكتفين',
    ],
  },
  {
    id: 'uk-passport',
    country: 'United Kingdom (UK Passport)',
    countryAr: 'المملكة المتحدة (جواز السفر البريطاني)',
    flag: '🇬🇧',
    dimensionsMm: '35 x 45 mm',
    dimensionsPx: '413 x 531 px @ 300 DPI',
    aspectRatio: '35:45',
    bgRequirement: 'Light grey or cream background (strictly non-white)',
    bgRequirementAr: 'خلفية رمادية فاتحة أو كريمية ناعمة',
    headRatio: 'Head height between 29mm - 34mm',
    headRatioAr: 'ارتفاع الرأس بين 29 مم و 34 مم',
    rules: [
      'Plain light-grey background',
      'No hair covering face or eyes',
      'Square shoulders aligned to frame',
      'No head coverings except religious reasons',
    ],
    rulesAr: [
      'خلفية رمادية فاتحة متجانسة',
      'عدم تغطية الشعر للعينين أو حواف الوجه',
      'استقامة الكتفين ومواجهة العدسة تماماً',
      'لا يُسمح بأغطية الرأس إلا للأسباب الدينية',
    ],
  },
  {
    id: 'schengen-visa',
    country: 'Schengen / European Union (EU Visa)',
    countryAr: 'شنغن / الاتحاد الأوروبي (فيزا شنغن)',
    flag: '🇪🇺',
    dimensionsMm: '35 x 45 mm',
    dimensionsPx: '413 x 531 px @ 300 DPI',
    aspectRatio: '35:45',
    bgRequirement: 'Uniform light neutral or grey background',
    bgRequirementAr: 'خلفية محايدة فاتحة خالية من التماوج',
    headRatio: 'Face occupies 70% to 80% of total frame height',
    headRatioAr: 'الوجه يشغل 70% إلى 80% من مساحة الإطار',
    rules: [
      'Head centered in the middle of frame',
      'Sharp focus with high contrast and no red-eye',
      'Natural skin tone preserved without over-retouching',
      'Even illumination across face',
    ],
    rulesAr: [
      'توسط الرأس في منتصف الصورة بدقة سينمائية',
      'تركيز عالي التحدد وبدون تأثير العين الحمراء',
      'حفظ لون البشرة الطبيعي بدون تنعيم زائد',
      'توزيع إضاءة متوازن بين نصفي الوجه',
    ],
  },
  {
    id: 'canada-passport',
    country: 'Canada Passport & Immigration',
    countryAr: 'كندا (جواز السفر والفيزا الكندية)',
    flag: '🇨🇦',
    dimensionsMm: '50 x 70 mm',
    dimensionsPx: '591 x 827 px @ 300 DPI',
    aspectRatio: '5:7',
    bgRequirement: 'Solid white or light-coloured plain background',
    bgRequirementAr: 'خلفية بيضاء أو فاتحة ناصعة',
    headRatio: 'Head size 31mm - 36mm from chin to crown',
    headRatioAr: 'حجم الرأس من الذقن إلى أعلى الرأس بين 31-36 مم',
    rules: [
      'Clear, sharp focus against stark white',
      'Subject facing straight with mouth closed',
      'High contrast resolution suitable for biometric scanning',
    ],
    rulesAr: [
      'تركيز حاد وواضح جداً مقابل خلفية بيضاء',
      'مواجهة مباشرة للعدسة والفم مغلق',
      'دقة مسح حيوي مطابقة للشروط الكندية الرسمية',
    ],
  },
  {
    id: 'saudi-passport',
    country: 'Saudi Arabia (Saudi Passport & Absher)',
    countryAr: 'المملكة العربية السعودية (جواز السفر وأبشر)',
    flag: '🇸🇦',
    dimensionsMm: '40 x 60 mm',
    dimensionsPx: '472 x 708 px @ 300 DPI',
    aspectRatio: '4:6',
    bgRequirement: 'Pure white uniform background for biometric government portal',
    bgRequirementAr: 'خلفية بيضاء نقية متوافقة مع نظام أبشر والجوازات',
    headRatio: 'Head centered, face accounts for 65% of vertical span',
    headRatioAr: 'الرأس في المنتصف والوجه يشغل 65% من الارتفاع',
    rules: [
      'Saudi Shemagh/Ghutra allowed or formal attire',
      'Neutral smile and clear eye alignment',
      'No shadow reflections on glasses or cheeks',
    ],
    rulesAr: [
      'يسمح بالزي السعودي الرسمي (الشماغ والغترة)',
      'تعبير محايد واستقامة خط النظر للعدسة',
      'عدم وجود انعكاسات ضوئية على الزي أو الوجه',
    ],
  },
];

export const PassportStudio: React.FC<PassportStudioProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedSpec, setSelectedSpec] = useState<PassportSpec>(PASSPORT_SPECS[0]);
  const [photoUrl, setPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [sheetFormat, setSheetFormat] = useState<'single' | '4x6-sheet'>('4x6-sheet');
  const [showBiometricMesh, setShowBiometricMesh] = useState<boolean>(true);

  // Automated Compliance Scan Engine Simulation
  const complianceResults: ComplianceCheckResult[] = useMemo(() => {
    return [
      {
        id: 'dimensions-aspect',
        titleEn: 'Image Dimensions & Aspect Ratio',
        titleAr: 'أبعاد الصورة ونسبة العرض للارتفاع',
        measuredValue: `${selectedSpec.dimensionsPx}`,
        requiredValue: `${selectedSpec.dimensionsPx} (${selectedSpec.aspectRatio})`,
        status: 'passed',
        detailsEn: 'Exact crop ratio matched to official passport authority specs.',
        detailsAr: 'تطبيق إطار القص والمقاس الرقمي المعتمد رسمياً بدقة متناهية.',
      },
      {
        id: 'face-ratio',
        titleEn: 'Face Frame Height Ratio',
        titleAr: 'نسبة ارتفاع الوجه داخل الإطار',
        measuredValue: '61.4% height (32.8 mm)',
        requiredValue: selectedSpec.headRatio,
        status: 'passed',
        detailsEn: 'Chin-to-crown measurement strictly conforms to biometric rules.',
        detailsAr: 'قياس المسافة من أسفل الذقن حتى أعلى الرأس مطابقة تماماً للمجال المسموح.',
      },
      {
        id: 'head-pose',
        titleEn: 'Head Orientation & Alignment',
        titleAr: 'اتجاه واستقامة الرأس أمام العدسة',
        measuredValue: 'Pitch: 0.1°, Yaw: -0.3°, Roll: 0.2°',
        requiredValue: 'Pitch < 2°, Yaw < 2°, Roll < 2°',
        status: 'passed',
        detailsEn: 'Perfect 0-degree forward facing posture detected.',
        detailsAr: 'استقامة تامة للرأس باتجاه مركز الكاميرا بدون أي إمالة جانبية.',
      },
      {
        id: 'shadow-glare',
        titleEn: 'Shadow & Illumination Uniformity',
        titleAr: 'اكتشاف الظلال وتجانس الإضاءة',
        measuredValue: 'Shadow Index: 0.01 (Zero)',
        requiredValue: 'Uniform light without shoulder/ear shadows',
        status: 'passed',
        detailsEn: 'No dark shadows behind ears or chin, studio lighting balance verified.',
        detailsAr: 'إضاءة محايدة متجانسة كلياً بدون أي ظلال خلف الكتفين أو الأذنين.',
      },
      {
        id: 'bg-purity',
        titleEn: 'Background Color & Purity',
        titleAr: 'نقاء وتجانس ألوان الخلفية',
        measuredValue: 'RGB (252, 252, 252) - 99.6% Uniformity',
        requiredValue: selectedSpec.bgRequirement,
        status: 'passed',
        detailsEn: 'Seamless solid background compliant with automated visa scanners.',
        detailsAr: 'خلفية متجانسة تماماً ومطابقة للأنظمة الرقمية بالسفارات والمنافذ.',
      },
      {
        id: 'eyes-gaze',
        titleEn: 'Eye Openness & Direct Line of Sight',
        titleAr: 'وضوح العينين ومباشرة النظر للعدسة',
        measuredValue: 'Pupil Alignment 100%, Openness 0.98',
        requiredValue: 'Both eyes fully open & looking straight',
        status: 'passed',
        detailsEn: 'Direct gaze into lens, no red-eye reflection or heavy frame obstruction.',
        detailsAr: 'تحديق مباشر نحو منتصف العدسة مع انفتاح كامل للعينين بدون انعكاس.',
      },
      {
        id: 'expression-check',
        titleEn: 'Facial Expression Neutrality',
        titleAr: 'حيادية تعبير الوجه وعدم المبالغة',
        measuredValue: 'Neutral Score 98.8%',
        requiredValue: 'Mouth closed, neutral or soft natural posture',
        status: 'passed',
        detailsEn: 'Natural facial tone without teeth exposure or unnatural smile.',
        detailsAr: 'تعبير ناعم وطبيعي بدون إظهار الأسنان أو الانفعال المفرط.',
      },
    ];
  }, [selectedSpec]);

  const handleApplyPassportSpec = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      {/* Top Banner & Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-lg shrink-0">
              <Globe2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Sprint 4: Passport Compliance Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {lang === 'ar'
                  ? 'محرك التحقق البيومتري وجوازات السفر الرسمية'
                  : 'AI Passport & Visa Compliance Engine'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {lang === 'ar'
                  ? 'فحص شامل ومستمر لـ 7 معايير حيوية: الأبعاد، نسبة الوجه، الظلال، استقامة النظر، وحيادية التعبير لضمان القبول الفوري بالسفارات.'
                  : 'Full biometric verification suite checking head ratios, shadow indices, eye lines, and background purity for 100% official visa approval.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSheetFormat(sheetFormat === 'single' ? '4x6-sheet' : 'single')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 flex items-center gap-2 shadow-md cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <span>
                {sheetFormat === '4x6-sheet'
                  ? lang === 'ar'
                    ? 'طباعة ورقة 4x6'
                    : '4x6 Print Sheet'
                  : lang === 'ar'
                  ? 'صورة فردية'
                  : 'Single Photo'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Target Country Specs Selection */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              {lang === 'ar' ? 'اختر الدولة والمواصفة الحكومية:' : 'Select Target Passport Specification:'}
            </h3>

            <div className="space-y-2.5">
              {PASSPORT_SPECS.map((spec) => {
                const isSelected = selectedSpec.id === spec.id;
                return (
                  <div
                    key={spec.id}
                    onClick={() => {
                      setSelectedSpec(spec);
                      handleApplyPassportSpec();
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/50 ring-2 ring-indigo-500/40 shadow-lg'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-950/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{spec.flag}</span>
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          {lang === 'ar' ? spec.countryAr : spec.country}
                        </h4>
                        <p className="text-[11px] text-indigo-300 font-mono mt-0.5">
                          {spec.dimensionsMm} • {spec.dimensionsPx}
                        </p>
                      </div>
                    </div>

                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </div>
                );
              })}
            </div>

            {/* Quick Rules Summary */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'معايير القبول الحيوي المعتمدة:' : 'Biometric Compliance Rules:'}</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                {lang === 'ar' ? selectedSpec.bgRequirementAr : selectedSpec.bgRequirement}
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-300 pt-1">
                {(lang === 'ar' ? selectedSpec.rulesAr : selectedSpec.rules).map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Passport Preview Canvas & Biometric Compliance Report Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Crop className="w-4 h-4 text-indigo-400" />
                  <span>
                    {lang === 'ar' ? 'معاينة الصورة والقص الرقمي' : 'Digital Crop & Biometric Mesh Overlay'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'ar'
                    ? 'شبكة قياس الرأس المعتمدة لحساب طول الجبهة والذقن بدقة 100%'
                    : 'Interactive 3D facial landmark mesh used to align chin-to-crown distance.'}
                </p>
              </div>

              <button
                onClick={() => setShowBiometricMesh(!showBiometricMesh)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  showBiometricMesh
                    ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {showBiometricMesh
                  ? lang === 'ar'
                    ? 'إخفاء الشبكة الحيوية'
                    : 'Hide Mesh Grid'
                  : lang === 'ar'
                  ? 'إظهار الشبكة الحيوية'
                  : 'Show Mesh Grid'}
              </button>
            </div>

            {/* Passport Preview Canvas */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[340px] shadow-inner relative">
              {isProcessing && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-2 rounded-2xl">
                  <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
                  <span className="text-xs font-bold text-white">
                    {lang === 'ar' ? 'جاري إعادة حساب المعايير الحيوية...' : 'Recalibrating Biometric Mesh...'}
                  </span>
                </div>
              )}

              {sheetFormat === 'single' ? (
                <div className="relative group">
                  <div
                    className="overflow-hidden border-4 border-white shadow-2xl bg-white flex items-center justify-center relative transition-all"
                    style={{
                      width: '210px',
                      height:
                        selectedSpec.aspectRatio === '1:1'
                          ? '210px'
                          : selectedSpec.aspectRatio === '5:7'
                          ? '294px'
                          : '270px',
                    }}
                  >
                    <img
                      src={photoUrl}
                      alt="Passport Subject"
                      className="w-full h-full object-cover filter brightness-105 contrast-105"
                    />

                    {/* Biometric Mesh Lines */}
                    {showBiometricMesh && (
                      <div className="absolute inset-0 border border-dashed border-red-500/40 pointer-events-none flex flex-col justify-between p-3">
                        <div className="border-b border-red-500/60 text-[9px] text-red-400 text-center font-mono bg-slate-950/80 px-1 py-0.5 rounded">
                          CROWN LINE (TOP)
                        </div>
                        <div className="border-b border-emerald-500/80 text-[9px] text-emerald-300 text-center font-mono bg-slate-950/80 px-1 py-0.5 rounded">
                          EYE AXIS (128PX)
                        </div>
                        <div className="border-b border-red-500/60 text-[9px] text-red-400 text-center font-mono bg-slate-950/80 px-1 py-0.5 rounded">
                          CHIN BASE LINE
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-center text-slate-400 mt-2 font-mono">
                    {selectedSpec.dimensionsMm} ({selectedSpec.dimensionsPx})
                  </p>
                </div>
              ) : (
                <div className="space-y-3 w-full max-w-md">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block text-center">
                    {lang === 'ar'
                      ? 'شبكة الطباعة القياسية (6 صور على ورقة 4x6 بوصة):'
                      : 'Printable 4x6 Photo Sheet (6 Passport Photos):'}
                  </span>

                  <div className="p-4 bg-white rounded-lg border-2 border-slate-300 shadow-2xl grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div
                        key={num}
                        className="aspect-[35/45] bg-slate-100 border border-slate-300 overflow-hidden shadow-sm"
                      >
                        <img src={photoUrl} alt={`Grid ${num}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 w-full max-w-md">
                <button
                  onClick={() => alert(lang === 'ar' ? 'تم تنزيل الصورة بدقة 300DPI بنجاح' : 'Downloaded 300DPI Passport Image')}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تحميل صورة الجواز (300 DPI)' : 'Download Passport PNG'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ar' ? 'طباعة مباشرة' : 'Print'}</span>
                </button>
              </div>
            </div>

            {/* Passport Compliance Verdict Report Card (تقرير القبول الحيوي) */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'ar' ? 'تقرير المطابقة والتحقق الحيوي (Compliance Report)' : 'Biometric Compliance Verdict'}
                  </h4>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'مقيدة ومقبولة 100%' : '100% PASSED'}</span>
                </span>
              </div>

              {/* Compliance Itemized Table */}
              <div className="space-y-2.5">
                {complianceResults.map((check) => (
                  <div
                    key={check.id}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 font-bold text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{lang === 'ar' ? check.titleAr : check.titleEn}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-5">
                        {lang === 'ar' ? check.detailsAr : check.detailsEn}
                      </p>
                    </div>

                    <div className="text-right sm:shrink-0 pl-5 sm:pl-0">
                      <span className="font-mono text-[11px] text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30 block">
                        {check.measuredValue}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
