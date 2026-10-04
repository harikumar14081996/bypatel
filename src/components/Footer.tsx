import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ShieldCheck, FileText, Sparkles, Sun, Moon, Mail } from 'lucide-react';
import { CompanyInfo } from '../types';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  company: CompanyInfo | null;
  onNavigate?: (page: 'home' | 'careers', sectionId?: string) => void;
  onOpenLegal: (slug: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  company,
  onNavigate,
  onOpenLegal,
  onOpenAdmin,
}) => {
  const { theme, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: 'home' | 'careers', sectionId?: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else {
      if (page === 'careers') window.location.hash = 'careers';
      else if (sectionId) window.location.hash = sectionId;
      else window.location.hash = '';
    }
  };

  const contactEmail = company?.contact_email || 'info@bypatel.com';

  return (
    <footer className="border-t border-black/[0.06] dark:border-white/10 bg-zinc-50 dark:bg-[#070709] relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden text-zinc-700 dark:text-zinc-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-black/[0.06] dark:border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col cursor-pointer" onClick={() => handleNav('home')}>
              <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className="text-zinc-400 dark:text-zinc-500 font-light">by</span>
                <span className="bypatel-logo-gradient bg-clip-text font-black">Patel</span>
              </span>
              <span className="text-xs font-semibold tracking-tight text-zinc-500 dark:text-zinc-400">
                Insanely great apps & games
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-sm leading-relaxed">
              {company?.tagline || 'Engineering Digital Masterpieces & High-Performance Software.'}
            </p>

            <div className="pt-1">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{contactEmail}</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-1">
              {/* GitHub */}
              <a
                href={company?.socials?.github || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-black/[0.06] dark:border-white/10 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href={company?.socials?.twitter || 'https://twitter.com'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-black/[0.06] dark:border-white/10 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={company?.socials?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-black/[0.06] dark:border-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={company?.socials?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-black/[0.06] dark:border-white/10 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                <button
                  onClick={(e) => handleNav('home', 'releases', e)}
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Product Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('home', 'services', e)}
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Agency Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('home', 'about', e)}
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Design Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('careers', undefined, e)}
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer text-left font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  Careers & Open Roles
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('home', 'hire', e)}
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hire Us / Build With Me
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Theme Controls */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-heading text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Governance & Policies
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <button
                onClick={() => onOpenLegal('privacy-policy')}
                className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Privacy Policy</span>
              </button>
              <button
                onClick={() => onOpenLegal('terms-of-service')}
                className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Terms of Service</span>
              </button>
            </div>

            <div className="pt-4">
              <span className="text-[11px] text-zinc-500 block mb-2">Display Theme</span>
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition-colors cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dark Appearance Active</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Light Appearance Active</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} {company?.name || 'byPatel'}. All rights reserved. Crafted with obsession.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer text-[11px]"
            >
              CMS Control
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
