import { pgTable, uuid, varchar, text, integer, timestamp, boolean, jsonb, decimal, index } from 'drizzle-orm/pg-core';

// 1. Users Table
export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }),
    fullName: varchar('full_name', { length: 100 }),
    avatarUrl: text('avatar_url'),
    role: varchar('role', { length: 20 }).default('user').notNull(), // 'user', 'admin', 'team_lead'
    languagePreference: varchar('language_preference', { length: 5 }).default('ar').notNull(), // 'ar', 'en'
    tier: varchar('tier', { length: 20 }).default('free').notNull(), // 'free', 'pro', 'executive', 'enterprise'
    creditsRemaining: integer('credits_remaining').default(10).notNull(),
    creditsHeld: integer('credits_held').default(0).notNull(),
    storageUsedBytes: integer('storage_used_bytes').default(0).notNull(),
    storageLimitBytes: integer('storage_limit_bytes').default(1073741824).notNull(), // 1 GB default
    stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
    stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
    isEmailVerified: boolean('is_email_verified').default(false).notNull(),
    twoFactorEnabled: boolean('two_factor_enabled').default(false).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index('users_email_idx').on(table.email),
    stripeCustomerIdx: index('users_stripe_customer_idx').on(table.stripeCustomerId),
  })
);

// 2. Auth Sessions Table
export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    token: text('token').notNull().unique(),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    isRevoked: boolean('is_revoked').default(false).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('sessions_user_id_idx').on(table.userId),
    tokenIdx: index('sessions_token_idx').on(table.token),
  })
);

// 3. Headshot Generations Table
export const generations = pgTable(
  'generations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    category: varchar('category', { length: 50 }).notNull(), // 'executive', 'passport', 'outfit', 'background', 'video'
    stylePresetId: varchar('style_preset_id', { length: 100 }).notNull(),
    promptUsed: text('prompt_used').notNull(),
    promptVersion: varchar('prompt_version', { length: 20 }).default('1.0.0').notNull(),

    // Storage URLs (following users/{user-id}/generated/ pattern)
    inputImageUrl: text('input_image_url').notNull(),
    outputImageUrl: text('output_image_url'),
    thumbnailUrl: text('thumbnail_url'),

    // Fidelity & Quality Metrics
    faceLockScore: decimal('face_lock_score', { precision: 5, scale: 2 }),
    lightingScore: decimal('lighting_score', { precision: 5, scale: 2 }),
    overallQualityScore: decimal('overall_quality_score', { precision: 5, scale: 2 }),

    // Status & Metadata
    status: varchar('status', { length: 20 }).default('pending').notNull(), // 'pending', 'processing', 'completed', 'failed'
    errorMessage: text('error_message'),
    generationTimeMs: integer('generation_time_ms'),
    tokenCostInCredits: integer('token_cost_in_credits').default(1).notNull(),

    // Flags & Retention Lifecycle
    isFavorite: boolean('is_favorite').default(false).notNull(),
    isPurged: boolean('is_purged').default(false).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('generations_user_id_idx').on(table.userId),
    statusIdx: index('generations_status_idx').on(table.status),
    createdCategoryIdx: index('generations_created_category_idx').on(table.createdAt, table.category),
  })
);

// 4. Favorites Table
export const favorites = pgTable(
  'favorites',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    generationId: uuid('generation_id').references(() => generations.id, { onDelete: 'cascade' }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userFavIdx: index('favorites_user_id_idx').on(table.userId),
  })
);

// 5. Immutable Credit Transactions Ledger Table
export const creditTransactions = pgTable(
  'credit_transactions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    type: varchar('type', { length: 20 }).notNull(), // 'grant', 'hold', 'commit', 'refund', 'purchase', 'bonus'
    amount: integer('amount').notNull(),
    balanceBefore: integer('balance_before').notNull(),
    balanceAfter: integer('balance_after').notNull(),
    referenceId: varchar('reference_id', { length: 100 }), // Generation ID or Payment ID
    description: text('description').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userTransIdx: index('credit_transactions_user_id_idx').on(table.userId),
    typeIdx: index('credit_transactions_type_idx').on(table.type),
  })
);

// 6. Subscription Plans Table
export const subscriptionPlans = pgTable('subscription_plans', {
  id: varchar('id', { length: 50 }).primaryKey(), // 'free', 'pro', 'executive', 'enterprise'
  nameEn: varchar('name_en', { length: 100 }).notNull(),
  nameAr: varchar('name_ar', { length: 100 }).notNull(),
  monthlyPriceUsd: decimal('monthly_price_usd', { precision: 10, scale: 2 }).notNull(),
  monthlyCredits: integer('monthly_credits').notNull(),
  storageLimitGb: integer('storage_limit_gb').default(1).notNull(),
  featuresJson: jsonb('features_json'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 7. Payments & Billing Table
export const payments = pgTable(
  'payments',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }),
    amountUsd: decimal('amount_usd', { precision: 10, scale: 2 }).notNull(),
    currency: varchar('currency', { length: 10 }).default('usd').notNull(),
    status: varchar('status', { length: 20 }).default('succeeded').notNull(), // 'succeeded', 'pending', 'failed', 'refunded'
    creditsGranted: integer('credits_granted').notNull(),
    receiptUrl: text('receipt_url'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userPaymentIdx: index('payments_user_id_idx').on(table.userId),
  })
);

// 8. Passport Photo Orders Table
export const passportOrders = pgTable('passport_orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  generationId: uuid('generation_id').references(() => generations.id, { onDelete: 'set null' }),
  countryCode: varchar('country_code', { length: 10 }).notNull(), // 'US', 'UK', 'CA', 'SCHENGEN', 'SA'
  targetWidthMm: integer('target_width_mm').notNull(),
  targetHeightMm: integer('target_height_mm').notNull(),
  backgroundColorHex: varchar('background_color_hex', { length: 10 }).default('#FFFFFF').notNull(),
  compliancePassed: boolean('compliance_passed').default(true).notNull(),
  printSheetUrl: text('print_sheet_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 9. Audit Logs Table
export const auditLogs = pgTable(
  'audit_logs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    action: varchar('action', { length: 100 }).notNull(),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    detailsJson: jsonb('details_json'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('audit_logs_user_id_idx').on(table.userId),
    actionIdx: index('audit_logs_action_idx').on(table.action),
    createdAtIdx: index('audit_logs_created_at_idx').on(table.createdAt),
  })
);
