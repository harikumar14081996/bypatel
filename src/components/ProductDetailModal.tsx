import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Download,
  Calendar,
  Layers,
  CheckCircle2,
  ExternalLink,
  Shield,
  ChevronLeft,
  ChevronRight,
  Share2,
  Cpu,
  Lock,
  Zap,
  Smartphone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setActiveScreenshotIdx(0);
  }, [product]);

  if (!product) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window: Fixed Structural Framework */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-white dark:bg-[#111115] border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-zinc-900 dark:text-zinc-100"
        >
          {/* Top Bar */}
          <div className="p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-950/80 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={product.icon_url}
                alt={product.title}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md border border-black/10 dark:border-white/10"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                    {product.category}
                  </span>
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">byPatel Release</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white mt-1">
                  {product.title}
                </h2>
                <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-medium">{product.subtitle}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-600 dark:text-zinc-300 transition-colors border border-black/[0.06] dark:border-white/10 cursor-pointer"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors border border-black/[0.06] dark:border-white/10 cursor-pointer"
                title="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06]">
              <div className="flex flex-col items-center justify-center p-2 text-center border-r border-black/[0.06] dark:border-white/5">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-lg">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Verified Reviews</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 text-center border-r border-black/[0.06] dark:border-white/5">
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                  <Download className="w-4 h-4" />
                  <span>{product.total_downloads}</span>
                </div>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Total Installs</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 text-center border-r border-black/[0.06] dark:border-white/5">
                <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                  <Calendar className="w-4 h-4" />
                  <span>{product.release_date}</span>
                </div>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Release Phase</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 text-center">
                <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-bold text-lg">
                  <Shield className="w-4 h-4" />
                  <span>Verified</span>
                </div>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Quality Assurance</span>
              </div>
            </div>

            {/* Screenshots & Media Showcase - Native App Store Ribbon */}
            {product.screenshots && product.screenshots.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>App Store Previews & Live Screenshots</span>
                  </h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {product.screenshots.length} Retina Previews
                  </span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x scroll-smooth rounded-2xl">
                  {product.screenshots.map((screenshotUrl, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 snap-center rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 shadow-xl bg-zinc-900 w-[220px] sm:w-[260px] aspect-[9/16] relative cursor-pointer group"
                      onClick={() => setActiveScreenshotIdx(i)}
                    >
                      <img
                        src={screenshotUrl}
                        alt={`${product.title} screen ${i + 1}`}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* System Architecture & Engineering Breakdown */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/[0.06] dark:border-white/10">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5" />
                    <span>System Architecture & Engineering</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-zinc-950 dark:text-white">
                    Zero-Knowledge Sovereign On-Device Design
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0 self-start sm:self-auto">
                  100% Offline • No Telemetry
                </span>
              </div>

              {/* Architecture Premise */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/10 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Spendlytic is engineered on a <strong className="text-zinc-950 dark:text-white">Zero-Knowledge, Sovereign Data paradigm</strong>. Rather than streaming private financial transactions and bank credentials to third-party cloud servers, every computation—from real-time daily safe limit calculations to predictive machine learning forecasting—executes 100% locally on-device. Currently launched on iOS, with dedicated native builds for Android and macOS actively in development to extend zero-cloud privacy to all your devices.
              </div>

              {/* 4 Architectural Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pillar 1 */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Pillar 01 • Presentation</div>
                      <h4 className="text-sm font-bold text-zinc-950 dark:text-white">Multi-Platform Native Pipeline</h4>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Engineered with pure SwiftUI and Metal shader acceleration on iOS & macOS, with Kotlin Jetpack Compose for Android. Physics-based gestural tracking, fluid haptic feedback, and dynamic typographic scaling with zero dropped frames.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">SwiftUI (iOS/macOS)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">Jetpack Compose (Android)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">120Hz Gestures</span>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Pillar 02 • Machine Learning</div>
                      <h4 className="text-sm font-bold text-zinc-950 dark:text-white">On-Device Neural Intelligence</h4>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Powered by Apple CoreML on iOS/macOS and on-device neural acceleration on Android. Local time-series models run directly on silicon to compute Daily Safe Spend limits and project 6-month trajectories offline with zero cloud latency.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">CoreML & On-Device ML</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">Neural Engine</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">100% Offline Models</span>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Pillar 03 • Security</div>
                      <h4 className="text-sm font-bold text-zinc-950 dark:text-white">Zero-Cloud Persistence Vault</h4>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Encrypted on-device relational storage guarded by hardware biometrics (Face ID, Touch ID, Android BiometricPrompt). Zero external database relays, zero tracking SDKs, and zero telemetry data exfiltration across iOS, Android, and macOS.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">Local Encrypted Store</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">Secure Enclave / Keystore</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">Hardware Biometrics</span>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/10 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Pillar 04 • Hardware Hooks</div>
                      <h4 className="text-sm font-bold text-zinc-950 dark:text-white">Native OS Surface Integration</h4>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Real-time Dynamic Island updates and WidgetKit on iOS/macOS, glanceable widgets on Android, autonomous midnight Auto-Sweep routines, and on-device PDF audit export compilation.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">Dynamic Island & Widgets</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">Android Surface Hooks</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 font-medium">PDF Engine</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Matrix */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-zinc-950 dark:text-white">Core Engineering Capabilities</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Production Features</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.feature_list.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-zinc-950 dark:text-white">Technologies & Frameworks</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Multi-Platform Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tech_stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-500/20 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Fixed Footer with Direct Store Downloads */}
          <div className="p-6 bg-zinc-50 dark:bg-zinc-950/90 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
              Official release built by <strong>byPatel</strong>.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {product.app_store_url && (
                <a
                  href={product.app_store_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.76 1.04-1.82.93-2.87-.9.04-2 .6-2.65 1.36-.57.65-1.07 1.73-.93 2.76 1.01.08 2.03-.49 2.65-1.25z" />
                  </svg>
                  <span>Download on App Store</span>
                </a>
              )}

              {product.play_store_url && (
                <a
                  href={product.play_store_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 512 512">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                  </svg>
                  <span>Get on Google Play</span>
                </a>
              )}

              {product.web_url && !product.app_store_url && !product.play_store_url && (
                <a
                  href={product.web_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Platform</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
