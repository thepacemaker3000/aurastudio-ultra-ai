export interface PromptTemplate {
  id: string;
  version: string;
  category: string;
  systemInstruction: string;
  templateString: string;
  templateStringAr: string;
}

export class PromptManager {
  private templates: Map<string, PromptTemplate> = new Map();

  constructor() {
    this.registerDefaultTemplates();
  }

  private registerDefaultTemplates() {
    this.templates.set('headshot_executive_v2', {
      id: 'headshot_executive_v2',
      version: '2.1.0-ultra',
      category: 'executive',
      systemInstruction: 'You are an award-winning Fortune 500 portrait director and lighting engineer.',
      templateString: '8K hyper-photorealistic executive portrait, {styleName}, wearing {outfitName}, against {backgroundName}. Lighting: {lightingKey}, Lens: {lensFocalLength}, Camera Angle: {cameraAngle}. Preserve 99.82% facial feature geometry lock, natural pore texture, no AI plastic smoothing.',
      templateStringAr: 'بورتريه تنفيذي فائق الواقعية بدقة 8K، نمط {styleName}، يرتدي {outfitName}، أمام خلفية {backgroundName}. إضاءة {lightingKey}، عدسة {lensFocalLength}. تطابق ملامح الوجه 99.82%.',
    });

    this.templates.set('face_quality_eval_v1', {
      id: 'face_quality_eval_v1',
      version: '1.2.0',
      category: 'evaluation',
      systemInstruction: 'You are an AI biometric face quality and lighting evaluator for official portraits.',
      templateString: 'Evaluate face image {imageUrl} for executive portrait synthesis suitability. Assess overallScore, smileScore, eyeContactScore, executivePresenceScore, lightingScore, skinFidelityScore (80-99). Provide actionable tips.',
      templateStringAr: 'تقييم جودة الصورة {imageUrl} لاستبدال خلفية وبورتريه قيادي. استخراج الدرجات من 80 إلى 99 وتوفير توصيات باللغة العربية.',
    });

    this.templates.set('resume_intelligence_v1', {
      id: 'resume_intelligence_v1',
      version: '1.0.0',
      category: 'resume',
      systemInstruction: 'You are an elite C-suite talent partner and personal branding strategist.',
      templateString: 'Analyze candidate CV summary: "{cvText}". Extract candidateName, parsedRole, experienceLevel, topSkills, recommendedStyles, recommendedOutfit, recommendedBackground, and LinkedIn bio optimization advice.',
      templateStringAr: 'تحليل السيرة الذاتية واستخراج التوصيات ومقترحات المظهر للبروفايل التنفيذي.',
    });
  }

  public getTemplate(id: string): PromptTemplate | undefined {
    return this.templates.get(id);
  }

  public interpolate(templateId: string, params: Record<string, string>, lang: 'en' | 'ar' = 'en'): { prompt: string; systemInstruction: string; version: string } {
    const tpl = this.templates.get(templateId);
    if (!tpl) {
      return {
        prompt: `8K photorealistic executive headshot, ${params.styleName || 'Executive Style'}`,
        systemInstruction: 'You are an AI headshot generator.',
        version: '1.0.0-fallback',
      };
    }

    let raw = lang === 'ar' ? tpl.templateStringAr : tpl.templateString;
    for (const [k, v] of Object.entries(params)) {
      raw = raw.replace(new RegExp(`\\{${k}\\}`, 'g'), v || '');
    }

    return {
      prompt: raw,
      systemInstruction: tpl.systemInstruction,
      version: tpl.version,
    };
  }
}

export const promptManager = new PromptManager();
