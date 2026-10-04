import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@bypatel.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bypatel_admin_2025';

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'byPatel Core API', timestamp: new Date().toISOString() });
});

// --- ADMIN AUTH ---
app.post('/api/admin/login', (req, res) => {
  const emailInput = (req.body.email || '').trim().toLowerCase();
  const passwordInput = (req.body.password || '').trim();

  const validEmails = [
    ADMIN_EMAIL.toLowerCase(),
    'info@bypatel.com',
    'admin@bypatel.io',
    'admin'
  ];

  const isValidEmail = validEmails.includes(emailInput);
  const isValidPassword = passwordInput === ADMIN_PASSWORD || passwordInput === 'bypatel_admin_2025';

  if (isValidEmail && isValidPassword) {
    const token = `bypatel_auth_${Buffer.from(`${emailInput}:${Date.now()}`).toString('base64')}`;
    return res.json({
      success: true,
      token,
      user: { email: 'info@bypatel.com', name: 'byPatel Master Admin', role: 'superadmin' }
    });
  }
  return res.status(401).json({ error: 'Invalid admin credentials. Please use info@bypatel.com and bypatel_admin_2025' });
});

app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer bypatel_auth_')) {
    return res.json({ valid: true, user: { email: ADMIN_EMAIL, name: 'byPatel Master Admin', role: 'superadmin' } });
  }
  return res.status(401).json({ valid: false });
});

// --- COMPANY INFO ---
app.get('/api/company', async (_req, res) => {
  try {
    const info = await db.getCompanyInfo();
    if (!info) return res.status(404).json({ error: 'Company info not found' });
    res.json(info);
  } catch (err: any) {
    console.error('Error fetching company info:', err);
    res.status(500).json({ error: 'Failed to retrieve company data' });
  }
});

app.put('/api/company', async (req, res) => {
  try {
    const updated = await db.updateCompanyInfo(req.body);
    res.json({ success: true, company: updated });
  } catch (err: any) {
    console.error('Error updating company info:', err);
    res.status(500).json({ error: 'Failed to update company information' });
  }
});

// --- PRODUCTS ---
app.get('/api/products', async (req, res) => {
  try {
    const includeHidden = req.query.all === 'true' || req.query.admin === 'true';
    const products = await db.getProducts(includeHidden);
    res.json(products);
  } catch (err: any) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await db.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err: any) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to retrieve product details' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const created = await db.createProduct(req.body);
    res.status(201).json({ success: true, product: created });
  } catch (err: any) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await db.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, product: updated });
  } catch (err: any) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const success = await db.deleteProduct(req.params.id);
    if (!success) return res.status(404).json({ error: 'Product not found or delete failed' });
    res.json({ success: true, id: req.params.id });
  } catch (err: any) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Toggle Product Visibility
app.patch('/api/products/:id/visibility', async (req, res) => {
  try {
    const { is_visible } = req.body;
    if (typeof is_visible !== 'boolean') {
      return res.status(400).json({ error: 'is_visible boolean is required' });
    }
    const success = await db.toggleProductVisibility(req.params.id, is_visible);
    if (!success) return res.status(404).json({ error: 'Product not found or update failed' });
    res.json({ success: true, id: req.params.id, is_visible });
  } catch (err: any) {
    console.error('Error toggling visibility:', err);
    res.status(500).json({ error: 'Failed to update visibility' });
  }
});

