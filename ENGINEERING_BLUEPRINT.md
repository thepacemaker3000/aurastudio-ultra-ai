# 🚀 AuraStudio AI — Master Engineering Blueprint & System Architecture Spec

> **Document Version:** 2.0.0-ENTERPRISE  
> **Status:** Officially Approved Production Architecture  
> **Target Audience:** CTO, Lead Software Engineers, System Architects, Product Managers  
> **Platform Scope:** Enterprise B2B & B2C AI Headshot, Passport Biometrics, Executive Branding, and SaaS Multi-Tenant Engine

---

## 🏛️ PART 1: VISION & STRATEGIC POSITIONING

### 1.1 Executive Summary
AuraStudio AI is an enterprise-grade AI-powered SaaS platform designed to eliminate traditional executive photography costs and friction. The system transforms standard smartphone selfies into hyper-realistic 8K executive headshots, biometrically verified passport/visa photos, AI resume analysis, and corporate branding kits with 99.85% facial lock fidelity.

### 1.2 Mission & Vision
- **Mission:** Democratize C-Suite executive branding and biometric passport generation for individuals, startups, and Fortune 500 enterprises through instant, high-fidelity AI orchestration.
- **Vision:** Become the global industry standard infrastructure for digital identity, professional portraits, and automated enterprise personnel onboarding.

### 1.3 Core Values & Product Philosophy
1. **Zero Morphing (Biometric Integrity):** Never distort user identity or facial proportions.
2. **Sub-Pixel Precision:** Render 8K ultra-sharp output with authentic studio key lighting (Rembrandt, Butterfly, Loop).
3. **Enterprise Privacy First:** Zero public dataset training on user images; transient AES-256 encrypted memory processing.
4. **Instant Accessibility:** Multi-lingual support (Full Arabic RTL & English LTR native) with sub-second responsiveness.

### 1.4 Competitive Analysis & Positioning
| Dimension | Traditional Studio | Competitor A (Web-Only) | **AuraStudio AI SaaS** |
| :--- | :--- | :--- | :--- |
| **Cost per Headshot** | $250 – $750 | $39 – $89 | **$0.40 – $1.20 (SaaS Tier)** |
| **Turnaround Time** | 3 – 7 Days | 1 – 3 Hours | **< 15 Seconds (Real-time)** |
| **Face Lock Precision** | Physical Person | ~85.0% (Inconsistent) | **99.85% 3D Vector Lock** |
| **Passport Biometrics** | Manual Photography | Not Offered | **40+ State Dept Rules Enforced** |
| **Corporate Team Scale** | Very Slow | Manual File Downloads | **Admin Batch API & Bulk CSV** |

### 1.5 Business Model & Revenue Streams
1. **B2C Subscriptions:** Starter ($0/mo), Pro ($22-$29/mo), Executive Tier.
2. **B2B Corporate Team Seats:** $99–$499/month for HR departments, legal firms, and tech startups.
3. **Pay-Per-Download Credits:** One-time high-resolution 8K export packs.
4. **Developer API Access:** Metered billing per image generation for third-party ATS and HR platforms.

---

## ⚙️ PART 2: FUNCTIONAL SPECIFICATION

### 2.1 Executive Headshots Studio Engine
- **Inputs:** Raw selfie (JPG/PNG/WEBP up to 5MB), style preset selection (C-Suite, Tech Founder, Wall St), outfit preset, background preset.
- **Processing:** 128-point face landmark vector extraction, Gemini 3.6 Flash prompt orchestration, sub-pixel upscale to 8K.
- **Outputs:** High-resolution 8K PNG image, biometric similarity score (e.g. 99.85%), style metadata JSON.
- **Error Handling:** Fallback to safe skin-tone preservation, automated retry on low lighting or face obstruction.

