import { CompanyInfo, Product, ServiceItem, LegalPage, ClientLead, JobPosting, JobApplication } from '../types';

const API_BASE = '/api';

export const api = {
  // Admin Auth
  adminLogin: async (email: string, password: string): Promise<{ success: boolean; token: string; user: any }> => {
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: (email || '').trim(), password: (password || '').trim() }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || `Authentication failed (Status ${res.status})`);
      }
      return data;
    } catch (err: any) {
      throw new Error(err.message || 'Authentication failed');
    }
  },

  adminVerify: async (token: string): Promise<{ valid: boolean; user?: any }> => {
    try {
      if (!token || typeof token !== 'string') return { valid: false };
      const cleanToken = token.trim();
      const res = await fetch(`${API_BASE}/admin/verify`, {
        headers: {
          'Authorization': `Bearer ${cleanToken}`,
          'Accept': 'application/json'
        },
      });
      if (!res.ok) return { valid: false };
      return await res.json();
    } catch {
      return { valid: false };
    }
  },

  // Company Info
  getCompanyInfo: async (): Promise<CompanyInfo> => {
    const res = await fetch(`${API_BASE}/company`);
    if (!res.ok) throw new Error('Failed to fetch company information');
    return res.json();
  },

  updateCompanyInfo: async (company: Partial<CompanyInfo>): Promise<CompanyInfo> => {
    const res = await fetch(`${API_BASE}/company`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    });
    if (!res.ok) throw new Error('Failed to update company information');
    const data = await res.json();
    return data.company;
  },

  // Products
  getProducts: async (all = false): Promise<Product[]> => {
    const res = await fetch(`${API_BASE}/products${all ? '?all=true' : ''}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  getProductById: async (id: string): Promise<Product> => {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product details');
    return res.json();
  },

  createProduct: async (product: Partial<Product>): Promise<Product> => {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to create product');
    const data = await res.json();
    return data.product;
  },

  updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to update product');
    const data = await res.json();
    return data.product;
  },

  deleteProduct: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return res.json();
  },

  toggleProductVisibility: async (id: string, is_visible: boolean): Promise<{ success: boolean; id: string; is_visible: boolean }> => {
    const res = await fetch(`${API_BASE}/products/${id}/visibility`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_visible }),
    });
    if (!res.ok) throw new Error('Failed to update product visibility');
    return res.json();
  },

  // Services
  getServices: async (): Promise<ServiceItem[]> => {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },

  createService: async (service: Partial<ServiceItem>): Promise<ServiceItem> => {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    if (!res.ok) throw new Error('Failed to create service');
    const data = await res.json();
    return data.service;
  },

  updateService: async (id: string, service: Partial<ServiceItem>): Promise<ServiceItem> => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    if (!res.ok) throw new Error('Failed to update service');
    const data = await res.json();
    return data.service;
  },

  deleteService: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete service');
    return res.json();
  },

  // Legal Pages
  getLegalPages: async (): Promise<LegalPage[]> => {
    const res = await fetch(`${API_BASE}/legal`);
    if (!res.ok) throw new Error('Failed to fetch legal pages');
    return res.json();
  },

  getLegalPage: async (slug: string): Promise<LegalPage> => {
    const res = await fetch(`${API_BASE}/legal/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch legal document');
    return res.json();
  },

  updateLegalPage: async (slug: string, data: { title?: string; content_markdown?: string }): Promise<LegalPage> => {
    const res = await fetch(`${API_BASE}/legal/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update legal document');
    const resData = await res.json();
    return resData.page;
  },

  // Client Leads
  submitLead: async (lead: {
    full_name: string;
    email: string;
    company?: string;
    project_type: string;
    budget_range: string;
    timeline?: string;
    project_scope: string;
  }): Promise<{ success: boolean; lead: ClientLead }> => {
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          full_name: (lead.full_name || '').trim(),
          email: (lead.email || '').trim(),
          company: (lead.company || '').trim(),
          project_type: (lead.project_type || 'Mobile App').trim(),
          budget_range: (lead.budget_range || 'Flexible').trim(),
          timeline: (lead.timeline || 'Flexible').trim(),
          project_scope: (lead.project_scope || '').trim(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || `Failed to submit inquiry (Status ${res.status})`);
      }
      return data;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to submit project inquiry');
    }
  },

  getLeads: async (): Promise<ClientLead[]> => {
    const res = await fetch(`${API_BASE}/leads`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch leads');
    return res.json();
  },

  updateLeadStatus: async (id: string, status: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE}/leads/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update lead status');
    return res.json();
  },

  deleteLead: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE}/leads/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to delete lead');
    return res.json();
  },

  // --- Careers & Job Postings ---
  getJobs: async (all = false): Promise<JobPosting[]> => {
    const res = await fetch(`${API_BASE}/jobs${all ? '?all=true' : ''}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch job postings');
    return res.json();
  },

  getJobById: async (id: string): Promise<JobPosting> => {
    const res = await fetch(`${API_BASE}/jobs/${id}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch job details');
    return res.json();
  },

  createJob: async (job: Partial<JobPosting>): Promise<JobPosting> => {
    const res = await fetch(`${API_BASE}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(job),
    });
    if (!res.ok) throw new Error('Failed to create job posting');
    const data = await res.json();
    return data.job;
  },

  updateJob: async (id: string, job: Partial<JobPosting>): Promise<JobPosting> => {
    const res = await fetch(`${API_BASE}/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(job),
    });
    if (!res.ok) throw new Error('Failed to update job posting');
    const data = await res.json();
    return data.job;
  },

  deleteJob: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE}/jobs/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to delete job posting');
    return res.json();
  },

  // --- Job Applications & Live Candidate Status Tracker ---
  applyForJob: async (jobId: string, application: {
    applicant_name: string;
    email: string;
    phone?: string;
    portfolio_url?: string;
    github_url?: string;
    linkedin_url?: string;
    cover_letter?: string;
    resume_text?: string;
  }): Promise<{ success: boolean; tracking_code: string; application: JobApplication; message: string }> => {
    try {
      const res = await fetch(`${API_BASE}/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          applicant_name: (application.applicant_name || '').trim(),
          email: (application.email || '').trim(),
          phone: (application.phone || '').trim(),
          portfolio_url: (application.portfolio_url || '').trim(),
          github_url: (application.github_url || '').trim(),
          linkedin_url: (application.linkedin_url || '').trim(),
          cover_letter: (application.cover_letter || '').trim(),
          resume_text: (application.resume_text || '').trim(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || `Failed to submit application (Status ${res.status})`);
      }
      return data;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to submit application');
    }
  },

  checkApplicationStatus: async (code: string): Promise<{
    tracking_code: string;
    applicant_name: string;
    job_title: string;
    status: 'submitted' | 'under_review' | 'shortlisted' | 'interview_scheduled' | 'offer_extended' | 'archived';
    created_at: string;
    updated_at: string;
  }> => {
    try {
      const cleanCode = (code || '').trim();
      const res = await fetch(`${API_BASE}/careers/status/${encodeURIComponent(cleanCode)}`, {
        headers: { 'Accept': 'application/json' },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || 'Application not found with that tracking code or email');
      }
      return data;
    } catch (err: any) {
      throw new Error(err.message || 'Application not found');
    }
  },

  getAdminApplications: async (): Promise<JobApplication[]> => {
    const res = await fetch(`${API_BASE}/admin/applications`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch job applications');
    return res.json();
  },

  updateApplicationStatus: async (id: string, status: string, admin_notes?: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE}/admin/applications/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ status, admin_notes }),
    });
    if (!res.ok) throw new Error('Failed to update candidate status');
    return res.json();
  },

  deleteApplication: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_BASE}/admin/applications/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to delete application');
    return res.json();
  },
};
