import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Database, Clock, Trash2, Filter, AlertCircle, RefreshCw, BarChart3, UserCheck, ShieldCheck } from 'lucide-react';
import { Lead } from '../types';

interface LeadsPortalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onUpdateLeadStatus: (id: string, status: Lead['status']) => void;
  onDeleteLead: (id: string) => void;
  onResetLeads: () => void;
}

export const LeadsPortal: React.FC<LeadsPortalProps> = ({
  isOpen,
  onClose,
  leads,
  onUpdateLeadStatus,
  onDeleteLead,
  onResetLeads,
}) => {
  const [filter, setFilter] = useState<Lead['status'] | 'all'>('all');

  const filteredLeads = filter === 'all'
    ? leads
    : leads.filter(l => l.status === filter);

  // Computing stats
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
  const contactedLeads = leads.filter(l => l.status === 'contacted').length;

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'qualified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'contacted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'archived':
        return 'bg-brand-slate-100 text-brand-slate-600 border-brand-slate-200';
      case 'new':
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-0 sm:p-6 bg-brand-slate-950/70 backdrop-blur-sm" id="leads-portal-modal">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="w-full max-w-5xl h-full sm:h-[calc(100vh-3rem)] bg-white rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative border border-brand-slate-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-brand-slate-50 hover:bg-brand-slate-100 text-brand-slate-600 transition-colors border border-brand-slate-200/50 cursor-pointer"
          aria-label="Close portal"
          id="leads-portal-close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Portal Header */}
        <div className="p-8 bg-brand-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-slate-800">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-brand-accent animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest font-bold text-blue-400 uppercase">INTERACTIVE CUSTOMER SYSTEM</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Nexora CRM Portal & Leads Monitor
            </h2>
            <p className="font-sans text-xs text-brand-slate-400">
              A high-fidelity client-side database tracker demonstrating real-time data flow, reactive states, and administrative control filters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={onResetLeads}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-mono font-medium hover:bg-white/10 transition-colors cursor-pointer"
              title="Reset Database to original seeding data"
              id="db-reset-btn"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
              <span>RESET DEMO DATABASE</span>
            </button>
          </div>
        </div>

        {/* Lead Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-brand-slate-200 bg-brand-slate-50 text-left" id="crm-stats-row">
          <div className="p-5 border-r border-b md:border-b-0 border-brand-slate-200">
            <span className="block font-mono text-[9px] text-brand-slate-400 uppercase tracking-wider font-bold mb-1.5">TOTAL ACQUISITIONS</span>
            <span className="font-display text-3xl font-extrabold text-brand-slate-900 tracking-tight">{totalLeads}</span>
          </div>
          <div className="p-5 border-r border-b md:border-b-0 border-brand-slate-200">
            <span className="block font-mono text-[9px] text-brand-slate-400 uppercase tracking-wider font-bold mb-1.5">NEW INTAKES</span>
            <span className="font-display text-3xl font-extrabold text-amber-600 tracking-tight">{newLeads}</span>
          </div>
          <div className="p-5 border-r border-brand-slate-200">
            <span className="block font-mono text-[9px] text-brand-slate-400 uppercase tracking-wider font-bold mb-1.5">QUALIFIED CLIENTS</span>
            <span className="font-display text-3xl font-extrabold text-emerald-600 tracking-tight">{qualifiedLeads}</span>
          </div>
          <div className="p-5">
            <span className="block font-mono text-[9px] text-brand-slate-400 uppercase tracking-wider font-bold mb-1.5">CONTACTED STAKEHOLDERS</span>
            <span className="font-display text-3xl font-extrabold text-blue-600 tracking-tight">{contactedLeads}</span>
          </div>
        </div>

        {/* Database Filters & Table Controls */}
        <div className="p-6 border-b border-brand-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4" id="crm-filter-row">
          {/* Status filtering */}
          <div className="flex items-center gap-2 flex-wrap" id="crm-status-filters">
            <span className="font-mono text-[10px] tracking-wider text-brand-slate-400 uppercase font-bold mr-2">Filter State:</span>
            {['all', 'new', 'contacted', 'qualified', 'archived'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-colors cursor-pointer ${
                  filter === s
                    ? 'bg-brand-slate-900 text-white border-brand-slate-900'
                    : 'bg-brand-slate-50 text-brand-slate-600 border-brand-slate-200 hover:bg-brand-slate-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-brand-slate-500">
            <ShieldCheck className="w-4 h-4 text-brand-success" />
            <span>SANDBOX LIVE ENVIRONMENT (CHANGES SAVED LOCALLY)</span>
          </div>
        </div>

        {/* Leads Table Container */}
        <div className="flex-grow overflow-y-auto min-h-[300px]" id="crm-table-container">
          {filteredLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-slate-50/50 border-b border-brand-slate-200 text-brand-slate-400 text-[10px] font-mono tracking-wider uppercase font-bold">
                    <th className="py-4 px-6">Client Info</th>
                    <th className="py-4 px-6">Sector / Industry</th>
                    <th className="py-4 px-6">Est. Budget</th>
                    <th className="py-4 px-6">Inquiry Message</th>
                    <th className="py-4 px-6">Acquisition Date</th>
                    <th className="py-4 px-6">Lead State</th>
                    <th className="py-4 px-6 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-slate-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-brand-slate-50/40 transition-colors text-xs font-sans">
                      {/* Name / Email / Company */}
                      <td className="py-4 px-6">
                        <span className="block font-bold text-brand-slate-900 text-sm">{lead.name}</span>
                        <span className="block text-brand-slate-500 font-mono text-[10px] mt-0.5">{lead.email}</span>
                        {lead.company && (
                          <span className="inline-block mt-1 bg-brand-slate-100 px-1.5 py-0.5 rounded-sm font-mono text-[9px] text-brand-slate-600 border border-brand-slate-200/50 font-bold uppercase">
                            {lead.company}
                          </span>
                        )}
                      </td>

                      {/* Sector */}
                      <td className="py-4 px-6 font-semibold text-brand-slate-700">
                        {lead.industry}
                      </td>

                      {/* Budget */}
                      <td className="py-4 px-6 font-mono font-bold text-brand-slate-800">
                        {lead.budget.split(' ')[0]}
                      </td>

                      {/* Message excerpt */}
                      <td className="py-4 px-6 max-w-xs">
                        <p className="text-brand-slate-500 line-clamp-2 leading-relaxed" title={lead.message}>
                          {lead.message}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 font-mono text-[10px] text-brand-slate-400">
                        {lead.timestamp}
                      </td>

                      {/* Status select dropdown */}
                      <td className="py-4 px-6">
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                          className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase cursor-pointer focus:outline-hidden ${getStatusBadge(lead.status)}`}
                        >
                          <option value="new">NEW</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="qualified">QUALIFIED</option>
                          <option value="archived">ARCHIVED</option>
                        </select>
                      </td>

                      {/* Delete actions */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => onDeleteLead(lead.id)}
                          className="p-2 rounded-lg border border-brand-slate-200 hover:border-red-200 hover:bg-red-50 text-brand-slate-500 hover:text-red-600 transition-all cursor-pointer"
                          title="Delete Lead Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center px-6">
              <AlertCircle className="w-10 h-10 text-brand-slate-300 mb-4 animate-pulse" />
              <span className="block font-display text-sm font-bold text-brand-slate-800">No matching inquiries found</span>
              <span className="block font-sans text-xs text-brand-slate-500 max-w-xs mt-1">
                Try selecting a different filter above or submit a brand new project inquiry on the website contact form!
              </span>
            </div>
          )}
        </div>

        {/* Portal Footer */}
        <div className="p-5 border-t border-brand-slate-200 bg-brand-slate-50 flex items-center justify-between text-[11px] font-mono text-brand-slate-400">
          <span>SECURED BACKEND ENGINE LINK • DATA IS PRESERVED IN BROWSER STORAGE</span>
          <span>NEXORA CRM ENGINE V1.4.0</span>
        </div>
      </motion.div>
    </div>
  );
};
