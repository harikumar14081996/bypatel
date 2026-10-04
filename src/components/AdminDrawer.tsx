import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Database,
  Users,
  Layers,
  CheckCircle2,
  RefreshCw,
  Clock,
  Mail,
  DollarSign,
  Briefcase,
  Smartphone,
  Gamepad2,
  Globe2,
} from 'lucide-react';
import { Product, ClientLead } from '../types';
import { api } from '../api/client';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onToggleVisibility: (id: string, is_visible: boolean) => Promise<void>;
  onRefreshProducts: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onToggleVisibility,
  onRefreshProducts,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'leads'>('products');
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoadingLeads(true);
      const data = await api.getLeads();
      setLeads(data);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Window */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative w-full max-w-xl bg-[#111116] border-l border-white/10 shadow-2xl h-full flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-6 bg-zinc-950/80 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  <span>Live CMS & Admin Hub</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active DB
                  </span>
                </h2>
                <p className="text-xs text-zinc-400">Manage live releases visibility & client inquiries</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/[0.08] bg-zinc-950/40 p-2 gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                activeTab === 'products'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Product Visibility ({products.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('leads');
                fetchLeads();
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                activeTab === 'leads'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Client Leads ({leads.length})</span>
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-2">
                  <span>Toggle product availability in real-time without redeploying:</span>
                  <button
                    onClick={onRefreshProducts}
                    className="p-1 text-indigo-400 hover:text-indigo-300"
                    title="Refresh data"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.icon_url}
                        alt={product.title}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                          <span>{product.title}</span>
                          <span className="text-[10px] text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-800">
                            {product.category}
                          </span>
                        </h4>
                        <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{product.subtitle}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleVisibility(product.id, !product.is_visible)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        product.is_visible
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white'
                      }`}
                    >
                      {product.is_visible ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'leads' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-2">
                  <span>Inbound client requests & build proposals:</span>
                  <button
                    onClick={fetchLeads}
                    className="p-1 text-indigo-400 hover:text-indigo-300"
                    title="Refresh leads"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {loadingLeads ? (
                  <div className="py-12 text-center text-zinc-400 text-xs">
                    Loading inbound leads from database...
                  </div>
                ) : leads.length === 0 ? (
                  <div className="py-12 text-center text-zinc-500 text-xs">
                    No client leads submitted yet. Test out the "Hire Us" form!
                  </div>
                ) : (
                  leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-heading text-sm font-bold text-white">
                            {lead.full_name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                            <Mail className="w-3 h-3 text-indigo-400" />
                            <a href={`mailto:${lead.email}`} className="hover:text-indigo-300">
                              {lead.email}
                            </a>
                            {lead.company && (
                              <>
                                <span>•</span>
                                <span>{lead.company}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {lead.project_type}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300 bg-black/40 p-2.5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Budget: <strong>{lead.budget_range}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-purple-400" />
                          <span>Timeline: <strong>{lead.timeline || 'Flexible'}</strong></span>
                        </div>
                      </div>

                      <div className="text-xs text-zinc-400 bg-white/[0.02] p-3 rounded-xl border border-white/5 leading-relaxed">
                        <strong className="text-zinc-300 block mb-1">Project Scope:</strong>
                        {lead.project_scope}
                      </div>

                      <div className="text-[10px] text-zinc-500 text-right">
                        Submitted on: {new Date(lead.created_at || Date.now()).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-4 bg-zinc-950/90 border-t border-white/[0.08] text-xs text-zinc-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>Engine: <strong>byPatel Dynamic ORM</strong></span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-zinc-200 font-semibold"
            >
              Close Hub
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
