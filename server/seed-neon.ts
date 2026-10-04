import { Pool } from 'pg';
import dotenv from 'dotenv';
import { db } from './db.js';

dotenv.config();

const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;

if (!dbUrl) {
  console.error('❌ Error: DATABASE_URL is not set in environment or .env file');
  console.log('Usage: DATABASE_URL="postgresql://user:pass@host/db?sslmode=require" npx tsx server/seed-neon.ts');
  process.exit(1);
}

async function runSeed() {
  console.log('🔌 Connecting to Neon PostgreSQL database...');
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const res = await pool.query('SELECT NOW()');
    console.log('⚡ Connected to Neon successfully at:', res.rows[0].now);

    console.log('📦 Creating database tables if not exist...');
    const createTablesSQL = `
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

    await pool.query(createTablesSQL);
    console.log('✅ Tables created or already present');

    // Trigger seeding through db manager
    console.log('🌱 Populating initial data into Neon...');
    await (db as any).seedPostgres?.();

    console.log('🎉 Neon database is fully seeded and ready for production!');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await pool.end();
  }
}

runSeed();
