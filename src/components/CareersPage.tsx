import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Search,
  CheckCircle2,
  X,
  Send,
  Loader2,
  User,
  Mail,
  Phone,
  Globe2,
  Code2,
  Copy,
  Check,
  ShieldCheck,
  ChevronRight,
  AlertCircle,
  Laptop,
  HeartHandshake,
  Zap,
  Flame,
} from 'lucide-react';
import { JobPosting, JobApplication } from '../types';
import { api } from '../api/client';

interface CareersPageProps {
  jobs: JobPosting[];
  onRefreshJobs?: () => void;
  onBackToHome: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ jobs, onRefreshJobs, onBackToHome }) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState<{ trackingCode: string; jobTitle: string } | null>(null);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Real-Time Status Checker State
  const [trackerCodeInput, setTrackerCodeInput] = useState('');
  const [trackingResult, setTrackingResult] = useState<any | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackerError, setTrackerError] = useState<string | null>(null);

  const departments = ['All', 'Mobile Engineering', 'Game Development', 'Web & Infrastructure', 'Design & UX'];

  const filteredJobs = jobs.filter((job) => {
    if (!job.is_active) return false;
    if (selectedDept === 'All') return true;
    return job.department.toLowerCase().includes(selectedDept.toLowerCase());
  });

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setApplyError(null);

    if (!applicantName.trim() || !applicantEmail.trim()) {
      setApplyError('Please provide your name and email address.');
      return;
    }

    try {
      setIsApplying(true);
      const res = await api.applyForJob(selectedJob.id, {
        applicant_name: applicantName,
        email: applicantEmail,
        phone: applicantPhone,
        portfolio_url: portfolioUrl,
        github_url: githubUrl,
        cover_letter: coverLetter,
      });

      setIsApplying(false);
      setApplySuccess({
        trackingCode: res.tracking_code,
        jobTitle: selectedJob.title,
      });

      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#06b6d4', '#10b981'],
      });
    } catch (err: any) {
      setIsApplying(false);
      setApplyError(err.message || 'Failed to submit application. Please try again.');
    }
  };

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackerError(null);
    setTrackingResult(null);

    if (!trackerCodeInput.trim()) {
      setTrackerError('Please enter a valid tracking code or application email.');
      return;
    }

    try {
      setIsTracking(true);
      const result = await api.checkApplicationStatus(trackerCodeInput);
      setTrackingResult(result);
    } catch (err: any) {
      setTrackerError(err.message || 'No application record found.');
    } finally {
      setIsTracking(false);
    }
  };

  const copyTrackingCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const getStatusStepIndex = (status: string) => {
    switch (status) {
      case 'submitted':
        return 0;
      case 'under_review':
        return 1;
      case 'shortlisted':
        return 2;
      case 'interview_scheduled':
        return 3;
      case 'offer_extended':
        return 4;
      case 'archived':
        return -1;
      default:
        return 0;
    }
  };

  const statusSteps = [
    { label: 'Application Submitted', desc: 'Received & logged in database' },
    { label: 'Under Review', desc: 'Lead architect evaluating profile' },
    { label: 'Shortlisted', desc: 'Advancing to technical discussion' },
    { label: 'Interview Scheduled', desc: 'Live architectural interview' },
    { label: 'Decision & Offer', desc: 'Formal offer package extended' },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Top Breadcrumb Back Link */}
      <div className="mb-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all border border-black/[0.06] dark:border-white/10 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home & Product Showcase</span>
        </button>
      </div>

      {/* Careers Dedicated Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Careers at byPatel • Join the Fellowship</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight">
          Architect <span className="bypatel-logo-gradient">Insanely Great</span> Software.
        </h1>

        <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          We are a tight-knit collective of obsessive software engineers, 3D artists, and product designers. We build digital products that top the App Store and define modern user experiences.
        </p>
      </div>

      {/* Studio Culture & Perks Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <div className="p-5 rounded-2xl glass-panel border border-black/[0.06] dark:border-white/10 space-y-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit">
            <Laptop className="w-4 h-4" />
          </div>
          <h3 className="font-heading text-sm font-bold text-zinc-950 dark:text-white">Pro Apple Workstation</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Latest Apple M3 Max MacBook Pro + Studio Display or customized home setup stipend.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-black/[0.06] dark:border-white/10 space-y-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <h3 className="font-heading text-sm font-bold text-zinc-950 dark:text-white">100% Health & Dental</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Comprehensive medical, dental, and vision coverage for you and your dependents.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-black/[0.06] dark:border-white/10 space-y-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 w-fit">
            <Globe2 className="w-4 h-4" />
          </div>
          <h3 className="font-heading text-sm font-bold text-zinc-950 dark:text-white">Remote-First Autonomy</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Work from anywhere in the world. We value exceptional shipped results over arbitrary hours.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-black/[0.06] dark:border-white/10 space-y-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 w-fit">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="font-heading text-sm font-bold text-zinc-950 dark:text-white">Equity & Profit Share</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Meaningful ownership in the studio releases and apps we engineer together.
          </p>
        </div>
      </div>

      {/* Real-Time Candidate Status Tracker Card */}
      <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl glass-panel border border-black/[0.08] dark:border-white/10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-zinc-950 dark:text-white">
                Live Candidate Application Tracker
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Already submitted your candidacy? Check your live review milestone using your tracking code.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleCheckStatus} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={trackerCodeInput}
            onChange={(e) => setTrackerCodeInput(e.target.value)}
            placeholder="Enter Tracking Code (e.g. BP-APP-23973) or your Email"
            className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/15 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-xs sm:text-sm"
          />
          <button
            type="submit"
            disabled={isTracking}
            className="px-6 py-3 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            {isTracking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <span>Check Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {trackerError && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-300 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{trackerError}</span>
          </div>
        )}

        {/* Status Tracker Result Timeline */}
        {trackingResult && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-black/[0.06] dark:border-white/10 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/5">
              <div>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider">Candidate</span>
                <h4 className="font-heading text-base font-extrabold text-zinc-950 dark:text-white">{trackingResult.applicant_name}</h4>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{trackingResult.job_title}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                  {trackingResult.tracking_code}
                </span>
              </div>
            </div>

            {/* Stepper Progression */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Application Review Milestones
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {statusSteps.map((step, idx) => {
                  const currentIdx = getStatusStepIndex(trackingResult.status);
                  const isCompleted = currentIdx >= idx && currentIdx !== -1;
                  const isCurrent = currentIdx === idx;

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-600 dark:border-indigo-400 shadow-sm'
                          : isCompleted
                          ? 'bg-emerald-50/60 dark:bg-emerald-500/10 border-emerald-500/30 text-zinc-900 dark:text-white'
                          : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.06] dark:border-white/5 text-zinc-400 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </div>
                        )}
                        <span className="text-xs font-bold leading-tight">{step.label}</span>
                      </div>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block leading-tight">
                        {step.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Department Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-1.5 p-1.5 bg-black/[0.04] dark:bg-zinc-900 border border-black/[0.06] dark:border-white/10 rounded-2xl backdrop-blur-xl overflow-x-auto">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedDept === dept
                  ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/10'
              }`}
            >
              <span>{dept}</span>
            </button>
          ))}
        </div>

        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Showing <strong>{filteredJobs.length}</strong> active open positions
        </span>
      </div>

      {/* Job Postings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl glass-panel border border-black/[0.08] dark:border-white/10 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg dark:shadow-none group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                  {job.department}
                </span>
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {job.type}
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-zinc-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                {job.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{job.location}</span>
                </span>
                {job.salary_range && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{job.salary_range}</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-3 line-clamp-2 leading-relaxed">
                {job.description}
              </p>
            </div>

            <div className="pt-4 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {job.experience_level}
              </span>

              <button
                onClick={() => {
                  setSelectedJob(job);
                  setApplySuccess(null);
                  setApplyError(null);
                }}
                className="px-4 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <span>View & Apply</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* JOB DETAIL & APPLY MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#121217] border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col text-zinc-900 dark:text-zinc-100"
            >
              {/* Modal Header */}
              <div className="p-6 bg-zinc-50 dark:bg-zinc-950/80 border-b border-black/[0.06] dark:border-white/10 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                      {selectedJob.department}
                    </span>
                    <span className="text-xs font-bold text-zinc-500">{selectedJob.type}</span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white mt-1">
                    {selectedJob.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    <span>{selectedJob.location}</span>
                    {selectedJob.salary_range && <span>• {selectedJob.salary_range}</span>}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-600 dark:text-zinc-300 transition-colors border border-black/[0.06] dark:border-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
                {applySuccess ? (
                  /* Success Screen with Tracking Code */
                  <div className="py-8 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-heading text-2xl font-extrabold text-zinc-950 dark:text-white">
                        Application Submitted!
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
                        Your application for <strong>{applySuccess.jobTitle}</strong> has been directly logged into byPatel engineering database.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 max-w-sm mx-auto space-y-2 text-center">
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider">
                        Your Real-Time Tracking Code
                      </span>
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-mono text-xl font-black text-indigo-700 dark:text-indigo-300">
                          {applySuccess.trackingCode}
                        </span>
                        <button
                          onClick={() => copyTrackingCode(applySuccess.trackingCode)}
                          className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 transition-colors"
                          title="Copy tracking code"
                        >
                          {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Use this code anytime on the Careers page to see your live status.
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedJob(null)}
                      className="px-6 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Role Overview */}
                    <div className="space-y-2">
                      <h4 className="font-heading text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                        Role Overview & Mission
                      </h4>
                      <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                        {selectedJob.description}
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-2">
                      <h4 className="font-heading text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                        Key Responsibilities
                      </h4>
                      <div className="space-y-2">
                        {selectedJob.responsibilities.map((resp, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-2">
                      <h4 className="font-heading text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                        Candidate Requirements
                      </h4>
                      <div className="space-y-2">
                        {selectedJob.requirements.map((req, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Application Form */}
                    <form onSubmit={handleApplySubmit} className="pt-6 border-t border-black/[0.06] dark:border-white/10 space-y-4">
                      <h4 className="font-heading text-base font-bold text-zinc-950 dark:text-white">
                        Submit Your Candidacy
                      </h4>

                      {applyError && (
                        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-300 text-xs font-medium">
                          {applyError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            placeholder="e.g. Jordan Lee"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:border-indigo-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={applicantEmail}
                            onChange={(e) => setApplicantEmail(e.target.value)}
                            placeholder="jordan@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:border-indigo-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase">Portfolio / Website Link</label>
                          <input
                            type="text"
                            value={portfolioUrl}
                            onChange={(e) => setPortfolioUrl(e.target.value)}
                            placeholder="https://yourportfolio.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:border-indigo-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase">GitHub / App Store Link</label>
                          <input
                            type="text"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            placeholder="https://github.com/username"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:border-indigo-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase">Brief Note / What makes you proud?</label>
                          <textarea
                            rows={3}
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Share an app, game, or complex architectural problem you solved..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/15 text-xs sm:text-sm text-zinc-950 dark:text-white focus:border-indigo-500 focus:outline-none leading-relaxed"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isApplying}
                        className="w-full py-3 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isApplying ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application & Generate Tracking Code</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
