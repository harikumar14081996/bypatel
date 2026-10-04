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

  const categories = ['All', 'Mobile App', 'Game', 'Web Platform'];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'All') return true;
    return product.category === selectedCategory;
  });

  return (
    <section id="releases" className="py-20 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>App Store & Google Play Releases</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Recently Released by <span className="bypatel-logo-gradient">byPatel</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base mt-2 max-w-2xl">
            Explore our curated mobile applications, immersive games, and spatial platforms crafted with pure precision.
          </p>
        </div>

        {/* Category Filter Tabs */}
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
      </div>

      {/* Product Cards Grid */}
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
              {/* Product Mockup Header Image */}
              <div
                className="relative h-60 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.mockup_url}
                  alt={product.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/20" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
                    {product.category === 'Mobile App' && <Smartphone className="w-3 h-3 text-cyan-400" />}
                    {product.category === 'Game' && <Gamepad2 className="w-3 h-3 text-fuchsia-400" />}
                    {product.category === 'Web Platform' && <Globe2 className="w-3 h-3 text-indigo-400" />}
                    <span>{product.category}</span>
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <div className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center gap-1 border border-white/20">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Downloads & Release Pill */}
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

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div
                  className="cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
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

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.tech_stack.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.08] text-zinc-800 dark:text-zinc-200 border border-black/[0.06] dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {product.tech_stack.length > 3 && (
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 self-center font-medium">
                      +{product.tech_stack.length - 3} more
                    </span>
                  )}
                </div>

                {/* Store Links & Action Footer */}
                <div className="pt-4 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {product.app_store_url && (
                      <a
                        href={product.app_store_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] text-zinc-900 dark:text-white border border-black/[0.08] dark:border-white/15 flex items-center gap-1.5 transition-colors"
                        title="Download on Apple App Store"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.76 1.04-1.82.93-2.87-.9.04-2 .6-2.65 1.36-.57.65-1.07 1.73-.93 2.76 1.01.08 2.03-.49 2.65-1.25z" />
                        </svg>
                        <span>App Store</span>
                      </a>
                    )}

                    {product.play_store_url && (
                      <a
                        href={product.play_store_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] text-zinc-900 dark:text-white border border-black/[0.08] dark:border-white/15 flex items-center gap-1.5 transition-colors"
                        title="Get it on Google Play"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 512 512">
                          <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                        </svg>
                        <span>Google Play</span>
                      </a>
                    )}

                    {product.web_url && !product.app_store_url && !product.play_store_url && (
                      <a
                        href={product.web_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.15] text-zinc-900 dark:text-white border border-black/[0.08] dark:border-white/15 flex items-center gap-1.5 transition-colors"
                      >
                        <Globe2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>Launch</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="px-3.5 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-300 hover:text-white bg-indigo-50 dark:bg-indigo-500/20 hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-xl border border-indigo-200 dark:border-indigo-500/40 transition-all cursor-pointer"
                  >
                    Details
                  </button>
                </div>

                {/* Admin Live Visibility Switch */}
                {isAdmin && onToggleVisibility && (
                  <div className="mt-2 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-xl">
                    <span className="text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                      {product.is_visible ? (
                        <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      )}
                      <span>Status: <strong>{product.is_visible ? 'Visible' : 'Hidden'}</strong></span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleVisibility(product.id, !product.is_visible);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        product.is_visible
                          ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30'
                          : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                      }`}
                    >
                      {product.is_visible ? 'Hide' : 'Show'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
