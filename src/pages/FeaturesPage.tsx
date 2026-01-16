import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle,
  Code,
  Container,
  Cpu,
  FileCode,
  Gauge,
  GitBranch,
  Rocket,
  Shield,
  Target,
  Terminal,
  TrendingUp,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-slate-200 font-sans">
      <div className="fixed inset-0 bg-grid z-0 pointer-events-none opacity-40" />
      <Navbar />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel border-brand-primary/30 mb-6">
              <Rocket className="w-4 h-4 text-brand-primary animate-pulse" />
              <span className="text-brand-primary text-xs font-mono tracking-widest uppercase">
                FEATURE_MANIFEST_v2.0
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
              CORE<span className="text-brand-primary">_</span>CAPABILITIES
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              Production-grade features engineered for real engineering teams
            </p>
          </motion.div>

          {/* Feature Categories Overview */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-white/5 border border-white/5">
              {[
                {
                  icon: Code,
                  title: "FRONTEND_OPTIMIZATION",
                  count: "12+",
                  label: "Detections",
                  color: "cyan-400",
                },
                {
                  icon: Container,
                  title: "CI/CD_INTELLIGENCE",
                  count: "8+",
                  label: "Optimizations",
                  color: "purple-400",
                },
                {
                  icon: Shield,
                  title: "SECURITY_SCANNING",
                  count: "15+",
                  label: "Checks",
                  color: "emerald-400",
                },
                {
                  icon: BarChart3,
                  title: "PERFORMANCE_METRICS",
                  count: "20+",
                  label: "Insights",
                  color: "brand-accent",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg-dark p-8 group relative overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <item.icon className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <item.icon className={`w-8 h-8 text-${item.color} mb-6`} />
                    <div className="text-4xl font-black text-white mb-1">{item.count}</div>
                    <div className="text-[10px] text-slate-600 font-mono tracking-tighter uppercase mb-4">
                      {item.label}
                    </div>
                    <div className={`text-xs font-mono tracking-widest text-${item.color} uppercase`}>
                      {item.title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Frontend Optimization */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-12"
            >
              <div className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
                <Code className="w-3 h-3 animate-pulse" />
                MODULE_01
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                FRONTEND<span className="text-brand-primary">_</span>OPTIMIZATION
              </h2>
              <p className="text-xl text-slate-400 font-light">
                AI-powered analysis for React, Next.js, and modern web apps
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  title: "REACT_PERFORMANCE_DETECTION",
                  icon: Activity,
                  detects: [
                    "Unnecessary re-renders from improper memoization",
                    "useEffect dependency array mistakes",
                    "Prop drilling causing cascading updates",
                    "Large component trees without optimization",
                    "Inline function definitions in render",
                  ],
                  solution:
                    "AI analyzes component hierarchy and hook usage, identifies hot paths, proposes React.memo, useMemo, useCallback strategically",
                },
                {
                  title: "NEXT.JS_OPTIMIZATION_PATTERNS",
                  icon: Zap,
                  detects: [
                    "Missing dynamic imports for heavy components",
                    "Client-side fetching instead of getServerSideProps",
                    "Unoptimized images without next/image",
                    "Bundle size bloat from barrel imports",
                    "Missing ISR for static-heavy pages",
                  ],
                  solution:
                    "Detects Next.js patterns, suggests SSR/SSG migration, automatic image optimization, code splitting recommendations",
                },
                {
                  title: "MEASURABLE_IMPACT_VALIDATION",
                  icon: Target,
                  metrics: [
                    "Bundle size reduction (KB): Tracks before/after webpack stats",
                    "Render count reduction: Instruments React DevTools Profiler",
                    "Lighthouse score improvements: CI-integrated performance audits",
                    "Time to Interactive (TTI): Real User Monitoring integration",
                    "Core Web Vitals: LCP, FID, CLS tracking",
                  ],
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel border-white/5 p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-brand-primary" />
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tighter uppercase">
                      {feature.title}
                    </h3>
                  </div>

                  {feature.detects && (
                    <div className="mb-6">
                      <p className="text-xs font-mono text-red-400 mb-3 tracking-wider uppercase">
                        ⚠️ DETECTS:
                      </p>
                      <ul className="space-y-2">
                        {feature.detects.map((problem, pIdx) => (
                          <li
                            key={pIdx}
                            className="text-slate-300 text-sm flex items-start gap-3 font-light"
                          >
                            <span className="text-red-400 mt-1">•</span>
                            <span>{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {feature.solution && (
                    <div className="glass-panel border-emerald-500/30 bg-emerald-500/5 p-4">
                      <p className="text-xs font-mono text-emerald-400 mb-2 tracking-wider uppercase">
                        ✓ SOLUTION:
                      </p>
                      <p className="text-slate-300 text-sm font-light leading-relaxed">
                        {feature.solution}
                      </p>
                    </div>
                  )}

                  {feature.metrics && (
                    <div>
                      <p className="text-xs font-mono text-brand-primary mb-3 tracking-wider uppercase">
                        📊 METRICS_TRACKED:
                      </p>
                      <ul className="space-y-2">
                        {feature.metrics.map((metric, mIdx) => (
                          <li
                            key={mIdx}
                            className="text-slate-300 text-sm flex items-start gap-3 font-light"
                          >
                            <span className="text-brand-primary mt-1">→</span>
                            <span>{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* CI/CD Optimization */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-12"
            >
              <div className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
                <Container className="w-3 h-3 animate-pulse" />
                MODULE_02
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                CI/CD<span className="text-brand-primary">_</span>&amp;<span className="text-brand-primary">_</span>DEVOPS
              </h2>
              <p className="text-xl text-slate-400 font-light">
                Pipeline optimization and build failure resolution
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Gauge,
                  title: "PIPELINE_ANALYSIS",
                  capabilities: [
                    "Identifies redundant steps in GitHub Actions",
                    "Detects missing cache configurations",
                    "Finds parallel execution opportunities",
                    "Measures actual execution time per step",
                    "Compares against industry benchmarks",
                  ],
                },
                {
                  icon: Container,
                  title: "DOCKER_OPTIMIZATION",
                  capabilities: [
                    "Multi-stage build detection and improvement",
                    "Layer caching optimization",
                    "Base image recommendations (Alpine vs Slim)",
                    "Unnecessary package removal",
                    "BuildKit feature usage",
                  ],
                },
                {
                  icon: AlertTriangle,
                  title: "BUILD_FAILURE_RESOLUTION",
                  capabilities: [
                    "Parses CI logs to extract error messages",
                    "Identifies dependency version conflicts",
                    "Detects flaky tests and suggests fixes",
                    "Analyzes test coverage gaps",
                    "Proposes environment variable fixes",
                  ],
                },
                {
                  icon: TrendingUp,
                  title: "SAFETY_FIRST_IMPROVEMENTS",
                  capabilities: [
                    "Never modifies production workflows without approval",
                    "Validates changes in non-prod branches first",
                    "Rollback plan included in every PR",
                    "Monitors post-merge CI success rate",
                    "Alerts if changes cause regressions",
                  ],
                },
              ].map((capability, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel border-white/5 p-6 group hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center">
                      <capability.icon className="w-6 h-6 text-brand-primary" />
                    </div>
                    <h3 className="text-sm font-mono tracking-wider text-white uppercase">
                      {capability.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {capability.capabilities.map((item, cIdx) => (
                      <li
                        key={cIdx}
                        className="text-slate-300 text-sm flex items-start gap-2 font-light"
                      >
                        <span className="text-brand-primary">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Real-World Impact */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-12"
            >
              <div className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
                <BarChart3 className="w-3 h-3 animate-pulse" />
                CASE_STUDIES
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                REAL<span className="text-brand-primary">_</span>WORLD<span className="text-brand-primary">_</span>IMPACT
              </h2>
              <p className="text-xl text-slate-400 font-light">
                Measurable improvements from production environments
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  problem: "React app with 12-second initial load time",
                  diagnosis:
                    "Detected 450KB of unused dependencies, synchronous API calls blocking render, no code splitting",
                  fix: "Proposed dynamic imports, migrated to React.lazy, removed unused packages, implemented Suspense boundaries",
                  result:
                    "Initial load reduced to 3.2 seconds (73% improvement), Lighthouse score from 42 to 89",
                  improvement: "73%",
                },
                {
                  problem: "GitHub Actions taking 18 minutes per build",
                  diagnosis:
                    "No Docker layer caching, sequential test execution, full node_modules install every run",
                  fix: "Added cache actions for npm, parallelized test suites, implemented BuildKit with layer caching",
                  result:
                    "Build time reduced to 7 minutes (61% faster), 40% reduction in GitHub Actions minutes usage",
                  improvement: "61%",
                },
                {
                  problem: "Flaky tests failing 30% of CI runs",
                  diagnosis:
                    "Race conditions in async tests, hardcoded timeouts, shared test state pollution",
                  fix: "Introduced proper async/await patterns, increased timeouts dynamically, isolated test fixtures",
                  result:
                    'Test stability increased to 98%, team confidence restored, no more "merge anyway" culture',
                  improvement: "98%",
                },
              ].map((example, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="glass-panel border-white/5 p-8 relative overflow-hidden group"
                >
                  {/* Background Number */}
                  <div className="absolute top-4 right-8 text-8xl font-black text-white/5 group-hover:text-white/10 transition-all">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10 space-y-4">
                    <div>
                      <span className="text-xs font-mono text-red-400 tracking-wider uppercase">
                        ⚠️ PROBLEM:
                      </span>
                      <p className="text-white mt-1 font-light">{example.problem}</p>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-yellow-400 tracking-wider uppercase">
                        🔍 DIAGNOSIS:
                      </span>
                      <p className="text-slate-300 text-sm mt-1 font-light">
                        {example.diagnosis}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
                        🛠️ FIX:
                      </span>
                      <p className="text-slate-300 text-sm mt-1 font-light">{example.fix}</p>
                    </div>
                    <div className="glass-panel border-emerald-500/30 bg-emerald-500/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">
                            ✓ RESULT:
                          </span>
                          <p className="text-slate-300 text-sm mt-1 font-light">
                            {example.result}
                          </p>
                        </div>
                        <div className="text-4xl font-black text-emerald-400">
                          {example.improvement}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* What Kendra Does NOT Do */}
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-12"
            >
              <div className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
                <Shield className="w-3 h-3 animate-pulse" />
                LIMITATIONS
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                WHAT<span className="text-brand-primary">_</span>KENDRA<span className="text-brand-primary">_</span>DOES<span className="text-brand-primary">_</span>NOT<span className="text-brand-primary">_</span>DO
              </h2>
              <p className="text-xl text-slate-400 font-light">
                Clear boundaries and honest limitations
              </p>
            </motion.div>

            <div className="glass-panel border-red-500/30 bg-red-500/5 p-8">
              <ul className="grid md:grid-cols-2 gap-4 text-slate-300">
                {[
                  {
                    title: "No magic metrics",
                    desc: 'We don\'t claim "10x faster" without showing before/after CI logs',
                  },
                  {
                    title: "No blind automation",
                    desc: "High-risk changes always require human review",
                  },
                  {
                    title: "No framework lock-in",
                    desc: "Works with React, Next.js, Vue—not proprietary abstractions",
                  },
                  {
                    title: 'No "replace engineers"',
                    desc: "This augments your team, doesn't replace judgment",
                  },
                  {
                    title: "No unproven AI models",
                    desc: "Uses production-tested LLMs with fallback strategies",
                  },
                  {
                    title: "No data collection",
                    desc: "Your code stays in your repos. We never train on your data.",
                  },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-red-400 font-black text-lg">✗</span>
                    <div>
                      <span className="font-bold text-white">{item.title}:</span>{" "}
                      <span className="font-light">{item.desc}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
