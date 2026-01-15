import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Lock, Target, Zap, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SecurityAdvisory {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'OFFENSIVE' | 'DEFENSIVE';
  endpoint?: string;
  description: string;
  strategy?: string;
  remediation?: string;
  timestamp: string;
}

interface SecurityIntelligenceProps {
  advisories: SecurityAdvisory[];
  loading?: boolean;
}

export default function SecurityIntelligence({ advisories, loading = false }: SecurityIntelligenceProps) {
  const [selectedAdvisory, setSelectedAdvisory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'OFFENSIVE' | 'DEFENSIVE'>('ALL');

  const filteredAdvisories = advisories.filter(adv => 
    activeFilter === 'ALL' || adv.category === activeFilter
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'border-red-500 text-red-500';
      case 'HIGH': return 'border-orange-500 text-orange-500';
      case 'MEDIUM': return 'border-yellow-500 text-yellow-500';
      case 'LOW': return 'border-brand-primary text-brand-primary';
      default: return 'border-slate-500 text-slate-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    return category === 'OFFENSIVE' ? Target : Shield;
  };

  if (loading) {
    return (
      <div className="glass-panel border-white/5 p-12 rounded-none">
        <div className="flex flex-col items-center justify-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-12 h-12 text-brand-primary" />
          </motion.div>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">ANALYZING_SECURITY_SURFACE...</p>
        </div>
      </div>
    );
  }

  if (advisories.length === 0) {
    return (
      <div className="glass-panel border-white/5 p-12 rounded-none text-center">
        <Lock className="w-16 h-16 text-slate-800 mx-auto mb-6" />
        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">NO_ACTIVE_ADVISORIES</p>
        <p className="text-slate-600 text-[10px] mt-2">Your security posture is currently optimal.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex gap-2">
        {['ALL', 'OFFENSIVE', 'DEFENSIVE'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as any)}
            className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all ${
              activeFilter === filter
                ? 'bg-brand-primary text-bg-dark'
                : 'bg-white/5 text-slate-500 hover:bg-white/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Advisory Grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {filteredAdvisories.map((advisory, idx) => {
          const CategoryIcon = getCategoryIcon(advisory.category);
          const isExpanded = selectedAdvisory === advisory.id;

          return (
            <motion.div
              key={advisory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel border-white/5 p-6 rounded-none group cursor-pointer hover:border-brand-primary/30 transition-all"
              onClick={() => setSelectedAdvisory(isExpanded ? null : advisory.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-white/5 border ${advisory.category === 'OFFENSIVE' ? 'border-red-500/20' : 'border-brand-primary/20'}`}>
                    <CategoryIcon className={`w-4 h-4 ${advisory.category === 'OFFENSIVE' ? 'text-red-500' : 'text-brand-primary'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[8px] font-mono px-2 py-0.5 border ${getSeverityColor(advisory.severity)}`}>
                        {advisory.severity}
                      </span>
                      <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                        {advisory.category}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-sm tracking-tight group-hover:text-brand-primary transition-colors">
                      {advisory.title}
                    </h4>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </motion.div>
              </div>

              {/* Endpoint Badge */}
              {advisory.endpoint && (
                <div className="mb-4 p-2 bg-white/5 border-l-2 border-brand-primary">
                  <div className="text-[8px] font-mono text-slate-600 uppercase mb-1">ENDPOINT</div>
                  <div className="text-[10px] font-mono text-brand-primary">{advisory.endpoint}</div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
                {advisory.description}
              </p>

              {/* Expanded Content */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 pt-4 border-t border-white/5"
                >
                  {advisory.strategy && (
                    <div className="p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-none">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-3 h-3 text-brand-primary" />
                        <div className="text-[8px] font-mono text-brand-primary uppercase tracking-widest">
                          TESTING_STRATEGY
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-300 font-light leading-relaxed whitespace-pre-wrap">
                        {advisory.strategy}
                      </p>
                    </div>
                  )}

                  {advisory.remediation && (
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-none">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-3 h-3 text-emerald-500" />
                        <div className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest">
                          REMEDIATION_PLAYBOOK
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-300 font-light leading-relaxed whitespace-pre-wrap">
                        {advisory.remediation}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[9px] text-slate-600 font-mono">
                    <AlertTriangle className="w-3 h-3" />
                    <span>DETECTED: {new Date(advisory.timestamp).toLocaleString()}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-1 bg-white/5 border border-white/5">
        {[
          { label: 'TOTAL_ADVISORIES', value: advisories.length, color: 'brand-primary' },
          { label: 'CRITICAL', value: advisories.filter(a => a.severity === 'CRITICAL').length, color: 'red-500' },
          { label: 'OFFENSIVE', value: advisories.filter(a => a.category === 'OFFENSIVE').length, color: 'orange-500' },
          { label: 'DEFENSIVE', value: advisories.filter(a => a.category === 'DEFENSIVE').length, color: 'emerald-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-bg-dark p-6 text-center">
            <div className={`text-2xl font-black text-${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
