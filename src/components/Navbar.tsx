import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { CompanyInfo } from '../types';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  company: CompanyInfo | null;
  currentPage: 'home' | 'careers';
  onNavigate: (page: 'home' | 'careers', sectionId?: string) => void;
  onOpenAdmin: () => void;
  onOpenLegal: (slug: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  company,
  currentPage,
  onNavigate,
  onOpenAdmin,
  onOpenLegal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Releases', href: '#releases', sectionId: 'releases' },
    { label: 'Capabilities', href: '#services', sectionId: 'services' },
    { label: 'Philosophy', href: '#about', sectionId: 'about' },
    { label: 'Careers', href: '#careers', page: 'careers' as const },
    { label: 'Hire Us', href: '#hire', sectionId: 'hire' },
  ];

  const handleNavLinkClick = (link: (typeof navLinks)[0], e: React.MouseEvent) => {
    e.preventDefault();
    if (link.page === 'careers') {
      onNavigate('careers');
    } else {
      onNavigate('home', link.sectionId);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] shadow-sm dark:shadow-black/50'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with Ideology Tagline Below */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="group flex flex-col focus:outline-none cursor-pointer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center">
              <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className="text-zinc-400 dark:text-zinc-500 font-light group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  by
                </span>
                <span className="bypatel-logo-gradient bg-clip-text font-black tracking-tighter">
                  Patel
                </span>
              </span>
            </div>
            <span className="text-[11px] font-semibold tracking-tight text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              Insanely great apps & games
            </span>
          </motion.a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.07] px-4 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isCareersActive = link.page === 'careers' && currentPage === 'careers';
              return (
                <button
                  key={link.label}
                  onClick={(e) => handleNavLinkClick(link, e)}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-medium transition-all rounded-full cursor-pointer ${
                    isCareersActive
                      ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Theme Toggle + Primary CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 rotate-0 transition-transform" />
              )}
            </button>

            {/* CTA Button */}
            <motion.button
              onClick={() => onNavigate('home', 'hire')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center justify-center px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-zinc-950 dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-full shadow-sm transition-all overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Start Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Toggle & Theme */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-zinc-600 dark:text-zinc-300 bg-black/[0.04] dark:bg-zinc-900 border border-black/[0.06] dark:border-zinc-800 rounded-full"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 dark:text-zinc-300 bg-black/[0.04] dark:bg-zinc-900/80 border border-black/[0.06] dark:border-zinc-800 rounded-full"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[65px] z-40 p-4 md:hidden"
          >
            <div className="p-6 rounded-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl space-y-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavLinkClick(link, e);
                    }}
                    className="text-left text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-black/[0.08] dark:border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('home', 'hire');
                  }}
                  className="w-full py-3 text-center text-xs font-bold text-white bg-zinc-950 dark:bg-white dark:text-zinc-950 rounded-xl cursor-pointer"
                >
                  Start Project with byPatel
                </button>
                <div className="flex justify-between items-center text-xs text-zinc-500 pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLegal('privacy-policy');
                    }}
                    className="hover:underline"
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLegal('terms-of-service');
                    }}
                    className="hover:underline"
                  >
                    Terms & Conditions
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
