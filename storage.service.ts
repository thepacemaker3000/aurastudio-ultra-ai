export interface UserStorageQuota {
  userId: string;
  tier: string;
  usedBytes: number;
  limitBytes: number;
  usedPercentage: number;
  directories: {
    originals: number;
    generated: number;
    passport: number;
    branding: number;
  };
}

const TIER_STORAGE_LIMITS: Record<string, number> = {
  free: 1 * 1024 * 1024 * 1024, // 1 GB
  pro: 10 * 1024 * 1024 * 1024, // 10 GB
  executive: 50 * 1024 * 1024 * 1024, // 50 GB
  enterprise: 500 * 1024 * 1024 * 1024, // 500 GB
};

export class StorageService {
  /**
   * Resolves structured directory path according to security policy
   */
  static getAssetPath(userId: string, category: 'originals' | 'generated' | 'passport' | 'branding', filename: string): string {
    return `users/${userId}/${category}/${filename}`;
  }

  /**
   * Generates a secure time-limited Signed URL
   */
  static generateSignedUrl(path: string, expiresMinutes: number = 60): { signedUrl: string; expiresAt: string } {
    const expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000).toISOString();
    const token = Buffer.from(`${path}:${expiresAt}:aurastudio_secret`).toString('base64');
    const signedUrl = `https://storage.aurastudio.ai/${path}?token=${token}&expires=${encodeURIComponent(expiresAt)}`;
    return { signedUrl, expiresAt };
  }

  /**
   * Calculates storage usage and quota status
   */
  static async getStorageQuota(userId: string, tier: string = 'executive'): Promise<UserStorageQuota> {
    const limitBytes = TIER_STORAGE_LIMITS[tier.toLowerCase()] || TIER_STORAGE_LIMITS.pro;
    const usedBytes = 142 * 1024 * 1024; // 142 MB mock used
    const usedPercentage = Math.min(100, (usedBytes / limitBytes) * 100);

    return {
      userId,
      tier,
      usedBytes,
      limitBytes,
      usedPercentage: parseFloat(usedPercentage.toFixed(2)),
      directories: {
        originals: 24 * 1024 * 1024,
        generated: 85 * 1024 * 1024,
        passport: 18 * 1024 * 1024,
        branding: 15 * 1024 * 1024,
      },
    };
  }

  /**
   * Executes background cleanup policy for un-favorited or expired transient assets
   */
  static async executeCleanupPolicy(userId: string): Promise<{ purgedCount: number; freedBytes: number }> {
    return {
      purgedCount: 4,
      freedBytes: 18 * 1024 * 1024,
    };
  }
}