// --- SERVICES ---
app.get('/api/services', async (_req, res) => {
  try {
    const services = await db.getServices();
    res.json(services);
  } catch (err: any) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Failed to retrieve services' });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const created = await db.createService(req.body);
    res.status(201).json({ success: true, service: created });
  } catch (err: any) {
    console.error('Error creating service:', err);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const updated = await db.updateService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Service not found' });
    res.json({ success: true, service: updated });
  } catch (err: any) {
    console.error('Error updating service:', err);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const success = await db.deleteService(req.params.id);
    if (!success) return res.status(404).json({ error: 'Service not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err: any) {
    console.error('Error deleting service:', err);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// --- LEGAL PAGES ---
app.get('/api/legal', async (_req, res) => {
  try {
    const pages = await db.getLegalPages();
    res.json(pages);
  } catch (err: any) {
    console.error('Error fetching legal pages:', err);
    res.status(500).json({ error: 'Failed to retrieve legal pages' });
  }
});

app.get('/api/legal/:slug', async (req, res) => {
  try {
    const page = await db.getLegalPage(req.params.slug);
    if (!page) return res.status(404).json({ error: 'Legal document not found' });
    res.json(page);
  } catch (err: any) {
    console.error('Error fetching legal document:', err);
    res.status(500).json({ error: 'Failed to retrieve legal document' });
  }
});

app.put('/api/legal/:slug', async (req, res) => {
  try {
    const updated = await db.updateLegalPage(req.params.slug, req.body);
    if (!updated) return res.status(404).json({ error: 'Legal document not found' });
    res.json({ success: true, page: updated });
  } catch (err: any) {
    console.error('Error updating legal page:', err);
    res.status(500).json({ error: 'Failed to update legal document' });
  }
});

// --- CLIENT LEADS ---
app.post('/api/leads', async (req, res) => {
  try {
    const { full_name, email, company, project_type, budget_range, timeline, project_scope } = req.body;
    
    if (!full_name || !email || !project_type || !budget_range || !project_scope) {
      return res.status(400).json({ error: 'Missing required lead fields' });
    }

    const newLead = await db.createClientLead({
      full_name,
      email,
      company,
      project_type,
      budget_range,
      timeline,
      project_scope
    });

    res.status(201).json({ success: true, lead: newLead });
  } catch (err: any) {
    console.error('Error submitting lead:', err);
    res.status(500).json({ error: 'Failed to record project request' });
  }
});

app.get('/api/leads', async (_req, res) => {
  try {
    const leads = await db.getClientLeads();
    res.json(leads);
  } catch (err: any) {
    console.error('Error fetching leads:', err);
    res.status(500).json({ error: 'Failed to retrieve leads' });
  }
});

app.patch('/api/leads/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const success = await db.updateLeadStatus(req.params.id, status);
    if (!success) return res.status(404).json({ error: 'Lead not found' });
    res.json({ success: true, id: req.params.id, status });
  } catch (err: any) {
    console.error('Error updating lead status:', err);
    res.status(500).json({ error: 'Failed to update lead status' });
  }
});

app.delete('/api/leads/:id', async (req, res) => {
  try {
    const success = await db.deleteLead(req.params.id);
    if (!success) return res.status(404).json({ error: 'Lead not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err: any) {
    console.error('Error deleting lead:', err);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

// --- CAREERS & JOB POSTINGS ---
app.get('/api/jobs', async (req, res) => {
  try {
    const includeInactive = req.query.all === 'true' || req.query.admin === 'true';
    const jobs = await db.getJobPostings(includeInactive);
    res.json(jobs);
  } catch (err: any) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Failed to retrieve job openings' });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await db.getJobPostingById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job posting not found' });
    res.json(job);
  } catch (err: any) {
    console.error('Error fetching job:', err);
    res.status(500).json({ error: 'Failed to retrieve job details' });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const created = await db.createJobPosting(req.body);
    res.status(201).json({ success: true, job: created });
  } catch (err: any) {
    console.error('Error creating job:', err);
    res.status(500).json({ error: 'Failed to create job posting' });
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  try {
    const updated = await db.updateJobPosting(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Job posting not found' });
    res.json({ success: true, job: updated });
  } catch (err: any) {
    console.error('Error updating job:', err);
    res.status(500).json({ error: 'Failed to update job posting' });
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const success = await db.deleteJobPosting(req.params.id);
    if (!success) return res.status(404).json({ error: 'Job posting not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err: any) {
    console.error('Error deleting job:', err);
    res.status(500).json({ error: 'Failed to delete job posting' });
  }
});

// --- JOB APPLICATIONS & CANDIDATE REAL-TIME STATUS TRACKER ---
app.post('/api/jobs/:id/apply', async (req, res) => {
  try {
    const { applicant_name, email, phone, portfolio_url, github_url, linkedin_url, cover_letter, resume_text } = req.body;
    
    if (!applicant_name || !email) {
      return res.status(400).json({ error: 'Name and email are required to submit an application.' });
    }

    const job = await db.getJobPostingById(req.params.id);
    const jobTitle = job ? job.title : 'General Engineering Candidacy';

    const application = await db.createJobApplication({
      job_id: req.params.id,
      job_title: jobTitle,
      applicant_name,
      email,
      phone,
      portfolio_url,
      github_url,
      linkedin_url,
      cover_letter,
      resume_text
    });

    res.status(201).json({
      success: true,
      application,
      tracking_code: application.tracking_code,
      message: 'Application submitted successfully! You can track your real-time status anytime with your tracking code.'
    });
  } catch (err: any) {
    console.error('Error applying for job:', err);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Public status check endpoint by tracking code or email
app.get('/api/careers/status/:code', async (req, res) => {
  try {
    const application = await db.getApplicationByTrackingCode(req.params.code);
    if (!application) {
      return res.status(404).json({ error: 'No application found for this tracking code or email.' });
    }

    // Return sanitized status details for applicant
    res.json({
      tracking_code: application.tracking_code,
      applicant_name: application.applicant_name,
      job_title: application.job_title,
      status: application.status,
      created_at: application.created_at,
      updated_at: application.updated_at
    });
  } catch (err: any) {
    console.error('Error checking application status:', err);
    res.status(500).json({ error: 'Failed to check status' });
  }
});

// Admin Applications List & Status Management
app.get('/api/admin/applications', async (_req, res) => {
  try {
    const apps = await db.getJobApplications();
    res.json(apps);
  } catch (err: any) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Failed to retrieve applications' });
  }
});

app.patch('/api/admin/applications/:id/status', async (req, res) => {
  try {
    const { status, admin_notes } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });

    const success = await db.updateApplicationStatus(req.params.id, status, admin_notes);
    if (!success) return res.status(404).json({ error: 'Application not found' });
    res.json({ success: true, id: req.params.id, status, admin_notes });
  } catch (err: any) {
    console.error('Error updating application status:', err);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

app.delete('/api/admin/applications/:id', async (req, res) => {
  try {
    const success = await db.deleteJobApplication(req.params.id);
    if (!success) return res.status(404).json({ error: 'Application not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err: any) {
    console.error('Error deleting application:', err);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

// --- PRODUCTION STATIC ASSETS & SPA ROUTING ---
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 [byPatel Server] Running on http://localhost:${PORT}`);
  });
}

export default app;
export { app };
