import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Gamepad2,
  Globe2,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectServiceForLead: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectServiceForLead,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-indigo-600 dark:text-cyan-400" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-6 h-6 text-purple-600 dark:text-fuchsia-400" />;
      case 'Globe2':
        return <Globe2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 dark:border-purple-500/30 text-purple-600 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Engineering Capabilities</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
          Architecting for <span className="bypatel-logo-gradient">Global Scale</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base mt-3">
          We partner with ambitious startups and world-class brands to design, build, and deploy mission-critical products.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="group relative glass-panel p-8 rounded-3xl border border-black/[0.08] dark:border-white/10 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl dark:shadow-none"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/10 group-hover:scale-105 transition-transform duration-300">
                  {getIcon(service.icon_name)}
                </div>
                {service.badge_text && (
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-black/[0.04] dark:bg-indigo-500/20 text-zinc-800 dark:text-indigo-300 border border-black/[0.06] dark:border-indigo-500/30">
                    {service.badge_text}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="font-heading text-2xl font-bold text-zinc-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                {service.full_description || service.short_description}
              </p>

              {/* Deliverables List */}
              <div className="mt-6 space-y-2">
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
                  Deliverables & Architecture
                </div>
                {service.deliverables.map((deliv, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies & CTA */}
            <div className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5 max-w-xs">
                {service.technologies.slice(0, 4).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 border border-black/[0.04] dark:border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href="#hire"
                onClick={() => onSelectServiceForLead(service.title)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-zinc-950 dark:hover:text-white transition-colors group/link"
              >
                <span>Request {service.category}</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
