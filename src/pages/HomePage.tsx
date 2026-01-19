import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  Code2,
  Eye,
  GitBranch,
  Github,
  GitPullRequest,
  Info,
  Loader2,
  Server,
  Shield,
  TrendingUp,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [typedText, setTypedText] = useState("");
  const fullText = "$ kendra analyze --repo=your-repo --fix --secure";
  const [showRepoModal, setShowRepoModal] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [toasts, setToasts] = useState<
    Array<{ id: string; type: "success" | "error" | "info"; message: string }>
  >([]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const showToast = (type: "success" | "error" | "info", message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleConnectRepo = async () => {
    console.log("🔄 Starting GitHub connection...");
    setConnecting(true);

    try {
      const token = localStorage.getItem("auth_token");
      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL ||
        "https://kendra-backend-2kcs.onrender.com";

      if (!token) {
        console.log("No token, redirecting to direct GitHub login");
        window.location.href = `${apiBaseUrl}/api/auth/github`;
        return;
      }

      const encodedToken = encodeURIComponent(token);
      const githubUrl = `${apiBaseUrl}/api/auth/github/connect?token=${encodedToken}`;

      console.log("🌐 Redirecting to:", githubUrl);
      window.location.href = githubUrl;
    } catch (error: any) {
      console.error("❌ Failed to connect GitHub:", error);
      showToast("error", error.message || "Failed to connect GitHub");
      setConnecting(false);
    }
  };


  return (
    <div className="min-h-screen bg-bg-dark text-slate-200 selection:bg-brand-primary/30 font-sans">
      <div className="fixed inset-0 bg-grid z-0 pointer-events-none opacity-50" />
      <div className="fixed inset-0 bg-gradient-to-b from-bg-dark/0 via-bg-dark/50 to-bg-dark z-0 pointer-events-none" />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          {/* Decorative Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 -right-24 w-72 h-72 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 glass-panel rounded-full border border-brand-primary/20"
            >
              <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-brand-primary text-xs font-mono tracking-widest uppercase">
                Now Live: Security Testing Pipelines
              </span>
            </motion.div>

            <h1 className="text-5xl uppercase md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-white">
              {/* AUTOMATE YOUR<br /> */}
             Autonomous AI <br />
              <span className="bg-gradient-to-r from-brand-primary via-blue-400 to-brand-accent bg-clip-text text-transparent">
                {/* SECURITY OPS */}
                DevOps Engineer
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              {/* Autonomous AI that identifies attack surfaces, scans API endpoints, and secures your infrastructure—keeping your production sacred and your developers fast. */}
It reviews your codebase, finds bugs and security flaws, scans live API endpoints for vulnerabilities, and autonomously creates pull requests to fix what’s broken.            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-10 py-4 bg-brand-primary text-bg-dark rounded-none font-bold hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all flex items-center justify-center gap-2 group transform -skew-x-12"
              >
                <div className="skew-x-12 flex items-center gap-2">
                  LAUNCH SCANNER
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <button
                onClick={handleConnectRepo}
                disabled={connecting}
                className="w-full sm:w-auto px-10 py-4 glass-panel text-white rounded-none font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2 transform -skew-x-12"
              >
                <div className="skew-x-12 flex items-center gap-2 font-mono uppercase tracking-tight">
                  {connecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Github className="w-5 h-5" />}
                  {connecting ? "INITIALIZING..." : "CONNECT GITHUB"}
                </div>
              </button>
            </div>

            {/* Terminal Demo - Tech Style */}
            <div className="glass-panel border-white/5 rounded-lg p-1 max-w-4xl mx-auto shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="bg-black/60 rounded p-6 text-left relative z-10">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    <span className="ml-4 font-mono text-xs text-slate-500">KENDRA_INTEL_SHELL_v2.0</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[10px] font-mono text-brand-primary/50 animate-pulse">UPTIME: 99.99%</div>
                    <Shield className="w-4 h-4 text-brand-primary/20" />
                  </div>
                </div>
                <div className="font-mono text-brand-primary text-sm md:text-base min-h-[160px]">
                  <span className="text-white/30 mr-2">system@kendra ~ %</span>
                  {typedText}
                  <span className="animate-pulse bg-brand-primary ml-1 w-2 h-4 inline-block align-middle" />
                  
                  {typedText.length >= fullText.length && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 space-y-2 text-xs md:text-sm"
                    >
                      <div className="text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> [SEC-SCAN] AUTH_SURFACE_VULN IDENTIFIED: /api/v1/user/settings
                      </div>
                      <div className="text-yellow-400 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> [INFRA] DOCKER_IMAGE_OPTIMIZATION PROPOSED: -320MB BUNDLE SIZE
                      </div>
                      <div className="text-brand-primary flex items-center gap-2">
                        <GitPullRequest className="w-4 h-4" /> [AUTO-FIX] PR_1240 CREATED: ADD_HMAC_VALIDATION_TO_WEBHOOKS
                      </div>
                      <div className="pt-4 text-white/40">Status: MONITORING_CI_PIPELINE...</div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid - Revamped */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-4 lg:px-0 bg-white/5 border border-white/5">
            {[
              {
                icon: CheckCircle,
                title: "Human-in-the-Loop Safety",
                desc: "Every change requires approval. Never pushes to protected branches. All actions are auditable and reversible.",
                color: "brand-primary"
              },
              {
                icon: GitPullRequest,
                title: "Production-Ready PRs",
                desc: "Opens detailed pull requests with context, risk assessment, and reasoning—not just code dumps.",
                color: "brand-secondary"
              },
              {
                icon: TrendingUp,
                title: "Real Performance Gains",
                desc: "Measurable improvements: 40% faster CI builds, 60% fewer re-renders, 30% smaller bundles.",
                color: "brand-accent"
              },
              {
                icon: Shield,
                title: "PEN-TEST GUIDANCE",
                desc: "Identify attack surfaces and insecure endpoints with safe, guided testing strategies.",
                color: "brand-primary"
              },
              {
                icon: Server,
                title: "API PROTECTION",
                desc: "Spot missing auth checks, improper HTTP methods, and broken access patterns automatically.",
                color: "brand-accent"
              },
              {
                icon: Zap,
                title: "CI/CD INTELLIGENCE",
                desc: "Optimize pipelines and fix failing builds with zero-latency automated pull requests.",
                color: "brand-secondary"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-bg-dark p-10 hover:bg-white/5 transition-colors group">
                <div className={`mb-6 text-${feature.color} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-white mb-4 tracking-tighter uppercase">{feature.title}</h3>
                <p className="text-slate-500 font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Pipelines Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
              SECURE YOUR<br />
              <span className="text-brand-primary">LIFECYCLE</span>
            </h2>
            <div className="space-y-8">
              {[
                { label: "ATTACK SURFACE MAPPING", text: "Visualize and secure every public endpoint and exposed file." },
                { label: "VULNERABILITY PLAYBOOKS", text: "Get expert advice on fixing logical flaws before they are exploited." },
                { label: "ZERO-TRUST PIPELINES", text: "Ensure every CI/CD run meets enterprise security standards." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="font-mono text-brand-primary/40 group-hover:text-brand-primary transition-colors">0{i+1}</div>
                  <div>
                    <h4 className="text-white font-bold mb-1 tracking-widest text-xs">{item.label}</h4>
                    <p className="text-slate-500 text-sm font-light">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] rounded-full" />
            <div className="glass-panel border-white/10 p-2 rounded-2xl relative overflow-hidden">
               <div className="bg-black/40 rounded-xl p-8 aspect-square flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: "85%" }} 
                        transition={{ duration: 2, delay: 0.5 }}
                        className="h-full bg-brand-primary" 
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono tracking-widest text-brand-primary">
                      <span>SECURITY SCANNING</span>
                      <span>85% SECURE</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass-panel border-white/5 p-4 rounded-lg text-center">
                        <div className="text-2xl font-black text-white">24</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Surfaces Analyzed</div>
                      </div>
                      <div className="glass-panel border-white/5 p-4 rounded-lg text-center">
                        <div className="text-2xl font-black text-brand-accent">03</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Risks Detected</div>
                      </div>
                    </div>

                    <div className="p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-lg">
                      <code className="text-[10px] text-brand-primary font-mono block animate-pulse">
                         ALERT: INSECURE_AUTH_PATTERN FOUND in authController.js:142
                      </code>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & CTA */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-gradient-to-t from-brand-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 text-brand-primary mx-auto mb-10" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
            READY TO DEFEND<br />YOUR CODEBASE?
          </h2>
          <p className="text-lg text-slate-400 mb-12 font-light">
            Kendra advises and orchestrates, it does not run dangerous attacks. 
            All actions are human-approved and cryptographically signed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={handleConnectRepo}
              className="w-full sm:w-auto px-12 py-5 bg-white text-bg-dark rounded-none font-black hover:bg-brand-primary transition-all uppercase tracking-widest transform -skew-x-12"
            >
              <span className="skew-x-12 block">INITIALIZE SECURITY SCAN</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-primary" />
            <span className="font-black tracking-tighter text-xl text-white">KENDRA<span className="text-brand-primary">_SENTRY</span></span>
          </div>
          <p className="text-slate-500 text-xs font-mono tracking-widest uppercase">
            © 2026 KENDRA INTELLIGENCE. ALL RIGHTS RESERVED. SECURE_AUTH_v2.0
          </p>
        </div>
      </footer>
    </div>
  );
}
