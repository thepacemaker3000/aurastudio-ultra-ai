export interface SubscriptionPlan {
  id: string;
  nameEn: string;
  nameAr: string;
  monthlyPriceUsd: number;
  annualPriceUsd: number;
  monthlyCredits: number;
  storageLimitGb: number;
  featuresEn: string[];
  featuresAr: string[];
  stripePriceId: string;
}

export const SAAS_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    nameEn: 'Starter Free',
    nameAr: 'المجانية للبداية',
    monthlyPriceUsd: 0,
    annualPriceUsd: 0,
    monthlyCredits: 10,
    storageLimitGb: 1,
    featuresEn: [
      '10 AI Headshot Credits / Month',
      '2K High-Definition Resolution',
      'Standard Face Lock Precision',
      'Watermarked Previews',
    ],
    featuresAr: [
      '10 رصيد صور شهرياً',
      'دقة عالية Full HD (2K)',
      'تطابق المعالم الأساسية للوجه',
      'معاينة بصمة الخصوصية',
    ],
    stripePriceId: 'price_free_plan',
  },
  {
    id: 'pro',
    nameEn: 'Pro Professional',
    nameAr: 'احترافي Pro',
    monthlyPriceUsd: 29,
    annualPriceUsd: 290,
    monthlyCredits: 100,
    storageLimitGb: 10,
    featuresEn: [
      '100 AI Headshot Credits / Month',
      '4K Ultra HD Resolution',
      '99.8% Face Lock Fidelity',
      'Commercial Usage License',
      'Personal Brand Kit Builder',
    ],
    featuresAr: [
      '100 رصيد صور شهرياً',
      'دقة فائقة 4K Ultra HD',
      'نسبة ثبات معالم الوجه 99.8%',
      'ترخيص الاستخدام التجاري الكامل',
      'مستخرج الهوية البصرية وشعار العلامة',
    ],
    stripePriceId: 'price_pro_plan_monthly',
  },
  {
    id: 'executive',
    nameEn: 'Executive Suite',
    nameAr: 'الجناح التنفيذي Executive',
    monthlyPriceUsd: 79,
    annualPriceUsd: 790,
    monthlyCredits: 350,
    storageLimitGb: 50,
    featuresEn: [
      '350 AI Headshot Credits / Month',
      '8K Master Studio Resolution',
      'Unlimited Passport Compliance Scans',
      'AI Resume Match Intelligence',
      'Priority GPU Generation Queue',
    ],
    featuresAr: [
      '350 رصيد صور شهرياً',
      'دقة سينمائية 8K Master',
      'فحص مفتوح لجوازات السفر والسفارات',
      'ذكاء مطابقة السيرة الذاتية ووظائف C-Suite',
      'أولوية التوليد على خوادم GPU السريعة',
    ],
    stripePriceId: 'price_exec_plan_monthly',
  },
  {
    id: 'enterprise',
    nameEn: 'Enterprise Organization',
    nameAr: 'المؤسسات والشركات Enterprise',
    monthlyPriceUsd: 299,
    annualPriceUsd: 2990,
    monthlyCredits: 2000,
    storageLimitGb: 500,
    featuresEn: [
      '2,000 Team Credits / Month',
      'Team Member Portal & Delegation',
      'Custom Style Presets Engineering',
      'SAML SSO & Audit Log Retention',
      'Dedicated Customer Success Account',
    ],
    featuresAr: [
      '2,000 رصيد لفريق العمل شهرياً',
      'بوابة أفراد الفريق وتفويض الأذونات',
      'تطوير أنماط مخصصة لهوية الشركة',
      'دخول موحد SAML SSO وحفظ سجلات المراجعة',
      'مدير حساب خاص لضمان نجاح المؤسسة',
    ],
    stripePriceId: 'price_enterprise_plan_monthly',
  },
];

export interface CreditPackage {
  id: string;
  credits: number;
  priceUsd: number;
  discountBadge?: string;
  discountBadgeAr?: string;
}

export const CREDIT_TOPUP_PACKAGES: CreditPackage[] = [
  { id: 'pack_20', credits: 20, priceUsd: 9 },
  { id: 'pack_50', credits: 50, priceUsd: 19, discountBadge: 'Popular', discountBadgeAr: 'الأكثر طلباً' },
  { id: 'pack_150', credits: 150, priceUsd: 49, discountBadge: 'Save 25%', discountBadgeAr: 'وفر 25%' },
  { id: 'pack_500', credits: 500, priceUsd: 129, discountBadge: 'Best Value', discountBadgeAr: 'أفضل قيمة' },
];

export class StripeService {
  /**
   * Creates a simulated Stripe Checkout session URL
   */
  static async createCheckoutSession(
    userId: string,
    planIdOrPackageId: string,
    couponCode?: string
  ): Promise<{ checkoutUrl: string; sessionId: string; amountUsd: number }> {
    const sessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    let price = 29;
    if (couponCode && couponCode.toUpperCase() === 'BETA50') {
      price = price * 0.5; // 50% beta discount
    }

    return {
      checkoutUrl: `https://checkout.stripe.com/pay/${sessionId}`,
      sessionId,
      amountUsd: price,
    };
  }

  /**
   * Processes Stripe Webhooks
   */
  static async handleWebhook(
    event: { type: string; data: any }
  ): Promise<{ status: string; processedEvent: string }> {
    switch (event.type) {
      case 'invoice.payment_succeeded':
        return { status: 'success', processedEvent: 'CREDITS_GRANTED_UPON_RENEWAL' };
      case 'customer.subscription.updated':
        return { status: 'success', processedEvent: 'SUBSCRIPTION_TIER_UPDATED' };
      case 'customer.subscription.deleted':
        return { status: 'success', processedEvent: 'SUBSCRIPTION_DOWNGRADED_TO_FREE' };
      default:
        return { status: 'ignored', processedEvent: event.type };
    }
  }

  /**
   * Validates promotional coupon codes
   */
  static validateCoupon(code: string): { valid: boolean; discountPercent: number; codeName: string } {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BETA50') {
      return { valid: true, discountPercent: 50, codeName: 'Closed Beta Partner 50% OFF' };
    }
    if (cleanCode === 'EXECUTIVE2026') {
      return { valid: true, discountPercent: 20, codeName: 'Executive Suite 20% OFF' };
    }
    return { valid: false, discountPercent: 0, codeName: '' };
  }
}
