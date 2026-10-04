export interface CompanyInfo {
  id: string;
  name: string;
  tagline: string;
  hero_title: string;
  hero_subtitle: string;
  about_narrative: string;
  about_mission: string;
  stats: Array<{
    label: string;
    value: string;
    suffix?: string;
    description?: string;
  }>;
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
  status: 'submitted' | 'under_review' | 'shortlisted' | 'interview_scheduled' | 'offer_extended' | 'archived';
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}
