import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Zap, Code, Award, Compass, MapPin, Mail } from 'lucide-react';
import { CompanyInfo } from '../types';

interface CompanyAboutProps {
  company: CompanyInfo | null;
}

export const CompanyAbout: React.FC<CompanyAboutProps> = ({ company }) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative & Mission */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The byPatel Engineering Philosophy</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight">
            Crafting with <span className="bypatel-logo-gradient">Obsessive Care & Simplicity</span>
          </h2>

          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            {company?.about_narrative ||
              'Founded on the obsession of seamless design, raw engineering precision, and fluid human-computer interaction, byPatel creates digital products that push boundaries.'}
          </p>

          <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Studio Mission</span>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
              "{company?.about_mission ||
                'To bridge the gap between visionary product design and immaculate software execution, delivering experiences that leave an unforgettable mark.'}"
            </p>
          </div>

          {/* Quick Contact Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.06] text-indigo-600 dark:text-indigo-400 border border-black/[0.06] dark:border-white/10">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-bold">Direct Inquiries</div>
                <a href={`mailto:${company?.contact_email || 'info@bypatel.com'}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-zinc-900 dark:text-zinc-100">
                  {company?.contact_email || 'info@bypatel.com'}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.06] text-purple-600 dark:text-purple-400 border border-black/[0.06] dark:border-white/10">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-bold">Location</div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{company?.address || 'San Francisco, CA & Global'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Principles Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-panel p-6 rounded-2xl border border-black/[0.08] dark:border-white/10 space-y-2.5 shadow-sm dark:shadow-none">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-base text-zinc-950 dark:text-white">120 FPS Native</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Zero stutter. Dedicated rendering pipelines and fluid gestural feedback on every screen.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-black/[0.08] dark:border-white/10 space-y-2.5 shadow-sm dark:shadow-none">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Code className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-base text-zinc-950 dark:text-white">Modern Tech</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              SwiftUI, Jetpack Compose, Rust, WebGPU, React 19, and scalable PostgreSQL architectures.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-black/[0.08] dark:border-white/10 space-y-2.5 shadow-sm dark:shadow-none">
            <div className="w-9 h-9 rounded-xl bg-fuchsia-500/10 dark:bg-fuchsia-500/20 border border-fuchsia-500/20 dark:border-fuchsia-500/30 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-base text-zinc-950 dark:text-white">Security First</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              End-to-end encrypted storage, zero-leak telemetry, and rigorous sandboxing.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-black/[0.08] dark:border-white/10 space-y-2.5 shadow-sm dark:shadow-none">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-base text-zinc-950 dark:text-white">Pure Craftsmanship</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              "Simplicity is the ultimate sophistication." Every detail is intentional and refined.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
