import { Pool } from 'pg';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export interface CompanyInfo {
  id: string;
  name: string;
  tagline: string;
  hero_title: string;
  hero_subtitle: string;
  about_narrative: string;
  about_mission: string;
  stats: Array<{ label: string; value: string; suffix?: string; description?: string }>;
  contact_email: string;
  contact_phone: string;
  address: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    app_store?: string;
    play_store?: string;
  };
  updated_at?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: 'Mobile App' | 'Game' | 'Web Platform';
  description: string;
  long_description?: string;
  icon_url: string;
  mockup_url: string;
  banner_url?: string;
  screenshots: string[];
  feature_list: string[];
  tech_stack: string[];
  play_store_url?: string;
  app_store_url?: string;
  web_url?: string;
  rating: number;
  total_downloads: string;
  release_date: string;
  is_featured: boolean;
  is_visible: boolean;
  display_order: number;
  created_at?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  full_description: string;
  icon_name: string;
  deliverables: string[];
  technologies: string[];
  badge_text?: string;
  display_order: number;
}

export interface LegalPage {
  id: string;
  slug: string;
  title: string;
  last_updated: string;
  content_markdown: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  created_at?: string;
}

export interface ClientLead {
  id: string;
  full_name: string;
  email: string;
  company?: string;
  project_type: string;
  budget_range: string;
  timeline?: string;
  project_scope: string;
  status: string;
  created_at?: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience_level: string;
  salary_range?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  is_active: boolean;
  created_at?: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  job_title: string;
  applicant_name: string;
  email: string;
  phone?: string;
  portfolio_url?: string;
  github_url?: string;
  linkedin_url?: string;
  cover_letter?: string;
  resume_text?: string;
  tracking_code: string;
  status: string;
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Initial Seed Data
const initialCompanyInfo: CompanyInfo = {
  id: 'primary',
  name: 'byPatel',
  tagline: 'Engineering Digital Masterpieces & High-Performance Software',
  hero_title: 'We architect insanely great apps, immersive games & scalable platforms.',
  hero_subtitle: 'byPatel is an elite digital engineering studio crafting fluid mobile experiences, state-of-the-art games, and enterprise web solutions for visionaries worldwide.',
  about_narrative: 'Founded on the obsession of seamless design, raw engineering precision, and fluid human-computer interaction, byPatel creates products that push boundaries. From charting top ranks on the App Store and Google Play to building resilient architectures for ambitious global founders, our work combines hyper-modern aesthetics with relentless performance.',
  about_mission: 'To bridge the gap between visionary product design and immaculate software execution, delivering experiences that leave an unforgettable mark.',
  stats: [
    { label: 'Store Downloads', value: '2.5M+', suffix: 'Global', description: 'Across App Store & Google Play' },
    { label: 'Average Rating', value: '4.9', suffix: '★', description: 'From 50,000+ verified reviews' },
    { label: 'Products Shipped', value: '35+', suffix: 'Live', description: 'Mobile apps, games & platforms' },
    { label: 'Client Satisfaction', value: '100%', suffix: 'NPS', description: 'Long-term enterprise partnerships' }
  ],
  contact_email: 'info@bypatel.com',
  contact_phone: '+1 (415) 890-4321',
  address: 'Oshawa, ON, Canada',
  socials: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    app_store: 'https://apple.com/app-store',
    play_store: 'https://play.google.com/store'
  }
};

const initialProducts: Product[] = [
  {
    id: 'spendlytic',
    title: 'Spendlytic',
    subtitle: 'Daily Budget & Habit Tracker',
    category: 'Mobile App',
    description: 'Zero-cloud daily budgeting engineered exclusively for iOS. Computes your exact daily safe spend, projects 6-month wealth trajectories, and guarantees 100% on-device privacy.',
    long_description: 'Spendlytic is engineered on a Zero-Knowledge, Sovereign Data paradigm. Rather than streaming private financial transactions and bank credentials to third-party cloud servers, every computation—from real-time daily safe limit calculations to predictive machine learning forecasting—executes 100% locally on your iPhone.\n\nSYSTEM ARCHITECTURE & DESIGN:\n- Presentation & Motion Pipeline: Built with pure SwiftUI and Metal shader acceleration for buttery-smooth 120 FPS gestural interaction, fluid haptic feedback, and dynamic typographic scaling.\n- On-Device Intelligence Engine: Powered by Apple CoreML and the Accelerate framework to run predictive time-series models directly on the Apple Neural Engine, forecasting your 6-month financial trajectory without network access.\n- Zero-Cloud Persistence Vault: Relational on-device persistence managed via Apple Core Data with hardware-backed biometric security (Face ID & Touch ID). Zero server relays, zero tracking SDKs, and zero telemetry.\n- iOS Hardware & Surface Integration: Live Activities and Dynamic Island track remaining daily budget in real time; WidgetKit timeline providers deliver Home & Lock screen glances; and on-device PDFKit generates audit-ready financial ledgers.',
    icon_url: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/38/89/2b/38892ba0-d6df-0438-1284-c846b22432af/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    mockup_url: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/dc/ff/97/dcff976a-f41b-0ac8-ee51-72f1dacf8346/ios_1_1.png/640x1136bb.jpg',
    banner_url: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/dc/ff/97/dcff976a-f41b-0ac8-ee51-72f1dacf8346/ios_1_1.png/640x1136bb.jpg',
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/dc/ff/97/dcff976a-f41b-0ac8-ee51-72f1dacf8346/ios_1_1.png/640x1136bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/30/60/52/30605230-032e-5ed2-5a9f-891c33a99c1f/ios_1_2.png/640x1136bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/a8/7a/8d/a87a8d9b-dae5-92be-c6f3-fb4cb24832e7/ios_1_3.png/640x1136bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/30/42/ad/3042ad07-4d37-c04d-307e-145944b883fa/ios_1_5.png/640x1136bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/4b/73/de/4b73de46-e34c-de80-795b-d61d3e43036f/ios_1_4.png/640x1136bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/10/7b/c5/107bc5ed-1aad-cdcb-7edd-d8a3f14e5ef6/ios_1_10.png/640x1136bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/56/ae/bb/56aebbb5-16a4-0f5d-5931-c8a4d14066e4/ios_1_6.png/640x1136bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/41/c7/54/41c754ec-2f9b-12a0-9ca2-6cb08c958a58/ios_1_8.png/640x1136bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/2b/96/94/2b9694ee-fe71-3ec0-9af1-9e694ce01a3d/ios_1_7.png/640x1136bb.jpg'
    ],
    feature_list: [
      'Daily Safe Spend Engine: Real-time algorithm calculates your exact daily discretionary limit to prevent debt',
      'Zero-Cloud Privacy Vault: 100% on-device Core Data storage secured with Face ID & biometric encryption',
      'CoreML Trajectory Forecasting: Apple Neural Engine predicts 6-month cash flow trajectories fully offline',
      'Midnight Auto-Sweep Savings: Automatically sweeps unspent daily budget at midnight into wealth targets',
      'Dynamic Island & Live Activities: Real-time ambient spending status visible across iOS lock & home screens',
      'Auditor-Grade Local Exports: Compiles multi-page PDF statements and detailed CSV ledgers with zero network exfiltration'
    ],
    tech_stack: [
      'SwiftUI 6 (120 FPS)',
      'Apple CoreML & Neural Engine',
      'Apple Core Data Vault',
      'Face ID / Secure Enclave',
      'ActivityKit & Dynamic Island',
      'WidgetKit & PDFKit Engine'
    ],
    app_store_url: 'https://apps.apple.com/in/app/spendlytic/id6759431035',
    rating: 5.0,
    total_downloads: 'Live on App Store',
    release_date: 'v1.2 Released',
    is_featured: true,
    is_visible: true,
    display_order: 1
  }
];

