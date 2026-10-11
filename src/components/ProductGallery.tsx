import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Download,
  Eye,
  EyeOff,
  Sparkles,
  Smartphone,
  Gamepad2,
  Globe2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Cpu,
  Zap,
  Lock,
} from 'lucide-react';
import { Product } from '../types';

interface ProductGalleryProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleVisibility?: (id: string, is_visible: boolean) => void;
  isAdmin?: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  products,
  onSelectProduct,
  onToggleVisibility,
  isAdmin = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Derive categories dynamically from available products
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const showCategoryTabs = uniqueCategories.length > 1;
  const categories = ['All', ...uniqueCategories];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'All') return true;
    return product.category === selectedCategory;
  });

  const singleProduct = products.length === 1 ? products[0] : null;

  return (
    <section id="releases" className="py-20 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Apple App Store Release</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Live Apps by <span className="bypatel-logo-gradient">byPatel</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Engineered exclusively with native Swift, zero-cloud privacy architecture, and raw design obsession.
          </p>
        </div>

        {/* Dynamic Category Filter Tabs (only displayed if multiple categories exist) */}
        {showCategoryTabs && (
          <div className="flex items-center gap-1.5 p-1.5 bg-black/[0.04] dark:bg-zinc-900 border border-black/[0.06] dark:border-white/10 rounded-2xl backdrop-blur-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/10'
                }`}
              >
                {cat === 'Mobile App' && <Smartphone className="w-3.5 h-3.5" />}
                {cat === 'Game' && <Gamepad2 className="w-3.5 h-3.5" />}
                {cat === 'Web Platform' && <Globe2 className="w-3.5 h-3.5" />}
                <span>{cat}</span>
                <span className="text-[10px] opacity-75 ml-0.5 font-bold">
                  ({cat === 'All' ? products.length : products.filter((p) => p.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FEATURED SPOTLIGHT LAYOUT FOR SPENDLYTIC */}
      {singleProduct ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl p-6 sm:p-10 border border-black/[0.08] dark:border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: App Information & Store CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-start gap-4">
                <img
                  src={singleProduct.icon_url}
                  alt={singleProduct.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-xl border border-black/10 dark:border-white/10 object-cover shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                      iOS • App Store
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{singleProduct.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                    {singleProduct.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {singleProduct.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {singleProduct.description}
              </p>

              {/* Core Feature Bullet Highlights */}
              <div className="space-y-2 pt-1">
                {singleProduct.feature_list.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-medium leading-tight">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {singleProduct.tech_stack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] text-zinc-800 dark:text-zinc-200 border border-black/[0.06] dark:border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons: App Store Badge + Details Modal */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                {singleProduct.app_store_url && (
                  <a
                    href={singleProduct.app_store_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2.5 hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.76 1.04-1.82.93-2.87-.9.04-2 .6-2.65 1.36-.57.65-1.07 1.73-.93 2.76 1.01.08 2.03-.49 2.65-1.25z" />
                    </svg>
                    <span>Download on App Store</span>
                  </a>
                )}

                <button
                  onClick={() => onSelectProduct(singleProduct)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-900 dark:text-white border border-black/[0.08] dark:border-white/10 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Architecture & Views</span>
                  <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </button>
              </div>

              {/* Admin Toggle */}
              {isAdmin && onToggleVisibility && (
                <div className="pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-xl">
                  <span className="text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                    {singleProduct.is_visible ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    )}
                    <span>Status: <strong>{singleProduct.is_visible ? 'Visible' : 'Hidden'}</strong></span>
                  </span>
                  <button
                    onClick={() => onToggleVisibility(singleProduct.id, !singleProduct.is_visible)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30"
                  >
                    {singleProduct.is_visible ? 'Hide' : 'Show'}
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Live App Store Retina Screenshot Ribbon */}
            <div className="lg:col-span-7">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
                  <span className="font-semibold uppercase tracking-wider text-[11px]">Real App Store Screenshots</span>
                  <span>Swipe to explore →</span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scroll-smooth rounded-2xl">
                  {singleProduct.screenshots.map((screenUrl, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => onSelectProduct(singleProduct)}
                      className="shrink-0 snap-center rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 shadow-2xl bg-zinc-900 w-[190px] sm:w-[220px] aspect-[9/16] relative cursor-pointer group"
                    >
                      <img
                        src={screenUrl}
                        alt={`${singleProduct.title} App Store preview ${idx + 1}`}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20">
                          Click to expand
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Architecture & Engineering Foundations */}
          <div className="mt-10 pt-8 border-t border-black/[0.06] dark:border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  <span>System Architecture & Engineering Specification</span>
                </div>
                <h4 className="font-heading text-xl font-bold text-zinc-950 dark:text-white">
                  Zero-Cloud Native Engineering Stack
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  100% On-Device
                </span>
                <button
                  onClick={() => onSelectProduct(singleProduct)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Tech Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Pillar 1 */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] space-y-2 hover:border-indigo-500/30 transition-colors">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Pillar 01 • Presentation</span>
                </div>
                <div className="font-heading text-sm font-bold text-zinc-950 dark:text-white">
                  120 FPS Motion Pipeline
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  SwiftUI 6 & Metal shaders deliver fluid gestural physics, haptic pacing, and zero dropped frames.
                </p>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono font-medium pt-1">
                  SwiftUI • Metal • ProMotion
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] space-y-2 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <Cpu className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Pillar 02 • Intelligence</span>
                </div>
                <div className="font-heading text-sm font-bold text-zinc-950 dark:text-white">
                  On-Device CoreML Engine
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Local neural time-series calculations compute Daily Safe Spend and project 6-month wealth trajectories offline.
                </p>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono font-medium pt-1">
                  Apple CoreML • Accelerate FW
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] space-y-2 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Pillar 03 • Security</span>
                </div>
                <div className="font-heading text-sm font-bold text-zinc-950 dark:text-white">
                  Zero-Cloud Persistence Vault
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Encrypted local Core Data storage gated by Face ID & Secure Enclave. Zero cloud relays, zero tracking SDKs.
                </p>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono font-medium pt-1">
                  Core Data • Secure Enclave • Face ID
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] space-y-2 hover:border-amber-500/30 transition-colors">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Pillar 04 • Hardware</span>
                </div>
                <div className="font-heading text-sm font-bold text-zinc-950 dark:text-white">
                  iOS Surface Integration
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Live Activities, Dynamic Island real-time budgets, midnight Auto-Sweep savings, and PDF audit exports.
                </p>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono font-medium pt-1">
                  Dynamic Island • ActivityKit • WidgetKit
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Fallback Multi-Product Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="group relative flex flex-col glass-panel rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all duration-300 shadow-md hover:shadow-xl dark:shadow-none"
              >
                <div
                  className="relative h-64 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.mockup_url}
                    alt={product.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/20" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
                      <Smartphone className="w-3 h-3 text-cyan-400" />
                      <span>{product.category}</span>
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <div className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center gap-1 border border-white/20">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="flex items-center gap-1.5 text-xs text-white font-medium bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                      <Download className="w-3 h-3 text-emerald-400" />
                      <span>{product.total_downloads}</span>
                    </div>
                    <span className="text-xs text-zinc-200 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                      {product.release_date}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <h3 className="font-heading text-xl font-bold text-zinc-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                      <span>{product.title}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-indigo-600 dark:text-indigo-400" />
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                      {product.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between gap-2">
                    {product.app_store_url && (
                      <a
                        href={product.app_store_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] text-zinc-900 dark:text-white border border-black/[0.08] dark:border-white/15 flex items-center gap-1.5 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.76 1.04-1.82.93-2.87-.9.04-2 .6-2.65 1.36-.57.65-1.07 1.73-.93 2.76 1.01.08 2.03-.49 2.65-1.25z" />
                        </svg>
                        <span>App Store</span>
                      </a>
                    )}
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3.5 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-300 hover:text-white bg-indigo-50 dark:bg-indigo-500/20 hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-xl border border-indigo-200 dark:border-indigo-500/40 transition-all cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};