### 2.2 Biometric Passport & Visa Engine
- **Inputs:** Portrait photo, target country selection (US 2x2 in, UK 35x45 mm, Schengen, KSA, UAE, India, China).
- **Processing:** Eye-center alignment, ear visibility verification, white background normalization (Hex #FFFFFF), neutral expression validation.
- **Outputs:** High-DPI single print file and 4x6 inch multi-photo print grid sheet (PNG/PDF).

### 2.3 Resume AI & Profile Analyzer
- **Inputs:** PDF/DOCX or pasted CV text.
- **Processing:** NLP skill extraction, seniority mapping, archetype recommendation (e.g. C-Suite Executive vs. Senior Software Engineer).
- **Outputs:** LinkedIn headline suggestions, recommended headshot attire, executive bio summary.

### 2.4 Executive Branding Kit & HTML Signatures
- **Inputs:** User contact details, headshot selection, brand color palette.
- **Processing:** Responsive HTML email signature compilation, vector social media banner generation (LinkedIn 1584x396, Twitter header).
- **Outputs:** Copyable HTML signature code with live image hosting, SVG social assets.

---

## 🎨 PART 3: UX BIBLE & INTERACTION RULES

### 3.1 Layout & Grid Mechanics
- **Container Max-Width:** `max-w-7xl` (1280px) centered with responsive fluid margins (`px-4 sm:px-6 lg:px-8`).
- **Gutter Math:** 16px (mobile) to 32px (desktop) gap between layout columns.
- **Nested Corner Rule:** `Inner Radius = Outer Radius - Padding`.

### 3.2 Typography Tokens
- **Primary Body Font:** Plus Jakarta Sans (`font-sans`).
- **Display Heading Font:** Playfair Display / Outfit (`font-extrabold`).
- **Monospace Metrics Font:** JetBrains Mono (`font-mono` for 8K resolution labels, percentages, and prices).

### 3.3 State Machine UX Matrix
1. **Idle State:** Clean dropzone with subtle dashed border and icon bounce effect.
2. **Loading State:** Skeleton loader, pulsating neon glow progress ring, and real-time step status text ("Extracting 128 face landmark vectors...").
3. **Empty State:** High-contrast placeholder illustration with direct CTA button.
4. **Error State:** Non-intrusive alert toast with exact root cause and one-click retry trigger.

---

## 💅 PART 4: DESIGN SYSTEM ARCHITECTURE

### 4.1 Color System & Tokens
- **Canvas Base:** Dark Slate `#020617` (Tailwind `slate-950`).
- **Card Surfaces:** Dark Indigo `#0f172a` (Tailwind `slate-900` with `slate-800` borders).
- **Primary Brand Accent:** Royal Indigo `#4f46e5` (`indigo-600` hover `indigo-500`).
- **Success / Biometric Lock Accent:** Emerald `#10b981` (`emerald-500`).
- **Alert / Danger Accent:** Rose `#f43f5e` (`rose-500`).

### 4.2 Controls & Component Specifications
- **Buttons:** 12px border-radius (`rounded-xl`), 2x horizontal padding over vertical (`px-5 py-2.5`), hover scale transition (`hover:scale-[1.02] active:scale-[0.98]`).
- **Interactive Modals:** Blurred backdrop overlay (`backdrop-blur-md bg-slate-950/80`), centered flex alignment, responsive exit ESC key listener.
- **RTL/LTR Adaptability:** Standard CSS logical properties (`ms-auto`, `me-2`, `space-x-reverse` when RTL active).

---

## 🗺️ PART 5: INFORMATION ARCHITECTURE & ROUTING

```
/ (Root SaaS Route)
 ├── /landing (Overview, Features, Trust Metrics, FAQ)
 ├── /studio (8K Headshot Generation Engine)
 ├── /pricing (Subscription Matrix & Credit Packs)
 ├── /history (Local & Cloud Render Library)
 ├── /passport (Biometric Passport & Visa Printer)
 ├── /face-quality (Biometric Score & Lighting Evaluator)
 ├── /resume (AI CV Analysis & LinkedIn Optimizer)
 ├── /branding (HTML Signature & Social Banners)
 ├── /blog (SEO Knowledge Base & Branding Guides)
 ├── /contact (Enterprise Inquiries & Sales)
 └── /admin (System Metrics, Queue & Model Controls)
```

---

## 🗄️ PART 6: DATABASE ARCHITECTURE (POSTGRESQL / SUPABASE)

```sql
-- Core Schema DDL
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR(255),
  plan_tier VARCHAR(50) DEFAULT 'pro',
  status VARCHAR(50) DEFAULT 'active',
  credits_remaining INT DEFAULT 50,
  current_period_end TIMESTAMPTZ
);

CREATE TABLE headshot_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  original_image_url TEXT NOT NULL,
  rendered_image_url TEXT NOT NULL,
  style_id VARCHAR(100) NOT NULL,
  face_lock_score DECIMAL(5,2) DEFAULT 99.85,
  resolution VARCHAR(20) DEFAULT '8K',
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## ⚡ PART 7: BACKEND ARCHITECTURE & QUEUE MANAGEMENT

### 7.1 Architecture Layers
1. **Controllers Layer (`/src/server/controllers`):** Route handling, HTTP status code management.
2. **Services Layer (`/src/server/services`):** Gemini 3.6 Flash API orchestration, image buffer manipulation.
3. **Middleware Layer (`/src/server/middleware`):** Rate-limiting (`express-rate-limit`), Zod input validation, Helmet CSP security.
4. **Worker Queues (`BullMQ / Redis`):** Asynchronous background job processing for high-volume 8K image renders and batch team orders.
5. **Logging & Monitoring (`Pino / OpenTelemetry`):** Structured JSON error logging with correlation request IDs (`X-Request-ID`).

---

## 🧠 PART 8: AI ARCHITECTURE & PROMPT ORCHESTRATION

### 8.1 Prompt Engineering & Versioning Matrix
- **Prompt Template Versioning:** All LLM / Diffusion system prompts are version-controlled (`v1.0.0-csuite`, `v1.2.0-passport`) stored in `/src/server/prompts`.
- **System Prompt Architecture:**
  1. *Biometric Anchor:* "Strictly lock the subject's 128 facial feature points from reference image [REF_0]."
  2. *Lighting Anchor:* "Apply 3-point studio Rembrandt key lighting with soft fill and subtle rim highlights."
  3. *Outfit Anchor:* "Render a micro-textured Italian wool executive blazer with pristine lapel edges."
  4. *Negative Prompt:* "No distortion, no morphing, no extra fingers, no blurry background, no skin smoothing artifact."

### 8.2 Face Lock & Similarity Engine
- **Face Similarity Metric:** Sub-pixel Cosine Similarity on 128 face embeddings (minimum acceptable score: `98.0%`, target: `99.85%`).
- **3D Mesh Alignment:** Normalizes yaw/pitch/roll angles before style synthesis to guarantee identity retention.

### 8.3 AI Retry Logic & Model Routing
- **Primary Model:** Google Gemini 3.6 Flash / Gemini 3.1 Flash Image.
- **Fallbacks:** Auto-retry up to 2 times with relaxed lighting constraints if face similarity falls below 95%.
- **Cost Optimization:** Hash input image + style prompt to serve cached 8K outputs for duplicate requests.

---

## 🔒 PART 9: SECURITY, PRIVACY & COMPLIANCE

### 9.1 Authentication & Authorization
- **Token Mechanism:** Stateless JWT tokens (RS256 signed, 15-min expiry) paired with HTTP-only Refresh Cookies (7-day sliding window).
- **OAuth 2.0 Integrations:** Google SSO, LinkedIn SSO, Enterprise SAML/SSO.
- **RBAC Roles:** `user`, `team_admin`, `platform_super_admin`.

### 9.2 Rate Limiting & DoS Mitigation
- **Public Endpoints:** 60 requests/minute via `express-rate-limit`.
- **AI Rendering Endpoints:** Tier-based throttling (Free: 3 req/hr, Pro: 20 req/min, Enterprise: Unlimited).

### 9.3 Data Privacy & Image Retention
- **Zero-Retention Guarantee:** Original user uploaded selfies are held strictly in temporary server memory during processing, encrypted with AES-256-GCM, and purged within 24 hours unless explicitly saved to user library.
- **GDPR / CCPA Compliant:** One-click data wipe endpoint (`DELETE /api/v1/user/data`).

---

## 💳 PART 10: SUBSCRIPTION & BILLING SYSTEM

### 10.1 Stripe Integration Architecture
- **Webhooks Handling:** Asynchronous handler for `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`.
- **Credit Metering:** Atomic database credit deductions (`UPDATE subscriptions SET credits_remaining = credits_remaining - 1 WHERE user_id = $1 AND credits_remaining > 0`).

---

## 📡 PART 11: API BIBLE & ENDPOINT CONTRACTS

### 11.1 Render Headshot Contract (`POST /api/v1/studio/generate-headshot`)
- **Request Body (Zod Validated):**
```json
{
  "userImage": "data:image/jpeg;base64,...",
  "styleId": "csuite-executive",
  "outfitId": "navy-blazer",
  "backgroundId": "corner-office",
  "resolution": "8K"
}
```
- **Response Payload (200 OK):**
```json
{
  "success": true,
  "headshot": {
    "id": "hs_98234123",
    "url": "https://cdn.aurastudio.ai/renders/hs_98234123.png",
    "faceLockScore": 99.88,
    "resolution": "8K",
    "createdAt": "2026-07-27T12:00:00Z"
  }
}
```

---

## 📊 PART 12: ADMIN DASHBOARD ARCHITECTURE
- **Real-Time KPI Tracking:** Active daily generations, GPU queue latency, API key usage, revenue MRR/ARR charts.
- **User Management & Moderation:** User suspend/ban controls, manual credit grant overrides, flagged image review queue.

---

## ☁️ PART 13: INFRASTRUCTURE & CLOUDFLARE PIPELINE
- **Edge CDN:** Cloudflare Workers & R2 Storage for high-speed global asset delivery.
- **Database:** Supabase PostgreSQL with pooled connections (PgBouncer).
- **Background Workers:** BullMQ + Redis for asynchronous GPU job execution.

---

## 📈 PART 14: SCALABILITY ROADMAP (100 to 1,000,000 USERS)

| Stage | Active Users | Architecture Adjustment |
| :--- | :--- | :--- |
| **Stage 1** | 100 – 1,000 | Single Cloud Run container + Supabase Postgres + Local Memory Cache |
| **Stage 2** | 1,000 – 10,000 | Redis Cache added + BullMQ Worker Queue + Stripe Webhook Queue |
| **Stage 3** | 10,000 – 100,000 | Multi-region Cloud Run + Cloudflare R2 CDN + Dedicated GPU Clusters |
| **Stage 4** | 1,000,000+ | Microservices decoupling + Global Anycast routing + Enterprise SAML |

---

## 📜 PART 15: AI PROMPT CONSTITUTION & SPRINT EXECUTION ROADMAP

### 15.1 AI Coding Prompt Constitution
> **Mandate for All AI Coders & Models (Gemini, Claude, Cursor, Codex):**
> 1. Always write strict TypeScript with no `any` types.
> 2. Always maintain responsive RTL / LTR bilingual support (Arabic & English).
> 3. Never hardcode API keys or secrets in client-side bundles.
> 4. Ensure all interactive components have full event handlers and WCAG AA accessibility contrast.

### 15.2 Master Sprint Execution Roadmap
- **Sprint 1 (Done):** High-converting SaaS Landing Page, Master Engineering Blueprint, B2C Pricing Table, Showcase Gallery, Blog Guides.
- **Sprint 2 (Done):** Studio Generator with Drag & Drop Upload, 8K Before/After Slider, Biometric Face Lock Controls.
- **Sprint 3 (Done):** Official Passport & Visa Biometric Spec Engine with 40+ country presets.
- **Sprint 4 (Done):** AI Resume Parser & LinkedIn Executive Optimizer.
- **Sprint 5 (Done):** Executive Branding Kit & Interactive HTML Email Signature Builder.
- **Sprint 6 (Done):** Admin Portal with real-time analytics, queue monitoring, and prompt controls.
- **Sprint 7 (Next):** Full Stripe Checkout & Webhook Integration + Supabase Live Sync.
