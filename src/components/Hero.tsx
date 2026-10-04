import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { CompanyInfo } from '../types';

interface HeroProps {
  company: CompanyInfo | null;
}

export const Hero: React.FC<HeroProps> = ({ company }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Ambient Glow Blobs adapted for Light and Dark modes */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-cyan-500/10 dark:from-indigo-600/20 dark:via-purple-600/15 dark:to-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Minimal Ethos Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-md mb-8 hover:border-indigo-500/30 transition-colors"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-indigo-400"></span>
          </span>
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            For the ones who think different & demand perfection
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.08] mb-6 max-w-4xl mx-auto"
        >
          {company?.hero_title ? (
            <>
              We architect <span className="bypatel-logo-gradient">insanely great apps</span>, immersive games & scalable platforms.
            </>
          ) : (
            <>
              Insanely Great <span className="bypatel-logo-gradient">Mobile & Game</span> Engineering.
            </>
          )}
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-10 font-normal leading-relaxed"
        >
          {company?.hero_subtitle ||
            'Creating fluid mobile experiences, state-of-the-art games, and enterprise digital tools for visionaries worldwide.'}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16"
        >
          <a
            href="#releases"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-zinc-950 dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-2xl shadow-md flex items-center justify-center gap-2 group transition-all"
          >
            <span>Explore Releases</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#hire"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.1] rounded-2xl backdrop-blur-md flex items-center justify-center gap-2 transition-all"
          >
            <span>Hire Us / Build with Me</span>
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </a>
        </motion.div>

        {/* Ideology Banner Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-2xl mx-auto mb-12 p-3.5 px-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.06] text-xs text-zinc-600 dark:text-zinc-400 text-center"
        >
          <span className="font-semibold text-zinc-900 dark:text-zinc-200">The Ideology:</span> "The people who are crazy enough to think they can change the world are the ones who do."
        </motion.div>

        {/* Dynamic Metric Stats Bar */}
        {company?.stats && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-panel rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-lg shadow-black/[0.02] dark:shadow-black/40"
          >
            {company.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-2 text-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-zinc-950 dark:text-white tracking-tight">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-[11px] text-zinc-500 mt-0.5 hidden sm:block">
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
