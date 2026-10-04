import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Lock,
  LogIn,
  LogOut,
  LayoutDashboard,
  Layers,
  Building2,
  Briefcase,
  FileText,
  Users,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Save,
  RefreshCw,
  Sparkles,
  Database,
  Mail,
  Loader2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  KeyRound,
  Sliders,
  DollarSign,
  Clock,
  Star,
  Download,
  UserCheck,
  Phone,
  Code2,
  Link2,
  Globe2,
  MessageSquare,
  Search,
} from 'lucide-react';
import { CompanyInfo, Product, ServiceItem, LegalPage, ClientLead, JobPosting, JobApplication } from '../types';
import { api } from '../api/client';
import { useTheme } from '../context/ThemeContext';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  company: CompanyInfo | null;
  services: ServiceItem[];
  onDataChanged: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  products,
  company,
  services,
  onDataChanged,
}) => {
  const { theme } = useTheme();

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('info@bypatel.com');
  const [password, setPassword] = useState('bypatel_admin_2025');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'careers' | 'applicants' | 'company' | 'services' | 'legal' | 'leads'>('overview');

  // Leads
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Careers & Job Postings
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<JobPosting> | null>(null);
  const [isNewJob, setIsNewJob] = useState(false);
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const [savingJob, setSavingJob] = useState(false);

  // Job Applications
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [selectedAppModal, setSelectedAppModal] = useState<JobApplication | null>(null);
  const [applicantFilterStatus, setApplicantFilterStatus] = useState<string>('all');

  // Legal Pages
  const [legalPages, setLegalPages] = useState<LegalPage[]>([]);
  const [selectedLegalSlug, setSelectedLegalSlug] = useState('privacy-policy');
  const [legalContent, setLegalContent] = useState('');
  const [legalTitle, setLegalTitle] = useState('');
  const [savingLegal, setSavingLegal] = useState(false);

  // Editing / Creating Product Modal State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);

  // Editing / Creating Service Modal State
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isNewService, setIsNewService] = useState(false);
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [savingService, setSavingService] = useState(false);

  // Company Form State
  const [companyForm, setCompanyForm] = useState<Partial<CompanyInfo>>({});
  const [savingCompany, setSavingCompany] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem('bypatel_admin_token');
    if (token) {
      api.adminVerify(token).then((res) => {
        if (res.valid) setIsAuthenticated(true);
      });
    }
  }, []);

  useEffect(() => {
    if (company) {
      setCompanyForm(company);
    }
  }, [company]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchLeads();
      fetchLegalPages();
      fetchJobs();
      fetchApplications();
    }
  }, [isOpen, isAuthenticated]);

  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      const data = await api.getJobs(true);
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoadingApplications(true);
      const data = await api.getAdminApplications();
      setApplications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingApplications(false);
    }
  };

  const fetchLeads = async () => {
    try {
      setLoadingLeads(true);
      const data = await api.getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchLegalPages = async () => {
    try {
      const data = await api.getLegalPages();
      setLegalPages(data);
      if (data.length > 0) {
        const current = data.find((p) => p.slug === selectedLegalSlug) || data[0];
        setSelectedLegalSlug(current.slug);
        setLegalTitle(current.title);
        setLegalContent(current.content_markdown);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const res = await api.adminLogin(email, password);
      localStorage.setItem('bypatel_admin_token', res.token);
      setIsAuthenticated(true);
      showToast('Welcome back, Master Admin');
    } catch (err: any) {
      setAuthError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bypatel_admin_token');
    setIsAuthenticated(false);
    showToast('Signed out securely');
  };

  // --- Product Handlers ---
  const handleToggleProductVisibility = async (id: string, is_visible: boolean) => {
    try {
      await api.toggleProductVisibility(id, is_visible);
      showToast(`Product visibility updated`);
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle visibility');
    }
  };

  const handleOpenNewProduct = () => {
    setIsNewProduct(true);
    setEditingProduct({
      id: `prod_${Date.now()}`,
      title: '',
      subtitle: '',
      category: 'Mobile App',
      description: '',
      long_description: '',
      icon_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=256&auto=format&fit=crop&q=80',
      mockup_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000&auto=format&fit=crop&q=80',
      banner_url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1400&auto=format&fit=crop&q=80',
      screenshots: ['https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80'],
      feature_list: ['Fluid 120 FPS micro-animations', 'Native Apple & Android performance'],
      tech_stack: ['Swift', 'SwiftUI', 'Node.js', 'PostgreSQL'],
      rating: 4.9,
      total_downloads: '100K+',
      release_date: 'Fall 2025',
      is_featured: true,
      is_visible: true,
      display_order: products.length + 1,
    });
    setProductFormOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setIsNewProduct(false);
    setEditingProduct({ ...prod });
    setProductFormOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.title) return;
    setSavingProduct(true);
    try {
      if (isNewProduct) {
        await api.createProduct(editingProduct);
        showToast('New product release created');
      } else {
        await api.updateProduct(editingProduct.id!, editingProduct);
        showToast('Product release updated');
      }
      setProductFormOpen(false);
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to save product');
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this product?')) return;
    try {
      await api.deleteProduct(id);
      showToast('Product removed');
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    }
  };

  // --- Careers Handlers ---
  const handleOpenNewJob = () => {
    setIsNewJob(true);
    setEditingJob({
      id: `job_${Date.now()}`,
      title: '',
      department: 'Mobile Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      experience_level: 'Senior',
      salary_range: '$150k - $200k + Equity',
      description: '',
      responsibilities: ['Architect and deliver fluid, responsive user experiences', 'Maintain highest standards of software performance and security'],
      requirements: ['3+ years of relevant industry engineering experience', 'Passion for high polish, minimal design, and Apple-grade precision'],
      benefits: ['100% employer-paid health/dental/vision', 'Latest MacBook Pro hardware setup + home office budget'],
      is_active: true,
    });
    setJobFormOpen(true);
  };

  const handleOpenEditJob = (job: JobPosting) => {
    setIsNewJob(false);
    setEditingJob({ ...job });
    setJobFormOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob || !editingJob.title) return;
    setSavingJob(true);
    try {
      if (isNewJob) {
        await api.createJob(editingJob);
        showToast('Career opening published');
      } else {
        await api.updateJob(editingJob.id!, editingJob);
        showToast('Career opening updated');
      }
      setJobFormOpen(false);
      fetchJobs();
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to save job');
    } finally {
      setSavingJob(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Delete this job posting and related applications?')) return;
    try {
      await api.deleteJob(id);
      showToast('Job posting deleted');
      fetchJobs();
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to delete job');
    }
  };

  const handleToggleJobActive = async (job: JobPosting) => {
    try {
      await api.updateJob(job.id, { is_active: !job.is_active });
      showToast(`Job ${!job.is_active ? 'activated' : 'deactivated'}`);
      fetchJobs();
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to update job status');
    }
  };

  // --- Applicant Reviewer CRM Handlers ---
  const handleUpdateApplicationStatus = async (id: string, status: string, notes?: string) => {
    try {
      await api.updateApplicationStatus(id, status, notes);
      showToast(`Applicant status marked as ${status}`);
      fetchApplications();
    } catch (err: any) {
      alert(err.message || 'Failed to update candidate status');
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm('Delete this applicant submission?')) return;
    try {
      await api.deleteApplication(id);
      showToast('Application deleted');
      fetchApplications();
    } catch (err: any) {
      alert(err.message || 'Failed to delete application');
    }
  };

  // --- Company & Services Handlers ---
  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCompany(true);
    try {
      await api.updateCompanyInfo(companyForm);
      showToast('Company identity updated');
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to save company info');
    } finally {
      setSavingCompany(false);
    }
  };

  const handleOpenNewService = () => {
    setIsNewService(true);
    setEditingService({
      id: `srv_${Date.now()}`,
      title: '',
      slug: `service-${Date.now()}`,
      category: 'Mobile Engineering',
      short_description: '',
      full_description: '',
      icon_name: 'Smartphone',
      deliverables: ['Native iOS & Android Applications', 'App Store Submission & Optimization'],
      technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
      badge_text: 'Flagship Core',
      display_order: services.length + 1,
    });
    setServiceFormOpen(true);
  };

  const handleOpenEditService = (srv: ServiceItem) => {
    setIsNewService(false);
    setEditingService({ ...srv });
    setServiceFormOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;
    setSavingService(true);
    try {
      if (isNewService) {
        await api.createService(editingService as ServiceItem);
        showToast('Service pillar created');
      } else {
        await api.updateService(editingService.id!, editingService);
        showToast('Service pillar updated');
      }
      setServiceFormOpen(false);
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to save service');
    } finally {
      setSavingService(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Delete this service pillar?')) return;
    try {
      await api.deleteService(id);
      showToast('Service removed');
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to delete service');
    }
  };

  const handleSelectLegalDoc = (slug: string) => {
    setSelectedLegalSlug(slug);
    const doc = legalPages.find((p) => p.slug === slug);
    if (doc) {
      setLegalTitle(doc.title);
      setLegalContent(doc.content_markdown);
    }
  };

  const handleSaveLegal = async () => {
    setSavingLegal(true);
    try {
      await api.updateLegalPage(selectedLegalSlug, {
        title: legalTitle,
        content_markdown: legalContent,
      });
      showToast('Legal specifications saved');
      fetchLegalPages();
    } catch (err: any) {
      alert(err.message || 'Failed to save legal page');
    } finally {
      setSavingLegal(false);
    }
  };

  const handleUpdateLeadStatus = async (id: string, status: string) => {
    try {
      await api.updateLeadStatus(id, status);
      showToast(`Lead marked as ${status}`);
      fetchLeads();
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Delete this client lead record?')) return;
    try {
      await api.deleteLead(id);
      showToast('Lead deleted');
      fetchLeads();
    } catch (err: any) {
      alert(err.message || 'Failed to delete lead');
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (applicantFilterStatus === 'all') return true;
    return app.status === applicantFilterStatus;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-6 md:p-8 text-zinc-900 dark:text-zinc-100">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          className="relative w-full max-w-6xl h-[88vh] bg-white dark:bg-[#101014] rounded-[28px] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar Header */}
          <div className="h-16 px-6 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-950/60 backdrop-blur-xl shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-black text-xs shadow-sm">
                bP
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading text-sm font-bold text-zinc-950 dark:text-white">
                    byPatel Studio Control Center
                  </h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-500/30">
                    Master v2.2
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Direct database synchronization • PostgreSQL & SQLite
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{toastMessage}</span>
                </motion.div>
              )}

              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-700 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1.5 border border-black/[0.06] dark:border-white/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors border border-black/[0.06] dark:border-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          {!isAuthenticated ? (
            /* Apple ID Style Authentication */
            <div className="flex-1 flex items-center justify-center p-6 bg-zinc-50/50 dark:bg-black/20">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm p-8 bg-white dark:bg-[#141419] rounded-3xl border border-black/10 dark:border-white/10 shadow-xl space-y-6 text-center"
              >
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/[0.06] border border-black/5 dark:border-white/10 text-zinc-900 dark:text-white mx-auto flex items-center justify-center shadow-inner">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-zinc-950 dark:text-white">Admin Authorization</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Enter master credentials to unlock dynamic platform control.
                  </p>
                </div>

                {authError && (
                  <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-300 text-xs font-medium flex items-center gap-2 text-left">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-3.5 text-left">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      Admin Email
                    </label>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-zinc-950 dark:text-white text-xs sm:text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-zinc-950 dark:text-white text-xs sm:text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-4"
                  >
                    {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                    <span>Authenticate & Access</span>
                  </button>
                </form>
              </motion.div>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Minimalist Sidebar Nav */}
              <div className="w-full md:w-60 bg-zinc-50/70 dark:bg-zinc-950/40 border-b md:border-b-0 md:border-r border-black/[0.06] dark:border-white/[0.08] p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-all ${
                    activeTab === 'overview'
                      ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-all ${
                    activeTab === 'products'
                      ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Products ({products.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('careers');
                    fetchJobs();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-all ${
                    activeTab === 'careers'
                      ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Careers & Roles ({jobs.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('applicants');
                    fetchApplications();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-all ${
                    activeTab === 'applicants'
                      ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Applicants CRM ({applications.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('company')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-all ${
                    activeTab === 'company'
                      ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Company Identity</span>
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-all ${
                    activeTab === 'services'
                      ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span>Service Pillars ({services.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('legal')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-all ${
                    activeTab === 'legal'
                      ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Legal Pages</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('leads');
                    fetchLeads();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-all ${
                    activeTab === 'leads'
                      ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Inquiries & Leads ({leads.length})</span>
                </button>
              </div>

              {/* Workspace Content View */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {/* TAB 1: OVERVIEW */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 space-y-2">
                        <div className="flex items-center justify-between text-xs text-zinc-500 font-bold uppercase tracking-wider">
                          <span>Products</span>
                          <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="text-3xl font-extrabold text-zinc-950 dark:text-white font-heading">{products.length}</div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                          {products.filter((p) => p.is_visible).length} live on feed
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 space-y-2">
                        <div className="flex items-center justify-between text-xs text-zinc-500 font-bold uppercase tracking-wider">
                          <span>Applicants CRM</span>
                          <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="text-3xl font-extrabold text-zinc-950 dark:text-white font-heading">{applications.length}</div>
                        <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                          {applications.filter((a) => a.status === 'submitted').length} awaiting review
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 space-y-2">
                        <div className="flex items-center justify-between text-xs text-zinc-500 font-bold uppercase tracking-wider">
                          <span>Client Leads</span>
                          <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div className="text-3xl font-extrabold text-zinc-950 dark:text-white font-heading">{leads.length}</div>
                        <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                          {leads.filter((l) => l.status === 'new').length} unhandled briefs
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 space-y-2">
                        <div className="flex items-center justify-between text-xs text-zinc-500 font-bold uppercase tracking-wider">
                          <span>Open Roles</span>
                          <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="text-3xl font-extrabold text-zinc-950 dark:text-white font-heading">{jobs.length}</div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                          {jobs.filter((j) => j.is_active).length} actively hiring
                        </div>
                      </div>
                    </div>

                    {/* Quick Shortcuts */}
                    <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/10 space-y-4">
                      <h3 className="font-heading text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Quick Content Shortcuts</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <button
                          onClick={handleOpenNewProduct}
                          className="p-4 rounded-xl bg-white dark:bg-zinc-900 hover:border-indigo-500 border border-black/[0.06] dark:border-white/10 text-left transition-all cursor-pointer group shadow-sm"
                        >
                          <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                          <div className="text-xs font-bold text-zinc-950 dark:text-white">Publish New Product</div>
                          <div className="text-[11px] text-zinc-500">Add app/game releases</div>
                        </button>

                        <button
                          onClick={handleOpenNewJob}
                          className="p-4 rounded-xl bg-white dark:bg-zinc-900 hover:border-purple-500 border border-black/[0.06] dark:border-white/10 text-left transition-all cursor-pointer group shadow-sm"
                        >
                          <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                          <div className="text-xs font-bold text-zinc-950 dark:text-white">Post New Job</div>
                          <div className="text-[11px] text-zinc-500">Publish engineering role</div>
                        </button>

                        <button
                          onClick={() => {
                            setActiveTab('applicants');
                            fetchApplications();
                          }}
                          className="p-4 rounded-xl bg-white dark:bg-zinc-900 hover:border-emerald-500 border border-black/[0.06] dark:border-white/10 text-left transition-all cursor-pointer group shadow-sm"
                        >
                          <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                          <div className="text-xs font-bold text-zinc-950 dark:text-white">Review Applicants</div>
                          <div className="text-[11px] text-zinc-500">Live candidate tracker CRM</div>
                        </button>

                        <button
                          onClick={() => {
                            setActiveTab('leads');
                            fetchLeads();
                          }}
                          className="p-4 rounded-xl bg-white dark:bg-zinc-900 hover:border-cyan-500 border border-black/[0.06] dark:border-white/10 text-left transition-all cursor-pointer group shadow-sm"
                        >
                          <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                          <div className="text-xs font-bold text-zinc-950 dark:text-white">Review Client Leads</div>
                          <div className="text-[11px] text-zinc-500">Incoming project briefs</div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: PRODUCTS MANAGER */}
                {activeTab === 'products' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-base font-bold text-zinc-950 dark:text-white">Product Catalog</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Manage release items, store deep-links, and toggle visibility on the live site.</p>
                      </div>
                      <button
                        onClick={handleOpenNewProduct}
                        className="px-3.5 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Product</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {products.map((p) => (
                        <div
                          key={p.id}
                          className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                        >
                          <div className="flex items-center gap-3.5">
                            <img
                              src={p.icon_url}
                              alt={p.title}
                              className="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10 shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-heading text-sm font-bold text-zinc-950 dark:text-white">{p.title}</h4>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.05] dark:bg-white/10 text-zinc-800 dark:text-zinc-200 font-medium">
                                  {p.category}
                                </span>
                              </div>
                              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{p.subtitle}</p>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">{p.description}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              onClick={() => handleToggleProductVisibility(p.id, !p.is_visible)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                                p.is_visible
                                  ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-black/10 dark:border-zinc-700'
                              }`}
                            >
                              {p.is_visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              <span>{p.is_visible ? 'Live Feed' : 'Hidden'}</span>
                            </button>

                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-black/[0.06] dark:border-white/10 cursor-pointer shadow-sm"
                              title="Edit product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-2 rounded-xl bg-red-50 dark:bg-red-500/10 hover:bg-red-100 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: CAREERS & JOB POSTINGS CMS */}
                {activeTab === 'careers' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-base font-bold text-zinc-950 dark:text-white">Career Openings</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Post open roles, manage descriptions, salary bands, and toggle hiring status.</p>
                      </div>
                      <button
                        onClick={handleOpenNewJob}
                        className="px-3.5 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Post New Role</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {jobs.map((job) => (
                        <div
                          key={job.id}
                          className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-heading text-sm font-bold text-zinc-950 dark:text-white">{job.title}</h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-500/30">
                                {job.department}
                              </span>
                              <span className="text-xs font-semibold text-zinc-500">{job.type}</span>
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-3">
                              <span>{job.location}</span>
                              {job.salary_range && <span>• {job.salary_range}</span>}
                              <span>• {job.experience_level}</span>
                            </div>
                            <div className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-1">{job.description}</div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              onClick={() => handleToggleJobActive(job)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                                job.is_active
                                  ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-black/10 dark:border-zinc-700'
                              }`}
                            >
                              {job.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              <span>{job.is_active ? 'Actively Hiring' : 'Paused'}</span>
                            </button>

                            <button
                              onClick={() => handleOpenEditJob(job)}
                              className="p-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-black/[0.06] dark:border-white/10 cursor-pointer shadow-sm"
                              title="Edit job"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="p-2 rounded-xl bg-red-50 dark:bg-red-500/10 hover:bg-red-100 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 cursor-pointer"
                              title="Delete job"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: APPLICANTS REVIEWER CRM */}
                {activeTab === 'applicants' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="font-heading text-base font-bold text-zinc-950 dark:text-white">Applicant Reviewer CRM</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Review candidate submissions, update tracking milestones, and inspect portfolios.</p>
                      </div>

                      {/* Status Filter */}
                      <div className="flex items-center gap-1.5 bg-black/[0.04] dark:bg-white/[0.06] p-1 rounded-xl">
                        {['all', 'submitted', 'under_review', 'shortlisted', 'interview_scheduled', 'offer_extended', 'archived'].map((st) => (
                          <button
                            key={st}
                            onClick={() => setApplicantFilterStatus(st)}
                            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg capitalize transition-all cursor-pointer ${
                              applicantFilterStatus === st
                                ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                            }`}
                          >
                            {st.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {loadingApplications ? (
                      <div className="py-12 flex justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                      </div>
                    ) : filteredApplications.length === 0 ? (
                      <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-black/[0.06] dark:border-white/10 text-xs text-zinc-500">
                        No candidate applications matching this status.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredApplications.map((app) => (
                          <div
                            key={app.id}
                            className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 space-y-3 shadow-sm"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-heading text-base font-extrabold text-zinc-950 dark:text-white">{app.applicant_name}</h4>
                                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                                    {app.tracking_code}
                                  </span>
                                </div>
                                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{app.job_title}</div>
                              </div>

                              {/* Status Dropdown */}
                              <div className="flex items-center gap-2">
                                <select
                                  value={app.status}
                                  onChange={(e) => handleUpdateApplicationStatus(app.id, e.target.value)}
                                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/15 text-xs font-bold text-zinc-950 dark:text-white focus:outline-none cursor-pointer"
                                >
                                  <option value="submitted">Submitted</option>
                                  <option value="under_review">Under Review</option>
                                  <option value="shortlisted">Shortlisted</option>
                                  <option value="interview_scheduled">Interview Scheduled</option>
                                  <option value="offer_extended">Offer Extended</option>
                                  <option value="archived">Archived / Rejected</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteApplication(app.id)}
                                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                                  title="Delete applicant"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Applicant Contact & Links */}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400 pt-1">
                              <a href={`mailto:${app.email}`} className="flex items-center gap-1.5 hover:text-indigo-600">
                                <Mail className="w-3.5 h-3.5" />
                                <span>{app.email}</span>
                              </a>
                              {app.phone && (
                                <a href={`tel:${app.phone}`} className="flex items-center gap-1.5 hover:text-indigo-600">
                                  <Phone className="w-3.5 h-3.5" />
                                  <span>{app.phone}</span>
                                </a>
                              )}
                              {app.portfolio_url && (
                                <a href={app.portfolio_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-indigo-600 hover:underline">
                                  <Globe2 className="w-3.5 h-3.5" />
                                  <span>Portfolio</span>
                                </a>
                              )}
                              {app.github_url && (
                                <a href={app.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-indigo-600 hover:underline">
                                  <Code2 className="w-3.5 h-3.5" />
                                  <span>GitHub / Store</span>
                                </a>
                              )}
                            </div>

                            {/* Cover Letter / Note */}
                            {app.cover_letter && (
                              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-950/60 border border-black/[0.04] dark:border-white/5 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                <span className="font-bold text-zinc-500 uppercase tracking-wider text-[10px] block mb-1">Candidate Note</span>
                                {app.cover_letter}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 5: COMPANY IDENTITY */}
                {activeTab === 'company' && (
                  <form onSubmit={handleSaveCompany} className="space-y-5 max-w-3xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-base font-bold text-zinc-950 dark:text-white">Studio Brand & Story</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Update global narrative, hero claims, and contact endpoints.</p>
                      </div>
                      <button
                        type="submit"
                        disabled={savingCompany}
                        className="px-4 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                      >
                        {savingCompany ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        <span>Save Changes</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Studio Name</label>
                        <input
                          type="text"
                          value={companyForm.name || ''}
                          onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Tagline</label>
                        <input
                          type="text"
                          value={companyForm.tagline || ''}
                          onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Hero Headline</label>
                        <input
                          type="text"
                          value={companyForm.hero_title || ''}
                          onChange={(e) => setCompanyForm({ ...companyForm, hero_title: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Hero Subtitle</label>
                        <textarea
                          rows={2}
                          value={companyForm.hero_subtitle || ''}
                          onChange={(e) => setCompanyForm({ ...companyForm, hero_subtitle: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">About & Philosophy Narrative</label>
                        <textarea
                          rows={4}
                          value={companyForm.about_narrative || ''}
                          onChange={(e) => setCompanyForm({ ...companyForm, about_narrative: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Contact Email</label>
                        <input
                          type="email"
                          value={companyForm.contact_email || ''}
                          onChange={(e) => setCompanyForm({ ...companyForm, contact_email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Contact Phone</label>
                        <input
                          type="text"
                          value={companyForm.contact_phone || ''}
                          onChange={(e) => setCompanyForm({ ...companyForm, contact_phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </form>
                )}

                {/* TAB 6: SERVICES */}
                {activeTab === 'services' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-base font-bold text-zinc-950 dark:text-white">Studio Service Pillars</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Manage deliverables, category tags, and core capabilities.</p>
                      </div>
                      <button
                        onClick={handleOpenNewService}
                        className="px-3.5 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Service</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {services.map((s) => (
                        <div
                          key={s.id}
                          className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 flex items-center justify-between gap-4 shadow-sm"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-heading text-sm font-bold text-zinc-950 dark:text-white">{s.title}</h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.05] dark:bg-white/10 text-zinc-800 dark:text-zinc-200 font-medium">
                                {s.category}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{s.short_description}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleOpenEditService(s)}
                              className="p-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 text-zinc-700 dark:text-zinc-200 border border-black/[0.06] dark:border-white/10 cursor-pointer shadow-sm"
                              title="Edit service"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(s.id)}
                              className="p-2 rounded-xl bg-red-50 dark:bg-red-500/10 hover:bg-red-100 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 cursor-pointer"
                              title="Delete service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 7: LEGAL PAGES */}
                {activeTab === 'legal' && (
                  <div className="space-y-4 max-w-3xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-base font-bold text-zinc-950 dark:text-white">Legal Documents CMS</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Edit dynamic Markdown terms and privacy specifications.</p>
                      </div>
                      <button
                        onClick={handleSaveLegal}
                        disabled={savingLegal}
                        className="px-4 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                      >
                        {savingLegal ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        <span>Save Document</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 pb-2">
                      {legalPages.map((lp) => (
                        <button
                          key={lp.slug}
                          onClick={() => handleSelectLegalDoc(lp.slug)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedLegalSlug === lp.slug
                              ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                              : 'bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                          }`}
                        >
                          {lp.title}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Document Title</label>
                        <input
                          type="text"
                          value={legalTitle}
                          onChange={(e) => setLegalTitle(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">Markdown Content</label>
                        <textarea
                          rows={12}
                          value={legalContent}
                          onChange={(e) => setLegalContent(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white font-mono focus:outline-none leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 8: LEADS */}
                {activeTab === 'leads' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-base font-bold text-zinc-950 dark:text-white">Client Outreach & Requests</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Incoming prospective client scopes, budgets, and contact info.</p>
                      </div>
                      <button
                        onClick={fetchLeads}
                        className="px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Refresh</span>
                      </button>
                    </div>

                    {loadingLeads ? (
                      <div className="py-12 flex justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                      </div>
                    ) : leads.length === 0 ? (
                      <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-black/[0.06] dark:border-white/10 text-xs text-zinc-500">
                        No client leads received yet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {leads.map((l) => (
                          <div
                            key={l.id}
                            className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 space-y-3 shadow-sm"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <h4 className="font-heading text-base font-extrabold text-zinc-950 dark:text-white">{l.full_name}</h4>
                                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{l.company || 'Private Venture'}</div>
                              </div>

                              <div className="flex items-center gap-2">
                                <select
                                  value={l.status}
                                  onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value)}
                                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/15 text-xs font-bold text-zinc-950 dark:text-white focus:outline-none cursor-pointer"
                                >
                                  <option value="new">New Lead</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="proposal_sent">Proposal Sent</option>
                                  <option value="closed_won">Closed / Won</option>
                                  <option value="archived">Archived</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteLead(l.id)}
                                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                                  title="Delete lead"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-950/60 border border-black/[0.04] dark:border-white/5 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                              {l.project_scope}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                              <a href={`mailto:${l.email}`} className="flex items-center gap-1.5 hover:text-indigo-600">
                                <Mail className="w-3.5 h-3.5" />
                                <span>{l.email}</span>
                              </a>
                              <span className="flex items-center gap-1.5">
                                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Budget: {l.budget_range}</span>
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-purple-600" />
                                <span>Timeline: {l.timeline || 'Flexible'}</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* JOB POSTING MODAL FORM */}
        <AnimatePresence>
          {jobFormOpen && editingJob && (
            <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setJobFormOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl bg-white dark:bg-[#15151a] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 z-10 text-zinc-900 dark:text-zinc-100 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/10 pb-4">
                  <h3 className="font-heading text-lg font-bold text-zinc-950 dark:text-white">
                    {isNewJob ? 'Post New Career Role' : 'Edit Career Role'}
                  </h3>
                  <button
                    onClick={() => setJobFormOpen(false)}
                    className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-500 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveJob} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold uppercase">Role Title *</label>
                      <input
                        type="text"
                        required
                        value={editingJob.title || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                        placeholder="e.g. Lead iOS & SwiftUI Architect"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase">Department</label>
                      <select
                        value={editingJob.department || 'Mobile Engineering'}
                        onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      >
                        <option value="Mobile Engineering">Mobile Engineering</option>
                        <option value="Game Development">Game Development</option>
                        <option value="Web & Infrastructure">Web & Infrastructure</option>
                        <option value="Design & UX">Design & UX</option>
                        <option value="AI & Systems">AI & Systems</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase">Location</label>
                      <input
                        type="text"
                        value={editingJob.location || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                        placeholder="e.g. Remote (Global) or SF / Hybrid"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase">Employment Type</label>
                      <input
                        type="text"
                        value={editingJob.type || 'Full-time'}
                        onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })}
                        placeholder="Full-time / Contract"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase">Salary / Compensation Band</label>
                      <input
                        type="text"
                        value={editingJob.salary_range || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, salary_range: e.target.value })}
                        placeholder="e.g. $150k - $200k + Equity"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold uppercase">Role Description & Mission *</label>
                      <textarea
                        required
                        rows={3}
                        value={editingJob.description || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                        placeholder="Describe the technical challenges, tech stack, and impact of this role..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-black/[0.06] dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => setJobFormOpen(false)}
                      className="px-4 py-2 rounded-xl bg-black/[0.05] dark:bg-white/[0.08] text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingJob}
                      className="px-5 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {savingJob ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save Job</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* PRODUCT FORM MODAL */}
        <AnimatePresence>
          {productFormOpen && editingProduct && (
            <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setProductFormOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl bg-white dark:bg-[#15151a] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 z-10 text-zinc-900 dark:text-zinc-100 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/10 pb-4">
                  <h3 className="font-heading text-lg font-bold text-zinc-950 dark:text-white">
                    {isNewProduct ? 'Create New Product Release' : 'Edit Product Details'}
                  </h3>
                  <button
                    onClick={() => setProductFormOpen(false)}
                    className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-500 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase">Product Title *</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.title || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase">Subtitle Tagline *</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.subtitle || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase">Category</label>
                      <select
                        value={editingProduct.category || 'Mobile App'}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      >
                        <option value="Mobile App">Mobile App</option>
                        <option value="Game">Game</option>
                        <option value="Web Platform">Web Platform</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase">Total Downloads / Users</label>
                      <input
                        type="text"
                        value={editingProduct.total_downloads || '100K+'}
                        onChange={(e) => setEditingProduct({ ...editingProduct, total_downloads: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold uppercase">Icon URL</label>
                      <input
                        type="text"
                        value={editingProduct.icon_url || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, icon_url: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold uppercase">Short Description *</label>
                      <textarea
                        required
                        rows={2}
                        value={editingProduct.description || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase">App Store URL</label>
                      <input
                        type="text"
                        value={editingProduct.app_store_url || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, app_store_url: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase">Play Store URL</label>
                      <input
                        type="text"
                        value={editingProduct.play_store_url || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, play_store_url: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-black/[0.06] dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => setProductFormOpen(false)}
                      className="px-4 py-2 rounded-xl bg-black/[0.05] dark:bg-white/[0.08] text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingProduct}
                      className="px-5 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {savingProduct ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save Product</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};
