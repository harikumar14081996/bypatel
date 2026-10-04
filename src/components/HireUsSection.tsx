import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Send,
  Sparkles,
  CheckCircle,
  Building2,
  Mail,
  User,
  DollarSign,
  Clock,
  FileText,
  Smartphone,
  Gamepad2,
  Globe2,
  Cpu,
  Loader2,
  Layers,
  Hotel,
} from 'lucide-react';
import { api } from '../api/client';

interface HireUsSectionProps {
  preselectedService?: string;
}

export const HireUsSection: React.FC<HireUsSectionProps> = ({ preselectedService }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('Mobile App');
  const [budgetRange, setBudgetRange] = useState('');
  const [timeline, setTimeline] = useState('2 - 3 Months');
  const [projectScope, setProjectScope] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      if (preselectedService.toLowerCase().includes('mobile')) setProjectType('Mobile App');
      else if (preselectedService.toLowerCase().includes('game')) setProjectType('Interactive / AI & Games');
      else if (preselectedService.toLowerCase().includes('web')) setProjectType('Website / Booking Platform');
      else if (preselectedService.toLowerCase().includes('ai') || preselectedService.toLowerCase().includes('system')) setProjectType('Business Software');
    }
  }, [preselectedService]);

  // Project categories clearly articulated for local businesses, hotels, motels, and digital ventures
  const projectTypes = [
    {
      title: 'Mobile App (iOS & Android)',
      subtitle: 'Custom apps for your customers, guests, or staff',
      examples: 'e.g. Hotel Guest App, Mobile Check-in, Loyalty & Orders',
      value: 'Mobile App',
      icon: Smartphone,
    },
    {
      title: 'Website & Online Booking',
      subtitle: 'Modern website with direct reservations & payments',
      examples: 'e.g. Motel/Hotel Website, Direct Booking Engine, Local Business',
      value: 'Website / Booking Platform',
      icon: Globe2,
    },
    {
      title: 'Management Software & Tools',
      subtitle: 'Automate daily operations, bookings & inventory',
      examples: 'e.g. Property Management, Operations, Staff Scheduling',
      value: 'Business Software',
      icon: Building2,
    },
    {
      title: 'Interactive Experiences & AI',
      subtitle: '3D property tours, games, and 24/7 AI assistants',
      examples: 'e.g. Virtual Property Tour, 3D Experience, AI Front-Desk',
      value: 'Interactive / AI & Games',
      icon: Sparkles,
    },
  ];

  const timelineOptions = [
    'Immediate (< 1 mo)',
    '2 - 3 Months',
    '3 - 6 Months',
    'Flexible',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanScope = projectScope.trim();
    const cleanCompany = company.trim();
    const cleanBudget = budgetRange.trim() || 'Flexible / To be discussed';

    if (!cleanName || !cleanEmail || !cleanScope) {
      setErrorMessage('Please fill in your name, email, and project details.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      await api.submitLead({
        full_name: cleanName,
        email: cleanEmail,
        company: cleanCompany,
        project_type: projectType,
        budget_range: cleanBudget,
        timeline,
        project_scope: cleanScope,
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#10b981'],
      });
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName('');
    setEmail('');
    setCompany('');
    setBudgetRange('');
    setProjectScope('');
  };

  return (
    <section id="hire" className="py-20 px-4 sm:px-6 lg:px-8 relative max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Client Connect & Request Hub</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
          Hire Us / <span className="bypatel-logo-gradient">Build With byPatel</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base mt-2">
          From modern hotel & motel solutions to custom mobile apps and websites, tell us your business goals and we will engineer it with precision.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="glass-panel p-6 sm:p-10 md:p-12 rounded-3xl border border-black/[0.08] dark:border-white/10 shadow-lg shadow-black/[0.03] dark:shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12 flex flex-col items-center text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading text-2xl font-extrabold text-zinc-950 dark:text-white">
                  Project Request Received!
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 max-w-md mx-auto text-xs sm:text-sm leading-relaxed">
                  Thank you for reaching out to <strong>byPatel</strong>. We will review your project requirements and respond within <strong>24 hours</strong> with a clear plan.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] text-zinc-900 dark:text-white border border-black/[0.08] dark:border-white/15 text-xs font-semibold transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              noValidate
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-7"
            >
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-300 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* 1. Project Type Selector - High Clarity for Hospitality & Local Businesses */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                  1. What are we building for your business?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {projectTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = projectType === type.value;
                    return (
                      <button
                        type="button"
                        key={type.value}
                        onClick={() => setProjectType(type.value)}
                        className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-600 dark:border-indigo-400 text-zinc-950 dark:text-white shadow-sm ring-2 ring-indigo-600/20 dark:ring-indigo-400/20'
                            : 'bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.06] dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-black/[0.04] dark:bg-white/10 text-zinc-700 dark:text-zinc-300'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-xs font-bold block text-zinc-950 dark:text-white leading-tight">{type.title}</span>
                              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight block mt-0.5">{type.subtitle}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-[10px] text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 dark:bg-indigo-500/15 px-2.5 py-1 rounded-lg border border-indigo-500/20 font-medium">
                          {type.examples}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Client Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="lead-name" className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    id="lead-name"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Patel"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/15 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="lead-email" className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/15 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="lead-company" className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Business / Hotel / Organization Name (Optional)</span>
                  </label>
                  <input
                    id="lead-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Sunrise Motel, Bayview Hotel, or Local Business"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/15 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* 3. Estimated Budget Range */}
              <div className="space-y-1.5">
                <label htmlFor="lead-budget" className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>2. Estimated Budget Range</span>
                </label>
                <input
                  id="lead-budget"
                  name="budgetRange"
                  type="text"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  placeholder="e.g. $5k - $15k, $25k - $50k, or Flexible"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/15 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-xs sm:text-sm"
                />
              </div>

              {/* 4. Target Timeline */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>3. Expected Timeline</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timelineOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setTimeline(opt)}
                      className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        timeline === opt
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.06] dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.08]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Project Scope Description */}
              <div className="space-y-1.5">
                <label htmlFor="lead-scope" className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>4. Project Scope & Needs *</span>
                </label>
                <textarea
                  id="lead-scope"
                  name="projectScope"
                  required
                  rows={4}
                  value={projectScope}
                  onChange={(e) => setProjectScope(e.target.value)}
                  placeholder="Tell us what your business needs (e.g., online booking system, guest check-in mobile app, new hotel website, inventory tool, or custom app)..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/15 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-xs sm:text-sm leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 px-6 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