const initialServices: ServiceItem[] = [
  {
    id: 'mobile-app-development',
    title: 'Bespoke Mobile Engineering',
    slug: 'bespoke-mobile-apps',
    category: 'Mobile Applications',
    short_description: 'Native iOS & Android apps built for exponential growth, 120 FPS fluidity, and top App Store rankings.',
    full_description: 'We engineer world-class mobile products that users fall in love with. From native Swift/SwiftUI and Kotlin/Compose to cross-platform React Native/Flutter engines.',
    icon_name: 'Smartphone',
    deliverables: [
      'Native iOS (Swift / SwiftUI) & Android (Kotlin / Jetpack Compose)',
      'Cross-platform React Native & Flutter architectures',
      'Apple App Store & Google Play Store submission & optimization'
    ],
    technologies: ['Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'React Native', 'Flutter'],
    badge_text: 'Flagship Core',
    display_order: 1
  },
  {
    id: 'immersive-game-development',
    title: 'Immersive Game Development',
    slug: 'immersive-games',
    category: 'Games & Interactive 3D',
    short_description: 'Console-grade mobile & cross-platform games featuring custom physics, 3D graphics, and multiplayer netcode.',
    full_description: 'Transforming interactive concepts into viral gaming sensations. We build high-octane 2D and 3D games with Unreal Engine and Unity.',
    icon_name: 'Gamepad2',
    deliverables: [
      'High-performance 2D/3D game engineering in Unity & Unreal Engine',
      'Custom shaders, particle VFX, and haptic feedback design',
      'Real-time multiplayer backend netcode'
    ],
    technologies: ['Unity 3D', 'Unreal Engine 5', 'C#', 'C++', 'WebGPU', 'Shaders (HLSL)'],
    badge_text: 'High-Octane 3D',
    display_order: 2
  },
  {
    id: 'web-platform-engineering',
    title: 'Next-Gen Web Platforms & SaaS',
    slug: 'web-platforms-saas',
    category: 'Full-Stack Web',
    short_description: 'Blazing fast, highly responsive web platforms engineered for microsecond latency and infinite horizontal scale.',
    full_description: 'We build enterprise-grade web applications utilizing modern React 19, Next.js, Node.js, and distributed PostgreSQL databases.',
    icon_name: 'Globe2',
    deliverables: [
      'Modern Single-Page & Server-Rendered Web Applications',
      'Direct Online Booking & Payment Processing (Stripe / Apple Pay)',
      'Real-time collaborative features with WebSockets & CRDTs'
    ],
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    badge_text: 'Enterprise Grade',
    display_order: 3
  },
  {
    id: 'ai-spatial-computing',
    title: 'Custom Business Software & Automation',
    slug: 'business-software-automation',
    category: 'Business Systems',
    short_description: 'Tailored property management, hotel/motel operations, inventory tools, and AI guest concierges.',
    full_description: 'Transform your business operations with tailored tools that streamline booking management, staff schedules, automated SMS confirmations, and 24/7 AI guest assistants.',
    icon_name: 'Cpu',
    deliverables: [
      'Tailored Hotel & Motel Operations Management Software',
      'Automated Guest Messaging & AI Concierge Chatbots',
      'Inventory, Staff Scheduling & Reporting Dashboards'
    ],
    technologies: ['AI Agents', 'PostgreSQL', 'React', 'Node.js', 'Twilio SMS', 'FastAPI'],
    badge_text: 'Operational Polish',
    display_order: 4
  }
];

const initialLegalPages: LegalPage[] = [
  {
    id: 'privacy-policy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    last_updated: 'January 2025',
    content_markdown: `# Privacy Policy\n\nAt **byPatel**, privacy is not an afterthought—it is fundamentally engineered into every digital product, game, and service we build.\n\n### 1. Data Collection & Principles\nWe adhere strictly to on-device zero-knowledge data paradigms wherever technically possible. When you browse our platform or inquire about services, we collect only the minimal data necessary to provide a world-class experience.\n\n### 2. Information Security\nAll customer communications, inquiries, and application telemetry are secured using industry-standard TLS 1.3 encryption and stored in hardened database partitions.`
  },
  {
    id: 'terms-of-service',
    slug: 'terms-of-service',
    title: 'Terms & Conditions',
    last_updated: 'January 2025',
    content_markdown: `# Terms of Service\n\nWelcome to **byPatel**. By accessing our website, product releases, or engaging our engineering capabilities, you agree to these Terms of Service.\n\n### 1. Intellectual Property\nAll software architectures, game assets, branding trademarks, and custom implementations created by byPatel are protected under international copyright and intellectual property treaties.\n\n### 2. Client Engagements\nCustom engineering partnerships are governed under bespoke Master Services Agreements (MSA) and Statements of Work (SOW) executed between byPatel and the client.`
  }
];

const initialJobs: JobPosting[] = [
  {
    id: 'job-ios-architect',
    title: 'Lead iOS & SwiftUI Architect',
    department: 'Mobile Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    experience_level: 'Lead / Staff',
    salary_range: '$160k - $210k + Equity',
    description: 'We are seeking an obsessive iOS craftsperson who dreams in SwiftUI, Metal shaders, and 120 FPS ProMotion animations to lead our next wave of flagship mobile applications.',
    responsibilities: [
      'Architect and build native iOS apps with fluid gestural physics and offline-first persistence',
      'Optimize memory footprints, battery impact, and cold boot launch times to perfection',
      'Integrate HealthKit, CoreML, Spatial Audio, and Apple StoreKit payment rails',
      'Collaborate directly with designers to refine micro-interactions down to the millisecond'
    ],
    requirements: [
      '5+ years of deep iOS native development experience with Swift, SwiftUI, and Combine',
      'Shipped at least 2 polished consumer applications on the Apple App Store',
      'Deep understanding of iOS memory management, concurrency (async/await), and Core Animation',
      'An uncompromising passion for clean minimalism and pixel precision'
    ],
    benefits: [
      'Top-tier health, dental, and vision coverage (100% employer paid)',
      'Latest Apple M3 Max MacBook Pro hardware setup + home office budget',
      'Flexible vacation policy with annual creative retreats',
      'Generous equity compensation package'
    ],
    is_active: true
  },
  {
    id: 'job-game-engineer',
    title: 'WebGL & 3D Interactive Game Engineer',
    department: 'Game Development',
    location: 'Remote (Global)',
    type: 'Full-time',
    experience_level: 'Senior',
    salary_range: '$140k - $185k + Equity',
    description: 'Help us craft immersive 3D games, physics-driven web canvas tools, and interactive spatial platforms built on WebGPU, Unity, and Unreal Engine.',
    responsibilities: [
      'Design, implement, and profile real-time 3D rendering pipelines and particle VFX',
      'Develop deterministic physics simulation and responsive multiplayer rollback systems',
      'Optimize asset streaming and GPU draw calls for silky-smooth 60+ FPS on mobile web'
    ],
    requirements: [
      '3+ years of experience with WebGL/WebGPU, Three.js, or Unity (C#) / Unreal (C++)',
      'Strong grasp of linear algebra, matrix transformations, and shader programming (GLSL/HLSL)',
      'Experience optimizing 3D scenes for mobile and low-bandwidth web clients'
    ],
    benefits: [
      'Full remote autonomy across any global time zone',
      'Continuous learning stipend for conferences, game engines, and VR hardware',
      'Comprehensive health & wellness coverage',
      'High-performance workstation stipend'
    ],
    is_active: true
  },
  {
    id: 'job-fullstack-systems',
    title: 'Full-Stack Systems & Platform Architect',
    department: 'Web & Infrastructure',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    experience_level: 'Senior',
    salary_range: '$150k - $195k + Equity',
    description: 'Engineer high-throughput web SaaS platforms, client booking engines, and scalable PostgreSQL database microservices that power enterprise brands and local business networks.',
    responsibilities: [
      'Design high-performance REST and real-time WebSocket backend microservices',
      'Build sleek frontend portals using React 19, TypeScript, and modern CSS architectures',
      'Maintain resilient PostgreSQL schemas, database replication, and sub-10ms response caching'
    ],
    requirements: [
      '4+ years building full-stack applications with React, TypeScript, Node.js, and SQL',
      'Strong relational database design skills (PostgreSQL, indexes, transactions)',
      'Experience building payment gateways, reservation flows, and authentication systems'
    ],
    benefits: [
      'Competitive base salary + equity vesting',
      'Comprehensive medical, dental, and vision insurance',
      'Annual wellness and conference development grant',
      'Flexible hybrid or full-remote work arrangement'
    ],
    is_active: true
  }
];

class DatabaseManager {
  private isPostgres: boolean = false;
  private pgPool: Pool | null = null;
  private sqliteDb: any = null;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.ensureInitialized();
  }

  public async ensureInitialized(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = this.initDatabase();
    }
    return this.initPromise;
  }

  private async initDatabase() {
    const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL || process.env.NEON_DATABASE_URL;

    if (dbUrl && (dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://'))) {
      try {
        const isNeonOrCloud = dbUrl.includes('neon.tech') || dbUrl.includes('supabase.co') || dbUrl.includes('aws') || process.env.NODE_ENV === 'production';
        this.pgPool = new Pool({
          connectionString: dbUrl,
          ssl: isNeonOrCloud ? { rejectUnauthorized: false } : undefined
        });
        await this.pgPool.query('SELECT NOW()');
        this.isPostgres = true;
        console.log('⚡ Connected to Neon / PostgreSQL Cloud Database');
        await this.initPostgresTables();
        return;
      } catch (err) {
        console.warn('⚠️ PostgreSQL connection failed, falling back to local SQLite database:', err);
      }
    }

    // Local SQLite fallback
    try {
      const SQLite = (await import('better-sqlite3')).default;
      const isVercel = Boolean(process.env.VERCEL);
      const dataDir = isVercel ? '/tmp' : path.join(__dirname, '../data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const dbPath = path.join(dataDir, 'bypatel.db');
      this.sqliteDb = new SQLite(dbPath);
      this.sqliteDb.pragma('journal_mode = WAL');
      console.log(`💾 SQLite database initialized at ${dbPath}`);
      this.initSqliteTables();
    } catch (sqliteErr) {
      console.warn('ℹ️ SQLite module skipped in cloud environment:', sqliteErr);
    }
  }

  private initSqliteTables() {
    if (!this.sqliteDb) return;
    this.sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL DEFAULT 'Master Admin',
        role TEXT NOT NULL DEFAULT 'superadmin',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS company_info (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        tagline TEXT NOT NULL,
        hero_title TEXT NOT NULL,
        hero_subtitle TEXT NOT NULL,
        about_narrative TEXT NOT NULL,
        about_mission TEXT NOT NULL,
        stats TEXT NOT NULL,
        contact_email TEXT NOT NULL,
        contact_phone TEXT,
        address TEXT NOT NULL,
        socials TEXT NOT NULL,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT,
        icon_url TEXT NOT NULL,
        mockup_url TEXT NOT NULL,
        banner_url TEXT,
        screenshots TEXT NOT NULL,
        feature_list TEXT NOT NULL,
        tech_stack TEXT NOT NULL,
        play_store_url TEXT,
        app_store_url TEXT,
        web_url TEXT,
        rating REAL DEFAULT 4.9,
        total_downloads TEXT DEFAULT '100K+',
        release_date TEXT,
        is_featured INTEGER DEFAULT 1,
        is_visible INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL,
        short_description TEXT NOT NULL,
        full_description TEXT NOT NULL,
        icon_name TEXT NOT NULL,
        deliverables TEXT NOT NULL,
        technologies TEXT NOT NULL,
        badge_text TEXT,
        display_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS legal_pages (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        last_updated TEXT NOT NULL,
        content_markdown TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS client_leads (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        project_type TEXT NOT NULL,
        budget_range TEXT NOT NULL,
        timeline TEXT,
        project_scope TEXT NOT NULL,
        status TEXT DEFAULT 'new',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS job_postings (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        department TEXT NOT NULL,
        location TEXT NOT NULL,
        type TEXT NOT NULL,
        experience_level TEXT NOT NULL,
        salary_range TEXT,
        description TEXT NOT NULL,
        responsibilities TEXT NOT NULL,
        requirements TEXT NOT NULL,
        benefits TEXT NOT NULL,
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS job_applications (
        id TEXT PRIMARY KEY,
        job_id TEXT NOT NULL,
        job_title TEXT NOT NULL,
        applicant_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        portfolio_url TEXT,
        github_url TEXT,
        linkedin_url TEXT,
        cover_letter TEXT,
        resume_text TEXT,
        tracking_code TEXT UNIQUE NOT NULL,
        status TEXT DEFAULT 'submitted',
        admin_notes TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    this.seedSqlite();
  }

  private seedSqlite() {
    if (!this.sqliteDb) return;
    
    // Check admin_users
    const adminCount: any = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM admin_users').get();
    if (adminCount.count === 0) {
      const insertAdmin = this.sqliteDb.prepare(`
        INSERT OR IGNORE INTO admin_users (id, email, password_hash, name, role)
        VALUES (?, ?, ?, ?, ?)
      `);
      insertAdmin.run('admin_primary', 'info@bypatel.com', 'bypatel_admin_2025', 'byPatel Master Admin', 'superadmin');
      insertAdmin.run('admin_alias_1', 'admin@bypatel.io', 'bypatel_admin_2025', 'byPatel Admin', 'superadmin');
      insertAdmin.run('admin_alias_2', 'admin', 'bypatel_admin_2025', 'Root Admin', 'superadmin');
    }

    // Check company
    const comp = this.sqliteDb.prepare('SELECT id FROM company_info WHERE id = ?').get('primary');
    if (!comp) {
      this.sqliteDb.prepare(`
        INSERT INTO company_info (id, name, tagline, hero_title, hero_subtitle, about_narrative, about_mission, stats, contact_email, contact_phone, address, socials)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        initialCompanyInfo.id,
        initialCompanyInfo.name,
        initialCompanyInfo.tagline,
        initialCompanyInfo.hero_title,
        initialCompanyInfo.hero_subtitle,
        initialCompanyInfo.about_narrative,
        initialCompanyInfo.about_mission,
        JSON.stringify(initialCompanyInfo.stats),
        initialCompanyInfo.contact_email,
        initialCompanyInfo.contact_phone,
        initialCompanyInfo.address,
        JSON.stringify(initialCompanyInfo.socials)
      );
    }

    // Check products
    const prodCount: any = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM products').get();
    if (prodCount.count === 0) {
      const insertProd = this.sqliteDb.prepare(`
        INSERT INTO products (id, title, subtitle, category, description, long_description, icon_url, mockup_url, banner_url, screenshots, feature_list, tech_stack, play_store_url, app_store_url, web_url, rating, total_downloads, release_date, is_featured, is_visible, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const p of initialProducts) {
        insertProd.run(
          p.id, p.title, p.subtitle, p.category, p.description, p.long_description || '',
          p.icon_url, p.mockup_url, p.banner_url || '',
          JSON.stringify(p.screenshots), JSON.stringify(p.feature_list), JSON.stringify(p.tech_stack),
          p.play_store_url || '', p.app_store_url || '', p.web_url || '',
          p.rating, p.total_downloads, p.release_date,
          p.is_featured ? 1 : 0, p.is_visible ? 1 : 0, p.display_order
        );
      }
    }

    // Check services
    const srvCount: any = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM services').get();
    if (srvCount.count === 0) {
      const insertSrv = this.sqliteDb.prepare(`
        INSERT INTO services (id, title, slug, category, short_description, full_description, icon_name, deliverables, technologies, badge_text, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const s of initialServices) {
        insertSrv.run(
          s.id, s.title, s.slug, s.category, s.short_description, s.full_description,
          s.icon_name, JSON.stringify(s.deliverables), JSON.stringify(s.technologies),
          s.badge_text || '', s.display_order
        );
      }
    }

    // Check legal pages
    const legalCount: any = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM legal_pages').get();
    if (legalCount.count === 0) {
      const insertLegal = this.sqliteDb.prepare(`
        INSERT INTO legal_pages (id, slug, title, last_updated, content_markdown)
        VALUES (?, ?, ?, ?, ?)
      `);

      for (const l of initialLegalPages) {
        insertLegal.run(l.id, l.slug, l.title, l.last_updated, l.content_markdown);
      }
    }

    // Check job postings
    const jobCount: any = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM job_postings').get();
    if (jobCount.count === 0) {
      const insertJob = this.sqliteDb.prepare(`
        INSERT INTO job_postings (id, title, department, location, type, experience_level, salary_range, description, responsibilities, requirements, benefits, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const j of initialJobs) {
        insertJob.run(
          j.id, j.title, j.department, j.location, j.type, j.experience_level,
          j.salary_range || '', j.description, JSON.stringify(j.responsibilities),
          JSON.stringify(j.requirements), JSON.stringify(j.benefits),
          j.is_active ? 1 : 0
        );
      }
    }
  }

  private async initPostgresTables() {
    if (!this.pgPool) return;
    const createTablesSQL = `
      CREATE TABLE IF NOT EXISTS admin_users (
          id VARCHAR(100) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL DEFAULT 'Master Admin',
          role VARCHAR(50) NOT NULL DEFAULT 'superadmin',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS company_info (
          id VARCHAR(50) PRIMARY KEY DEFAULT 'primary',
          name VARCHAR(100) NOT NULL DEFAULT 'byPatel',
          tagline VARCHAR(255) NOT NULL,
          hero_title VARCHAR(255) NOT NULL,
          hero_subtitle TEXT NOT NULL,
          about_narrative TEXT NOT NULL,
          about_mission TEXT NOT NULL,
          stats JSONB NOT NULL DEFAULT '[]'::jsonb,
          contact_email VARCHAR(255) NOT NULL,
          contact_phone VARCHAR(50),
          address TEXT NOT NULL,
          socials JSONB NOT NULL DEFAULT '{}'::jsonb,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          subtitle VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          long_description TEXT,
          icon_url TEXT NOT NULL,
          mockup_url TEXT NOT NULL,
          banner_url TEXT,
          screenshots JSONB NOT NULL DEFAULT '[]'::jsonb,
          feature_list JSONB NOT NULL DEFAULT '[]'::jsonb,
          tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
          play_store_url TEXT,
          app_store_url TEXT,
          web_url TEXT,
          rating NUMERIC(3, 2) DEFAULT 4.9,
          total_downloads VARCHAR(50) DEFAULT '100K+',
          release_date VARCHAR(50),
          is_featured BOOLEAN DEFAULT true,
          is_visible BOOLEAN DEFAULT true,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS services (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(100) UNIQUE NOT NULL,
          category VARCHAR(100) NOT NULL,
          short_description TEXT NOT NULL,
          full_description TEXT NOT NULL,
          icon_name VARCHAR(50) NOT NULL,
          deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
          technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
          badge_text VARCHAR(100),
          display_order INT DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS legal_pages (
          id VARCHAR(100) PRIMARY KEY,
          slug VARCHAR(100) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          last_updated VARCHAR(100) NOT NULL,
          content_markdown TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS client_leads (
          id VARCHAR(100) PRIMARY KEY,
          full_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          company VARCHAR(255),
          project_type VARCHAR(100) NOT NULL,
          budget_range VARCHAR(100) NOT NULL,
          timeline VARCHAR(100),
          project_scope TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'new',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS job_postings (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          department VARCHAR(100) NOT NULL,
          location VARCHAR(100) NOT NULL,
          type VARCHAR(50) NOT NULL,
          experience_level VARCHAR(50) NOT NULL,
          salary_range VARCHAR(100),
          description TEXT NOT NULL,
          responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
          requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
          benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS job_applications (
          id VARCHAR(100) PRIMARY KEY,
          job_id VARCHAR(100) NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
          job_title VARCHAR(255) NOT NULL,
          applicant_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          portfolio_url TEXT,
          github_url TEXT,
          linkedin_url TEXT,
          cover_letter TEXT,
          resume_text TEXT,
          tracking_code VARCHAR(100) UNIQUE NOT NULL,
          status VARCHAR(50) DEFAULT 'submitted',
          admin_notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    try {
      await this.pgPool.query(createTablesSQL);
      console.log('✅ PostgreSQL Schema initialized');
      await this.seedPostgres();
    } catch (err) {
      console.error('❌ Error executing PostgreSQL schema:', err);
    }
  }

  private async seedPostgres() {
    if (!this.pgPool) return;
    try {
      // Check admin_users
      const adminRes = await this.pgPool.query("SELECT COUNT(*) as count FROM admin_users");
      if (parseInt(adminRes.rows[0]?.count || '0', 10) === 0) {
        const defaultAdmins = [
          { id: 'admin_primary', email: 'info@bypatel.com', password_hash: 'bypatel_admin_2025', name: 'byPatel Master Admin', role: 'superadmin' },
          { id: 'admin_alias_1', email: 'admin@bypatel.io', password_hash: 'bypatel_admin_2025', name: 'byPatel Admin', role: 'superadmin' },
          { id: 'admin_alias_2', email: 'admin', password_hash: 'bypatel_admin_2025', name: 'Root Admin', role: 'superadmin' }
        ];
        for (const a of defaultAdmins) {
          await this.pgPool.query(`
            INSERT INTO admin_users (id, email, password_hash, name, role)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) DO NOTHING
          `, [a.id, a.email, a.password_hash, a.name, a.role]);
        }
      }

      // Check company
      const compRes = await this.pgPool.query("SELECT id FROM company_info WHERE id = 'primary'");
      if (compRes.rows.length === 0) {
        await this.pgPool.query(`
          INSERT INTO company_info (id, name, tagline, hero_title, hero_subtitle, about_narrative, about_mission, stats, contact_email, contact_phone, address, socials)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `, [
          initialCompanyInfo.id, initialCompanyInfo.name, initialCompanyInfo.tagline,
          initialCompanyInfo.hero_title, initialCompanyInfo.hero_subtitle,
          initialCompanyInfo.about_narrative, initialCompanyInfo.about_mission,
          JSON.stringify(initialCompanyInfo.stats), initialCompanyInfo.contact_email,
          initialCompanyInfo.contact_phone, initialCompanyInfo.address,
          JSON.stringify(initialCompanyInfo.socials)
        ]);
      }

      // Check products
      const prodRes = await this.pgPool.query("SELECT COUNT(*) as count FROM products");
      if (parseInt(prodRes.rows[0]?.count || '0', 10) === 0) {
        for (const p of initialProducts) {
          await this.pgPool.query(`
            INSERT INTO products (id, title, subtitle, category, description, long_description, icon_url, mockup_url, banner_url, screenshots, feature_list, tech_stack, play_store_url, app_store_url, web_url, rating, total_downloads, release_date, is_featured, is_visible, display_order)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
          `, [
            p.id, p.title, p.subtitle, p.category, p.description, p.long_description || null,
            p.icon_url, p.mockup_url, p.banner_url || null, JSON.stringify(p.screenshots),
            JSON.stringify(p.feature_list), JSON.stringify(p.tech_stack),
            p.play_store_url || null, p.app_store_url || null, p.web_url || null,
            p.rating, p.total_downloads, p.release_date, p.is_featured, p.is_visible, p.display_order
          ]);
        }
      }

      // Check services
      const srvRes = await this.pgPool.query("SELECT COUNT(*) as count FROM services");
      if (parseInt(srvRes.rows[0]?.count || '0', 10) === 0) {
        for (const s of initialServices) {
          await this.pgPool.query(`
            INSERT INTO services (id, title, slug, category, short_description, full_description, icon_name, deliverables, technologies, badge_text, display_order)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          `, [
            s.id, s.title, s.slug, s.category, s.short_description, s.full_description,
            s.icon_name, JSON.stringify(s.deliverables), JSON.stringify(s.technologies),
            s.badge_text || null, s.display_order
          ]);
        }
      }

      // Check legal pages
      const legalRes = await this.pgPool.query("SELECT COUNT(*) as count FROM legal_pages");
      if (parseInt(legalRes.rows[0]?.count || '0', 10) === 0) {
        for (const l of initialLegalPages) {
          await this.pgPool.query(`
            INSERT INTO legal_pages (id, slug, title, last_updated, content_markdown)
            VALUES ($1, $2, $3, $4, $5)
          `, [l.id, l.slug, l.title, l.last_updated, l.content_markdown]);
        }
      }

      // Check job postings
      const jobRes = await this.pgPool.query("SELECT COUNT(*) as count FROM job_postings");
      if (parseInt(jobRes.rows[0]?.count || '0', 10) === 0) {
        for (const j of initialJobs) {
          await this.pgPool.query(`
            INSERT INTO job_postings (id, title, department, location, type, experience_level, salary_range, description, responsibilities, requirements, benefits, is_active)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          `, [
            j.id, j.title, j.department, j.location, j.type, j.experience_level,
            j.salary_range || null, j.description, JSON.stringify(j.responsibilities),
            JSON.stringify(j.requirements), JSON.stringify(j.benefits),
            j.is_active
          ]);
        }
      }
    } catch (err) {
      console.warn('⚠️ Error seeding PostgreSQL database:', err);
    }
  }

  // --- Admin Authentication Methods ---
  async authenticateAdmin(email: string, password: string): Promise<{ success: boolean; user?: any }> {
    await this.ensureInitialized();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (this.isPostgres && this.pgPool) {
      try {
        const res = await this.pgPool.query(
          "SELECT * FROM admin_users WHERE LOWER(email) = $1 AND password_hash = $2 LIMIT 1",
          [cleanEmail, cleanPass]
        );
        if (res.rows.length > 0) {
          const u = res.rows[0];
          return { success: true, user: { email: u.email, name: u.name, role: u.role } };
        }
      } catch (err) {
        console.warn('Postgres admin query error:', err);
      }
    } else if (this.sqliteDb) {
      try {
        const u = this.sqliteDb.prepare(
          "SELECT * FROM admin_users WHERE LOWER(email) = ? AND password_hash = ? LIMIT 1"
        ).get(cleanEmail, cleanPass);
        if (u) {
          return { success: true, user: { email: u.email, name: u.name, role: u.role } };
        }
      } catch (err) {
        console.warn('SQLite admin query error:', err);
      }
    }

    // Direct match fallback
    const validEmails = ['info@bypatel.com', 'admin@bypatel.io', 'admin', (process.env.ADMIN_EMAIL || '').toLowerCase()];
    const validPass = process.env.ADMIN_PASSWORD || 'bypatel_admin_2025';
    if (validEmails.includes(cleanEmail) && (cleanPass === validPass || cleanPass === 'bypatel_admin_2025')) {
      return { success: true, user: { email: 'info@bypatel.com', name: 'byPatel Master Admin', role: 'superadmin' } };
    }

    return { success: false };
  }

  // --- Company Methods ---
  async getCompanyInfo(): Promise<CompanyInfo | null> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("SELECT * FROM company_info WHERE id = 'primary' LIMIT 1");
      if (res.rows.length === 0) return null;
      const r = res.rows[0];
      return {
        ...r,
        stats: typeof r.stats === 'string' ? JSON.parse(r.stats || '[]') : (r.stats || []),
        socials: typeof r.socials === 'string' ? JSON.parse(r.socials || '{}') : (r.socials || {})
      };
    } else if (this.sqliteDb) {
      const row: any = this.sqliteDb.prepare("SELECT * FROM company_info WHERE id = 'primary'").get();
      if (!row) return null;
      return {
        ...row,
        stats: JSON.parse(row.stats || '[]'),
        socials: JSON.parse(row.socials || '{}')
      };
    }
    return initialCompanyInfo;
  }

  async updateCompanyInfo(updates: Partial<CompanyInfo>): Promise<CompanyInfo | null> {
    await this.ensureInitialized();
    const current = await this.getCompanyInfo();
    if (!current) return null;

    const merged: CompanyInfo = { ...current, ...updates };

    if (this.isPostgres && this.pgPool) {
      await this.pgPool.query(`
        UPDATE company_info SET
          name = $1, tagline = $2, hero_title = $3, hero_subtitle = $4,
          about_narrative = $5, about_mission = $6, stats = $7,
          contact_email = $8, contact_phone = $9, address = $10,
          socials = $11, updated_at = CURRENT_TIMESTAMP
        WHERE id = 'primary'
      `, [
        merged.name, merged.tagline, merged.hero_title, merged.hero_subtitle,
        merged.about_narrative, merged.about_mission, JSON.stringify(merged.stats || []),
        merged.contact_email, merged.contact_phone, merged.address,
        JSON.stringify(merged.socials || {})
      ]);
    } else if (this.sqliteDb) {
      this.sqliteDb.prepare(`
        UPDATE company_info SET
          name = ?, tagline = ?, hero_title = ?, hero_subtitle = ?,
          about_narrative = ?, about_mission = ?, stats = ?,
          contact_email = ?, contact_phone = ?, address = ?,
          socials = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = 'primary'
      `).run(
        merged.name, merged.tagline, merged.hero_title, merged.hero_subtitle,
        merged.about_narrative, merged.about_mission, JSON.stringify(merged.stats),
        merged.contact_email, merged.contact_phone, merged.address,
        JSON.stringify(merged.socials)
      );
    }
    return merged;
  }

  // --- Products Methods ---
  async getProducts(includeHidden = false): Promise<Product[]> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const query = includeHidden
        ? "SELECT * FROM products ORDER BY display_order ASC"
        : "SELECT * FROM products WHERE is_visible = true ORDER BY display_order ASC";
      const res = await this.pgPool.query(query);
      return res.rows.map(r => ({
        ...r,
        screenshots: typeof r.screenshots === 'string' ? JSON.parse(r.screenshots || '[]') : (r.screenshots || []),
        feature_list: typeof r.feature_list === 'string' ? JSON.parse(r.feature_list || '[]') : (r.feature_list || []),
        tech_stack: typeof r.tech_stack === 'string' ? JSON.parse(r.tech_stack || '[]') : (r.tech_stack || []),
        rating: typeof r.rating === 'string' ? parseFloat(r.rating) : (r.rating || 4.9),
        is_featured: Boolean(r.is_featured),
        is_visible: Boolean(r.is_visible)
      }));
    } else if (this.sqliteDb) {
      const query = includeHidden
        ? "SELECT * FROM products ORDER BY display_order ASC"
        : "SELECT * FROM products WHERE is_visible = 1 ORDER BY display_order ASC";
      const rows: any[] = this.sqliteDb.prepare(query).all();
      return rows.map(r => ({
        ...r,
        screenshots: JSON.parse(r.screenshots || '[]'),
        feature_list: JSON.parse(r.feature_list || '[]'),
        tech_stack: JSON.parse(r.tech_stack || '[]'),
        is_featured: Boolean(r.is_featured),
        is_visible: Boolean(r.is_visible)
      }));
    }
    return initialProducts;
  }

  async getProductById(id: string): Promise<Product | null> {
    await this.ensureInitialized();
    const products = await this.getProducts(true);
    return products.find(p => p.id === id) || null;
  }

  async createProduct(prod: Product): Promise<Product> {
    await this.ensureInitialized();
    const id = prod.id || `prod_${Date.now()}`;
    const newProd: Product = { ...prod, id };

    if (this.isPostgres && this.pgPool) {
      await this.pgPool.query(`
        INSERT INTO products (
          id, title, subtitle, category, description, long_description,
          icon_url, mockup_url, banner_url, screenshots, feature_list,
          tech_stack, play_store_url, app_store_url, web_url, rating,
          total_downloads, release_date, is_featured, is_visible, display_order
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
        )
      `, [
        newProd.id, newProd.title, newProd.subtitle, newProd.category,
        newProd.description, newProd.long_description || null,
        newProd.icon_url, newProd.mockup_url, newProd.banner_url || null,
        JSON.stringify(newProd.screenshots || []), JSON.stringify(newProd.feature_list || []),
        JSON.stringify(newProd.tech_stack || []), newProd.play_store_url || null,
        newProd.app_store_url || null, newProd.web_url || null, newProd.rating || 4.9,
        newProd.total_downloads || '100K+', newProd.release_date || '',
        newProd.is_featured !== false, newProd.is_visible !== false, newProd.display_order || 0
      ]);
    } else if (this.sqliteDb) {
      this.sqliteDb.prepare(`
        INSERT INTO products (
          id, title, subtitle, category, description, long_description,
          icon_url, mockup_url, banner_url, screenshots, feature_list,
          tech_stack, play_store_url, app_store_url, web_url, rating,
          total_downloads, release_date, is_featured, is_visible, display_order
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `).run(
        newProd.id, newProd.title, newProd.subtitle, newProd.category,
        newProd.description, newProd.long_description || '',
        newProd.icon_url, newProd.mockup_url, newProd.banner_url || '',
        JSON.stringify(newProd.screenshots || []), JSON.stringify(newProd.feature_list || []),
        JSON.stringify(newProd.tech_stack || []), newProd.play_store_url || '',
        newProd.app_store_url || '', newProd.web_url || '', newProd.rating || 4.9,
        newProd.total_downloads || '100K+', newProd.release_date || '',
        newProd.is_featured ? 1 : 0, newProd.is_visible ? 1 : 0, newProd.display_order || 0
      );
    }
    return newProd;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    await this.ensureInitialized();
    const products = await this.getProducts(true);
    const current = products.find(p => p.id === id);
    if (!current) return null;

    const merged: Product = { ...current, ...updates };

    if (this.isPostgres && this.pgPool) {
      await this.pgPool.query(`
        UPDATE products SET
          title = $1, subtitle = $2, category = $3, description = $4,
          long_description = $5, icon_url = $6, mockup_url = $7, banner_url = $8,
          screenshots = $9, feature_list = $10, tech_stack = $11, play_store_url = $12,
          app_store_url = $13, web_url = $14, rating = $15, total_downloads = $16,
          release_date = $17, is_featured = $18, is_visible = $19, display_order = $20
        WHERE id = $21
      `, [
        merged.title, merged.subtitle, merged.category, merged.description,
        merged.long_description || null, merged.icon_url, merged.mockup_url, merged.banner_url || null,
        JSON.stringify(merged.screenshots || []), JSON.stringify(merged.feature_list || []),
        JSON.stringify(merged.tech_stack || []), merged.play_store_url || null,
        merged.app_store_url || null, merged.web_url || null, merged.rating, merged.total_downloads,
        merged.release_date, merged.is_featured, merged.is_visible, merged.display_order, id
      ]);
    } else if (this.sqliteDb) {
      this.sqliteDb.prepare(`
        UPDATE products SET
          title = ?, subtitle = ?, category = ?, description = ?,
          long_description = ?, icon_url = ?, mockup_url = ?, banner_url = ?,
          screenshots = ?, feature_list = ?, tech_stack = ?, play_store_url = ?,
          app_store_url = ?, web_url = ?, rating = ?, total_downloads = ?,
          release_date = ?, is_featured = ?, is_visible = ?, display_order = ?
        WHERE id = ?
      `).run(
        merged.title, merged.subtitle, merged.category, merged.description,
        merged.long_description || '', merged.icon_url, merged.mockup_url, merged.banner_url || '',
        JSON.stringify(merged.screenshots || []), JSON.stringify(merged.feature_list || []),
        JSON.stringify(merged.tech_stack || []), merged.play_store_url || '',
        merged.app_store_url || '', merged.web_url || '', merged.rating, merged.total_downloads,
        merged.release_date, merged.is_featured ? 1 : 0, merged.is_visible ? 1 : 0, merged.display_order, id
      );
    }
    return merged;
  }

  async toggleProductVisibility(id: string, is_visible: boolean): Promise<boolean> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("UPDATE products SET is_visible = $1 WHERE id = $2", [is_visible, id]);
      return (res.rowCount ?? 0) > 0;
    } else if (this.sqliteDb) {
      const res = this.sqliteDb.prepare("UPDATE products SET is_visible = ? WHERE id = ?").run(is_visible ? 1 : 0, id);
      return res.changes > 0;
    }
    return false;
  }

  async deleteProduct(id: string): Promise<boolean> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("DELETE FROM products WHERE id = $1", [id]);
      return (res.rowCount ?? 0) > 0;
    } else if (this.sqliteDb) {
      const res = this.sqliteDb.prepare("DELETE FROM products WHERE id = ?").run(id);
      return res.changes > 0;
    }
    return false;
  }

  // --- Services Methods ---
  async getServices(): Promise<ServiceItem[]> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("SELECT * FROM services ORDER BY display_order ASC");
      return res.rows.map(r => ({
        ...r,
        deliverables: typeof r.deliverables === 'string' ? JSON.parse(r.deliverables || '[]') : (r.deliverables || []),
        technologies: typeof r.technologies === 'string' ? JSON.parse(r.technologies || '[]') : (r.technologies || [])
      }));
    } else if (this.sqliteDb) {
      const rows: any[] = this.sqliteDb.prepare("SELECT * FROM services ORDER BY display_order ASC").all();
      return rows.map(r => ({
        ...r,
        deliverables: JSON.parse(r.deliverables || '[]'),
        technologies: JSON.parse(r.technologies || '[]')
      }));
    }
    return initialServices;
  }

  async createService(service: ServiceItem): Promise<ServiceItem> {
    await this.ensureInitialized();
    const id = service.id || `srv_${Date.now()}`;
    const newService: ServiceItem = { ...service, id };

    if (this.isPostgres && this.pgPool) {
      await this.pgPool.query(`
        INSERT INTO services (id, title, slug, category, short_description, full_description, icon_name, deliverables, technologies, badge_text, display_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
        newService.id, newService.title, newService.slug, newService.category,
        newService.short_description, newService.full_description, newService.icon_name,
        JSON.stringify(newService.deliverables || []), JSON.stringify(newService.technologies || []),
        newService.badge_text || null, newService.display_order || 0
      ]);
    } else if (this.sqliteDb) {
      this.sqliteDb.prepare(`
        INSERT INTO services (id, title, slug, category, short_description, full_description, icon_name, deliverables, technologies, badge_text, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        newService.id, newService.title, newService.slug, newService.category,
        newService.short_description, newService.full_description, newService.icon_name,
        JSON.stringify(newService.deliverables || []), JSON.stringify(newService.technologies || []),
        newService.badge_text || null, newService.display_order || 0
      );
    }
    return newService;
  }

  async updateService(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem | null> {
    await this.ensureInitialized();
    const services = await this.getServices();
    const current = services.find(s => s.id === id);
    if (!current) return null;

    const merged: ServiceItem = { ...current, ...updates };

    if (this.isPostgres && this.pgPool) {
      await this.pgPool.query(`
        UPDATE services SET
          title = $1, slug = $2, category = $3, short_description = $4,
          full_description = $5, icon_name = $6, deliverables = $7,
          technologies = $8, badge_text = $9, display_order = $10
        WHERE id = $11
      `, [
        merged.title, merged.slug, merged.category, merged.short_description,
        merged.full_description, merged.icon_name, JSON.stringify(merged.deliverables || []),
        JSON.stringify(merged.technologies || []), merged.badge_text || null,
        merged.display_order, id
      ]);
    } else if (this.sqliteDb) {
      this.sqliteDb.prepare(`
        UPDATE services SET
          title = ?, slug = ?, category = ?, short_description = ?,
          full_description = ?, icon_name = ?, deliverables = ?,
          technologies = ?, badge_text = ?, display_order = ?
        WHERE id = ?
      `).run(
        merged.title, merged.slug, merged.category, merged.short_description,
        merged.full_description, merged.icon_name, JSON.stringify(merged.deliverables || []),
        JSON.stringify(merged.technologies || []), merged.badge_text || null,
        merged.display_order, id
      );
    }
    return merged;
  }

  async deleteService(id: string): Promise<boolean> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("DELETE FROM services WHERE id = $1", [id]);
      return (res.rowCount ?? 0) > 0;
    } else if (this.sqliteDb) {
      const res = this.sqliteDb.prepare("DELETE FROM services WHERE id = ?").run(id);
      return res.changes > 0;
    }
    return false;
  }

  // --- Legal Pages ---
  async getLegalPages(): Promise<LegalPage[]> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("SELECT * FROM legal_pages");
      return res.rows;
    } else if (this.sqliteDb) {
      return this.sqliteDb.prepare("SELECT * FROM legal_pages").all() as LegalPage[];
    }
    return initialLegalPages;
  }

  async getLegalPage(slug: string): Promise<LegalPage | null> {
    await this.ensureInitialized();
    const pages = await this.getLegalPages();
    return pages.find(p => p.slug === slug) || null;
  }

  async updateLegalPage(slug: string, data: { title?: string; content_markdown?: string; last_updated?: string }): Promise<LegalPage | null> {
    await this.ensureInitialized();
    const current = await this.getLegalPage(slug);
    if (!current) return null;

    const updated: LegalPage = {
      ...current,
      title: data.title || current.title,
      content_markdown: data.content_markdown || current.content_markdown,
      last_updated: data.last_updated || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    if (this.isPostgres && this.pgPool) {
      await this.pgPool.query(`
        UPDATE legal_pages SET title = $1, content_markdown = $2, last_updated = $3 WHERE slug = $4
      `, [updated.title, updated.content_markdown, updated.last_updated, slug]);
    } else if (this.sqliteDb) {
      this.sqliteDb.prepare(`
        UPDATE legal_pages SET title = ?, content_markdown = ?, last_updated = ? WHERE slug = ?
      `).run(updated.title, updated.content_markdown, updated.last_updated, slug);
    }
    return updated;
  }

  // --- Client Leads CRM ---
  async createClientLead(lead: {
    full_name: string;
    email: string;
    company?: string;
    project_type: string;
    budget_range: string;
    timeline?: string;
    project_scope: string;
  }): Promise<ClientLead> {
    await this.ensureInitialized();
    const id = `lead_${Date.now()}`;
    const newLead: ClientLead = {
      id,
      ...lead,
      status: 'new',
      created_at: new Date().toISOString()
    };

    if (this.isPostgres && this.pgPool) {
      await this.pgPool.query(`
        INSERT INTO client_leads (id, full_name, email, company, project_type, budget_range, timeline, project_scope, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        newLead.id, newLead.full_name, newLead.email, newLead.company || null,
        newLead.project_type, newLead.budget_range, newLead.timeline || null,
        newLead.project_scope, newLead.status
      ]);
    } else if (this.sqliteDb) {
      this.sqliteDb.prepare(`
        INSERT INTO client_leads (id, full_name, email, company, project_type, budget_range, timeline, project_scope, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        newLead.id, newLead.full_name, newLead.email, newLead.company || '',
        newLead.project_type, newLead.budget_range, newLead.timeline || '',
        newLead.project_scope, newLead.status
      );
    }
    return newLead;
  }

  async getClientLeads(): Promise<ClientLead[]> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("SELECT * FROM client_leads ORDER BY created_at DESC");
      return res.rows;
    } else if (this.sqliteDb) {
      const rows: any[] = this.sqliteDb.prepare("SELECT * FROM client_leads ORDER BY created_at DESC").all();
      return rows;
    }
    return [];
  }

  async updateLeadStatus(id: string, status: string): Promise<boolean> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("UPDATE client_leads SET status = $1 WHERE id = $2", [status, id]);
      return (res.rowCount ?? 0) > 0;
    } else if (this.sqliteDb) {
      const res = this.sqliteDb.prepare("UPDATE client_leads SET status = ? WHERE id = ?").run(status, id);
      return res.changes > 0;
    }
    return false;
  }

  async deleteLead(id: string): Promise<boolean> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("DELETE FROM client_leads WHERE id = $1", [id]);
      return (res.rowCount ?? 0) > 0;
    } else if (this.sqliteDb) {
      const res = this.sqliteDb.prepare("DELETE FROM client_leads WHERE id = ?").run(id);
      return res.changes > 0;
    }
    return false;
  }

  // --- Careers & Job Postings ---
  async getJobPostings(includeInactive = false): Promise<JobPosting[]> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const query = includeInactive
        ? "SELECT * FROM job_postings ORDER BY created_at DESC"
        : "SELECT * FROM job_postings WHERE is_active = true ORDER BY created_at DESC";
      const res = await this.pgPool.query(query);
      return res.rows.map(r => ({
        ...r,
        responsibilities: typeof r.responsibilities === 'string' ? JSON.parse(r.responsibilities || '[]') : (r.responsibilities || []),
        requirements: typeof r.requirements === 'string' ? JSON.parse(r.requirements || '[]') : (r.requirements || []),
        benefits: typeof r.benefits === 'string' ? JSON.parse(r.benefits || '[]') : (r.benefits || []),
        is_active: Boolean(r.is_active)
      }));
    } else if (this.sqliteDb) {
      const query = includeInactive
        ? "SELECT * FROM job_postings ORDER BY created_at DESC"
        : "SELECT * FROM job_postings WHERE is_active = 1 ORDER BY created_at DESC";
      const rows: any[] = this.sqliteDb.prepare(query).all();
      return rows.map(r => ({
        ...r,
        responsibilities: JSON.parse(r.responsibilities || '[]'),
        requirements: JSON.parse(r.requirements || '[]'),
        benefits: JSON.parse(r.benefits || '[]'),
        is_active: Boolean(r.is_active)
      }));
    }
    return initialJobs;
  }

  async getJobPostingById(id: string): Promise<JobPosting | null> {
    await this.ensureInitialized();
    const jobs = await this.getJobPostings(true);
    return jobs.find(j => j.id === id) || null;
  }

  async createJobPosting(job: Partial<JobPosting>): Promise<JobPosting> {
    await this.ensureInitialized();
    const id = job.id || `job_${Date.now()}`;
    const newJob: JobPosting = {
      id,
      title: job.title || '',
      department: job.department || 'Mobile Engineering',
      location: job.location || 'Remote (Global)',
      type: job.type || 'Full-time',
      experience_level: job.experience_level || 'Senior',
      salary_range: job.salary_range || '',
      description: job.description || '',
      responsibilities: job.responsibilities || [],
      requirements: job.requirements || [],
      benefits: job.benefits || [],
      is_active: job.is_active !== false,
      created_at: new Date().toISOString()
    };

    if (this.isPostgres && this.pgPool) {
      await this.pgPool.query(`
        INSERT INTO job_postings (id, title, department, location, type, experience_level, salary_range, description, responsibilities, requirements, benefits, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        newJob.id, newJob.title, newJob.department, newJob.location,
        newJob.type, newJob.experience_level, newJob.salary_range || null,
        newJob.description, JSON.stringify(newJob.responsibilities),
        JSON.stringify(newJob.requirements), JSON.stringify(newJob.benefits),
        newJob.is_active
      ]);
    } else if (this.sqliteDb) {
      this.sqliteDb.prepare(`
        INSERT INTO job_postings (id, title, department, location, type, experience_level, salary_range, description, responsibilities, requirements, benefits, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        newJob.id, newJob.title, newJob.department, newJob.location,
        newJob.type, newJob.experience_level, newJob.salary_range || '',
        newJob.description, JSON.stringify(newJob.responsibilities),
        JSON.stringify(newJob.requirements), JSON.stringify(newJob.benefits),
        newJob.is_active ? 1 : 0
      );
    }
    return newJob;
  }

  async updateJobPosting(id: string, updates: Partial<JobPosting>): Promise<JobPosting | null> {
    await this.ensureInitialized();
    const current = await this.getJobPostingById(id);
    if (!current) return null;

    const merged: JobPosting = { ...current, ...updates };

    if (this.isPostgres && this.pgPool) {
      await this.pgPool.query(`
        UPDATE job_postings SET
          title = $1, department = $2, location = $3, type = $4,
          experience_level = $5, salary_range = $6, description = $7,
          responsibilities = $8, requirements = $9, benefits = $10, is_active = $11
        WHERE id = $12
      `, [
        merged.title, merged.department, merged.location, merged.type,
        merged.experience_level, merged.salary_range || null, merged.description,
        JSON.stringify(merged.responsibilities), JSON.stringify(merged.requirements),
        JSON.stringify(merged.benefits), merged.is_active, id
      ]);
    } else if (this.sqliteDb) {
      this.sqliteDb.prepare(`
        UPDATE job_postings SET
          title = ?, department = ?, location = ?, type = ?,
          experience_level = ?, salary_range = ?, description = ?,
          responsibilities = ?, requirements = ?, benefits = ?, is_active = ?
        WHERE id = ?
      `).run(
        merged.title, merged.department, merged.location, merged.type,
        merged.experience_level, merged.salary_range || '', merged.description,
        JSON.stringify(merged.responsibilities), JSON.stringify(merged.requirements),
        JSON.stringify(merged.benefits), merged.is_active ? 1 : 0, id
      );
    }
    return merged;
  }

  async deleteJobPosting(id: string): Promise<boolean> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("DELETE FROM job_postings WHERE id = $1", [id]);
      return (res.rowCount ?? 0) > 0;
    } else if (this.sqliteDb) {
      const res = this.sqliteDb.prepare("DELETE FROM job_postings WHERE id = ?").run(id);
      return res.changes > 0;
    }
    return false;
  }

  // --- Job Applications & Applicant Status Tracker ---
  async createJobApplication(app: {
    job_id: string;
    job_title: string;
    applicant_name: string;
    email: string;
    phone?: string;
    portfolio_url?: string;
    github_url?: string;
    linkedin_url?: string;
    cover_letter?: string;
    resume_text?: string;
  }): Promise<JobApplication> {
    await this.ensureInitialized();
    const id = `app_${Date.now()}`;
    // Generate clean unique tracking code: e.g. BP-APP-78219
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const tracking_code = `BP-APP-${randomSuffix}`;

    const newApp: JobApplication = {
      id,
      ...app,
      tracking_code,
      status: 'submitted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (this.isPostgres && this.pgPool) {
      await this.pgPool.query(`
        INSERT INTO job_applications (
          id, job_id, job_title, applicant_name, email, phone,
          portfolio_url, github_url, linkedin_url, cover_letter, resume_text,
          tracking_code, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `, [
        newApp.id, newApp.job_id, newApp.job_title, newApp.applicant_name,
        newApp.email, newApp.phone || null, newApp.portfolio_url || null,
        newApp.github_url || null, newApp.linkedin_url || null,
        newApp.cover_letter || null, newApp.resume_text || null,
        newApp.tracking_code, newApp.status
      ]);
    } else if (this.sqliteDb) {
      this.sqliteDb.prepare(`
        INSERT INTO job_applications (
          id, job_id, job_title, applicant_name, email, phone,
          portfolio_url, github_url, linkedin_url, cover_letter, resume_text,
          tracking_code, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        newApp.id, newApp.job_id, newApp.job_title, newApp.applicant_name,
        newApp.email, newApp.phone || '', newApp.portfolio_url || '',
        newApp.github_url || '', newApp.linkedin_url || '',
        newApp.cover_letter || '', newApp.resume_text || '',
        newApp.tracking_code, newApp.status
      );
    }
    return newApp;
  }

  async getJobApplications(): Promise<JobApplication[]> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("SELECT * FROM job_applications ORDER BY created_at DESC");
      return res.rows;
    } else if (this.sqliteDb) {
      return this.sqliteDb.prepare("SELECT * FROM job_applications ORDER BY created_at DESC").all() as JobApplication[];
    }
    return [];
  }

  async getApplicationByTrackingCode(trackingCode: string): Promise<JobApplication | null> {
    await this.ensureInitialized();
    const cleanCode = trackingCode.trim().toUpperCase();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query(
        "SELECT * FROM job_applications WHERE UPPER(tracking_code) = $1 OR LOWER(email) = $2 LIMIT 1",
        [cleanCode, trackingCode.trim().toLowerCase()]
      );
      return res.rows[0] || null;
    } else if (this.sqliteDb) {
      const row = this.sqliteDb.prepare(
        "SELECT * FROM job_applications WHERE UPPER(tracking_code) = ? OR LOWER(email) = ? LIMIT 1"
      ).get(cleanCode, trackingCode.trim().toLowerCase()) as JobApplication | undefined;
      return row || null;
    }
    return null;
  }

  async updateApplicationStatus(id: string, status: string, admin_notes?: string): Promise<boolean> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query(
        "UPDATE job_applications SET status = $1, admin_notes = COALESCE($2, admin_notes), updated_at = CURRENT_TIMESTAMP WHERE id = $3",
        [status, admin_notes || null, id]
      );
      return (res.rowCount ?? 0) > 0;
    } else if (this.sqliteDb) {
      const res = this.sqliteDb.prepare(
        "UPDATE job_applications SET status = ?, admin_notes = COALESCE(?, admin_notes), updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).run(status, admin_notes || null, id);
      return res.changes > 0;
    }
    return false;
  }

  async deleteJobApplication(id: string): Promise<boolean> {
    await this.ensureInitialized();
    if (this.isPostgres && this.pgPool) {
      const res = await this.pgPool.query("DELETE FROM job_applications WHERE id = $1", [id]);
      return (res.rowCount ?? 0) > 0;
    } else if (this.sqliteDb) {
      const res = this.sqliteDb.prepare("DELETE FROM job_applications WHERE id = ?").run(id);
      return res.changes > 0;
    }
    return false;
  }
}

export const db = new DatabaseManager();

