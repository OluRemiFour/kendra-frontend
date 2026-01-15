import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Brain,
  CheckCircle,
  Code,
  Cpu,
  Database,
  Eye,
  FileCode,
  GitBranch,
  Lock,
  MessageSquare,
  Search,
  Shield,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-bg-dark text-slate-200">
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
              <Terminal className="w-4 h-4 text-brand-primary animate-pulse" />
              <span className="text-brand-primary text-xs font-mono tracking-widest uppercase">
                SYSTEM_ARCHITECTURE_v2.0
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
              MULTI<span className="text-brand-primary">_</span>AGENT
              <br />
              AI<span className="text-brand-primary">_</span>SYSTEM
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              Enterprise-grade autonomous DevOps platform engineered for safety, scale, and human-in-the-loop control
            </p>
          </motion.div>

          {/* Core Principles Grid */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-white/5 border border-white/5">
              {[
                {
                  icon: Shield,
                  title: "SAFETY_FIRST",
                  desc: "Never touches protected branches. Always requires human approval.",
                  color: "emerald-400",
                },
                {
                  icon: Brain,
                  title: "AI_POWERED",
                  desc: "Multi-agent system with specialized roles and responsibilities.",
                  color: "brand-primary",
                },
                {
                  icon: Zap,
                  title: "PROD_READY",
                  desc: "Battle-tested architecture built for real engineering teams.",
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
                    <div className={`w-14 h-14 bg-${item.color}/10 border border-${item.color}/30 flex items-center justify-center mb-6`}>
                      <item.icon className={`w-7 h-7 text-${item.color}`} />
                    </div>
                    <h3 className="text-xs font-mono tracking-widest text-brand-primary mb-3 uppercase">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Specialized AI Agents */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-12"
            >
              <div className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
                <Activity className="w-3 h-3 animate-pulse" />
                SPECIALIZED_AGENTS
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                AGENT<span className="text-brand-primary">_</span>ROSTER
              </h2>
              <p className="text-xl text-slate-400 font-light">
                Each agent has a specific role, clear boundaries, and built-in safety protocols
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  icon: Search,
                  name: "ANALYZER_AGENT",
                  color: "cyan-400",
                  purpose: "Repository analysis and threat detection",
                  trigger: "Scheduled scans, webhook events, manual triggers",
                  capabilities: [
                    "Code pattern detection",
                    "CI/CD log analysis",
                    "Performance profiling",
                    "Security scanning",
                  ],
                  guardrails: "Read-only access • Rate-limited API calls • 5-minute timeout",
                },
                {
                  icon: Wrench,
                  name: "FIXER_AGENT",
                  color: "emerald-400",
                  purpose: "Generate code fixes and optimizations",
                  trigger: "Issues flagged with MEDIUM+ priority",
                  capabilities: [
                    "Context-aware fixes",
                    "Multi-language support",
                    "Test generation",
                    "Performance optimization",
                  ],
                  guardrails: "Max 500 lines per PR • Must pass static analysis • No protected files",
                },
                {
                  icon: Eye,
                  name: "REVIEWER_AGENT",
                  color: "purple-400",
                  purpose: "Quality and safety validation",
                  trigger: "Before opening pull request",
                  capabilities: [
                    "Code quality check",
                    "Security validation",
                    "Pattern compliance",
                    "Risk scoring",
                  ],
                  guardrails: "Blocks HIGH risk PRs • Requires approval for infra • Mandatory reviews",
                },
                {
                  icon: MessageSquare,
                  name: "EXPLAINER_AGENT",
                  color: "orange-400",
                  purpose: "Human-readable documentation",
                  trigger: "After fix generation",
                  capabilities: [
                    "Change summaries",
                    "Impact analysis",
                    "Technical docs",
                    "Team notifications",
                  ],
                  guardrails: "No sensitive data • Character limits • Clear language only",
                },
              ].map((agent, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel border-white/5 p-8 group hover:border-white/10 transition-all"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-16 h-16 bg-${agent.color}/10 border border-${agent.color}/30 flex items-center justify-center flex-shrink-0`}>
                      <agent.icon className={`w-8 h-8 text-${agent.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white mb-1 tracking-tighter uppercase">
                        {agent.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono uppercase">
                        {agent.purpose}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-3 h-3 text-brand-primary" />
                        <span className="text-brand-primary font-mono text-xs tracking-wider uppercase">
                          Trigger
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm pl-5 font-light">
                        {agent.trigger}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-mono text-xs tracking-wider uppercase">
                          Capabilities
                        </span>
                      </div>
                      <ul className="space-y-1 pl-5">
                        {agent.capabilities.map((cap, i) => (
                          <li
                            key={i}
                            className="text-slate-300 text-sm flex items-center gap-2 font-light"
                          >
                            <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span className="text-amber-400 font-mono text-xs tracking-wider uppercase">
                          Safety Guardrails
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs pl-5 font-mono">
                        {agent.guardrails}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Execution Flow */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-12"
            >
              <div className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
                <Code className="w-3 h-3 animate-pulse" />
                EXECUTION_PIPELINE
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                END<span className="text-brand-primary">_</span>TO<span className="text-brand-primary">_</span>END<span className="text-brand-primary">_</span>FLOW
              </h2>
              <p className="text-xl text-slate-400 font-light">
                From repository ingestion to production deployment
              </p>
            </motion.div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-primary via-brand-accent to-purple-500 hidden md:block" />

              <div className="space-y-6">
                {[
                  {
                    phase: "REPOSITORY_INGESTION",
                    icon: GitBranch,
                    steps: [
                      "User installs GitHub App and selects repositories",
                      "System clones metadata (file structure, configs)",
                      "Creates vector embeddings for semantic search",
                      "Indexes dependencies and CI/CD pipelines",
                    ],
                  },
                  {
                    phase: "CONTEXTUAL_UNDERSTANDING",
                    icon: Brain,
                    steps: [
                      "Analyzer scans codebase patterns (React/Next.js)",
                      "Identifies CI/CD platform and configurations",
                      "Maps dependency tree and version conflicts",
                      "Builds knowledge graph of relationships",
                    ],
                  },
                  {
                    phase: "ISSUE_DETECTION",
                    icon: AlertTriangle,
                    steps: [
                      "Pattern matching for anti-patterns",
                      "CI failure analysis from webhooks",
                      "Performance issue detection (bundle, renders)",
                      "Assigns risk score: LOW/MEDIUM/HIGH",
                    ],
                  },
                  {
                    phase: "FIX_GENERATION_&_REVIEW",
                    icon: Wrench,
                    highlight: true,
                    steps: [
                      "Fixer proposes solution with full context",
                      "Reviewer validates safety and correctness",
                      "Static analysis and linting checks",
                      "🚨 HUMAN APPROVAL for MEDIUM+ risk",
                    ],
                  },
                  {
                    phase: "PULL_REQUEST_CREATION",
                    icon: FileCode,
                    steps: [
                      "Explainer generates detailed PR description",
                      "Creates branch: ai/fix-{issue-id}",
                      "Opens PR with risk assessment & tests",
                      "Team notification via Slack/email",
                    ],
                  },
                  {
                    phase: "POST_MERGE_VALIDATION",
                    icon: CheckCircle,
                    steps: [
                      "Monitors CI for new failures",
                      "Tracks performance metrics",
                      "Updates knowledge base with patterns",
                      "Comprehensive audit logging",
                    ],
                  },
                ].map((flow, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                  >
                    <div className={`flex gap-6 items-start ${flow.highlight ? "md:ml-4" : ""}`}>
                      {/* Icon */}
                      <div
                        className={`relative z-10 w-16 h-16 bg-brand-primary/10 border ${
                          flow.highlight ? "border-brand-primary glow-primary" : "border-white/10"
                        } flex items-center justify-center flex-shrink-0`}
                      >
                        <flow.icon className={`w-8 h-8 ${flow.highlight ? "text-brand-primary" : "text-white"}`} />
                      </div>

                      {/* Content */}
                      <div
                        className={`flex-1 glass-panel p-6 ${
                          flow.highlight ? "border-brand-primary/50 glow-primary" : "border-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl font-black text-brand-primary font-mono">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-lg font-black text-white tracking-tighter uppercase">
                            {flow.phase}
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {flow.steps.map((step, stepIdx) => (
                            <li
                              key={stepIdx}
                              className="text-slate-300 flex items-start gap-3 text-sm font-light"
                            >
                              <span className="text-brand-primary mt-1 font-mono">→</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* AI Safety Model */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-12"
            >
              <div className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
                <Shield className="w-3 h-3 animate-pulse" />
                SECURITY_PROTOCOLS
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                AI<span className="text-brand-primary">_</span>SAFETY<span className="text-brand-primary">_</span>MODEL
              </h2>
              <p className="text-xl text-slate-400 font-light">
                Explicit boundaries and transparency for production use
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass-panel border-emerald-500/30 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                  <h3 className="text-2xl font-black text-emerald-400 tracking-tighter uppercase">
                    AI_CAN_DO
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Read repository contents (code, configs, docs)",
                    "Analyze CI/CD logs and build artifacts",
                    "Create branches with 'ai/' prefix",
                    "Open pull requests (never auto-merge)",
                    "Comment on PRs with suggestions",
                    "Run read-only static analysis",
                    "Generate performance reports",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 text-slate-300 text-sm font-light"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass-panel border-red-500/30 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  <h3 className="text-2xl font-black text-red-400 tracking-tighter uppercase">
                    AI_CANNOT_DO
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Push to main/master/production branches",
                    "Merge pull requests automatically",
                    "Modify .git directory or CI secrets",
                    "Access private environment variables",
                    "Delete branches, tags, or releases",
                    "Change GitHub App permissions",
                    "Execute arbitrary code in production",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 text-slate-300 text-sm font-light"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Security Policies */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-white/5 border border-white/5">
              {[
                {
                  icon: Shield,
                  title: "BRANCH_PROTECTION",
                  desc: "Respects repository rules. Cannot override required reviews.",
                },
                {
                  icon: Lock,
                  title: "SECRETS_HANDLING",
                  desc: "Never accesses or logs secrets. Uses GitHub secret scanning API.",
                },
                {
                  icon: FileCode,
                  title: "AUDIT_LOGGING",
                  desc: "Every action logged with timestamp, agent, and approval state.",
                },
                {
                  icon: Zap,
                  title: "RATE_LIMITING",
                  desc: "Max 10 PRs/day per repo. Max 100 API calls/hour.",
                },
              ].map((policy, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg-dark p-6 group hover:bg-white/5 transition-all"
                >
                  <policy.icon className="w-6 h-6 text-brand-primary mb-4" />
                  <h4 className="text-sm font-mono tracking-wider text-white mb-2 uppercase">
                    {policy.title}
                  </h4>
                  <p className="text-slate-400 text-xs font-light leading-relaxed">{policy.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* System Architecture Diagram */}
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-12"
            >
              <div className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
                <Database className="w-3 h-3 animate-pulse" />
                TECH_STACK
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                SYSTEM<span className="text-brand-primary">_</span>ARCHITECTURE
              </h2>
              <p className="text-xl text-slate-400 font-light">
                Production-grade infrastructure built for scale
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/5 border border-white/5">
              {[
                {
                  icon: Database,
                  title: "DATA_STORAGE",
                  items: [
                    "PostgreSQL: User data, repo metadata, audit logs",
                    "Pinecone: Vector embeddings for semantic search",
                    "Redis: Task queue, rate limiting, caching",
                  ],
                },
                {
                  icon: GitBranch,
                  title: "GIT_INTEGRATION",
                  items: [
                    "GitHub App with minimal permissions",
                    "Webhook listeners for real-time events",
                    "GraphQL API for efficient queries",
                  ],
                },
                {
                  icon: Brain,
                  title: "AI_MODELS",
                  items: [
                    "GPT-4 for complex reasoning",
                    "Claude for code generation",
                    "Gemini for multi-modal tasks",
                  ],
                },
              ].map((tech, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg-dark p-8 group hover:bg-white/5 transition-all"
                >
                  <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center mb-6">
                    <tech.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h3 className="text-sm font-mono tracking-wider text-white mb-4 uppercase">
                    {tech.title}
                  </h3>
                  <ul className="space-y-2">
                    {tech.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-slate-400 text-xs flex items-start gap-2 font-light leading-relaxed"
                      >
                        <span className="w-1 h-1 bg-brand-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
