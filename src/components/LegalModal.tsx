import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Loader2, Calendar } from 'lucide-react';
import { api } from '../api/client';
import { LegalPage } from '../types';

interface LegalModalProps {
  slug: string | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ slug, onClose }) => {
  const [page, setPage] = useState<LegalPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    api.getLegalPage(slug)
      .then((data) => {
        setPage(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load legal document');
        setLoading(false);
      });
  }, [slug]);

  if (!slug) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xl"
        />

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-3xl bg-white dark:bg-[#111115] border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col text-zinc-900 dark:text-zinc-100"
        >
          {/* Header */}
          <div className="p-6 bg-zinc-50 dark:bg-zinc-950/80 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-zinc-950 dark:text-white">
                  {page?.title || 'Legal Document'}
                </h2>
                {page?.last_updated && (
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    <Calendar className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                    <span>Last Revised: {page.last_updated}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-600 dark:text-zinc-300 transition-colors border border-black/[0.06] dark:border-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-4 flex-1 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
            {loading && (
              <div className="py-20 flex flex-col items-center justify-center gap-3 text-zinc-500">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                <span>Loading legal specifications from byPatel database...</span>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-300 text-xs">
                {error}
              </div>
            )}

            {page && !loading && (
              <div className="space-y-4">
                {page.content_markdown.split('\n\n').map((para, i) => {
                  if (para.startsWith('# ')) {
                    return (
                      <h1 key={i} className="text-xl font-extrabold text-zinc-950 dark:text-white font-heading mt-6 mb-2">
                        {para.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (para.startsWith('### ')) {
                    return (
                      <h3 key={i} className="text-base font-bold text-indigo-600 dark:text-indigo-300 font-heading mt-5 mb-1">
                        {para.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (para.startsWith('- ')) {
                    const items = para.split('\n- ');
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1.5 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
                        {items.map((item, j) => (
                          <li key={j}>{item.replace(/^- /, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={i} className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {para}
                    </p>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/90 border-t border-black/[0.06] dark:border-white/[0.08] flex justify-between items-center text-xs text-zinc-500">
            <span>© {new Date().getFullYear()} byPatel</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-xs transition-colors cursor-pointer"
            >
              Done Reading
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
