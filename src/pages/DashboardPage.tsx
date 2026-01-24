import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GitBranch,
  GitPullRequest,
  Info,
  Loader2,
  Shield,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import apiClient from "../lib/api";
import APITestingPanel from "../components/APITestingPanel";

interface Repository {
  _id: string;
  repoName: string;
  repoOwner: string;
  repoUrl: string;
  platform: string;
  framework?: string;
  language?: string;
  isActive: boolean;
  lastAnalyzedAt?: string;
  createdAt: string;
}

interface Issue {
  _id: string;
  repositoryId: string;
  title: string;
  issueType: string;
  severity: string;
  status: string;
  description: string;
  createdAt: string;
  aiConfidence?: number;
  filePath?: string;
  lineNumber?: number;
  aiExplanation?: string;
  suggestedFix?: string;
}

interface PullRequest {
  _id: string;
  repositoryId: string;
  prNumber: number;
  title: string;
  status: string;
  reviewStatus: string;
  prUrl: string;
  branch: string;
  filesChanged?: number;
  createdAt: string;
}

interface AuditLog {
  _id: string;
  agentName: string;
  action: string;
  riskLevel: string;
  approved: boolean;
  timestamp: string;
  details?: any;
}

export default function DashboardPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [githubConnected, setGithubConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "repos" | "issues" | "prs" | "audit" | "api-testing"
  >("overview");
  const [fixingIssue, setFixingIssue] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [toasts, setToasts] = useState<
    Array<{ id: string; type: "success" | "error" | "info"; message: string }>
  >([]);
  const [issueSearch, setIssueSearch] = useState("");
  const [issueSeverityFilter, setIssueSeverityFilter] = useState<string>("all");
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);
  const [expandedAuditLog, setExpandedAuditLog] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [securityPosture, setSecurityPosture] = useState<any>(null);

  const showToast = (type: "success" | "error" | "info", message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "text-red-400 bg-red-500/10 border-red-500/30";
      case "HIGH":
        return "text-orange-400 bg-orange-500/10 border-orange-500/30";
      case "MEDIUM":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      case "LOW":
        return "text-blue-400 bg-blue-500/10 border-blue-500/30";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-cyan-400";
      case "merged":
        return "text-green-400";
      case "closed":
        return "text-gray-400";
      case "approved":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "changes-requested":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  const safeStringifyDetails = (details: any): string => {
    if (!details) return "No details";
    if (typeof details === "string") return details;
    try {
      return JSON.stringify(details, null, 2);
    } catch {
      return "Unable to display details";
    }
  };

  const fetchAllData = async () => {
    try {
      const reposData = await apiClient.getRepositories();
      setRepositories(reposData.repositories);

      const issuesData = await apiClient.getIssues();
      setIssues(issuesData.issues || []);

      const prsData = await apiClient.getPullRequests();
      setPullRequests(prsData.pullRequests || []);

      const auditData = await apiClient.getAuditLogs({ limit: 50 });
      setAuditLogs(auditData.logs || []);

      try {
        const postureData = await apiClient.getSecurityPosture();
        setSecurityPosture(postureData.posture);
      } catch (error) {
        console.log("ℹ️ Security posture not available yet");
      }

      return reposData.repositories.length;
    } catch (error: any) {
      console.error("❌ Failed to fetch data:", error);
      throw error;
    }
  };

  const handleConnectGitHub = async () => {
    console.log("🔄 Starting GitHub connection...");
    setConnecting(true);

    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        console.error("❌ No auth token found in localStorage");
        showToast("error", "Please login first");
        window.location.href = "/";
        return;
      }

      console.log("✅ Token found, initiating GitHub OAuth");

      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL ||
        "https://kendra-backend-yc18.onrender.com";
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

  const handleSyncGitHub = async () => {
    console.log("🔄 Starting GitHub sync...");
    setSyncing(true);

    try {
      if (!githubConnected) {
        console.log("⚠️ GitHub not connected, checking connection status...");

        try {
          const debugInfo = await apiClient.debugGitHubConnection();
          console.log("🔍 GitHub connection debug:", debugInfo.debug);

          if (!debugInfo.debug.isGitHubConnected) {
            showToast("error", "Please connect GitHub first");
            setSyncing(false);
            return;
          } else {
            console.log("✅ GitHub is connected, updating state");
            setGithubConnected(true);
          }
        } catch (debugError) {
          console.error("❌ Debug failed:", debugError);
          showToast("error", "Please connect GitHub first");
          setSyncing(false);
          return;
        }
      }

      const result = await apiClient.syncRepositories();

      await apiClient.syncPullRequests();

      console.log("✅ Sync result:", result);

      if (result.repositories) {
        setRepositories(result.repositories);
      }

      const syncCount = result.synced || result.repositories?.length || 0;

      if (syncCount === 0) {
        showToast("info", "No repositories found in your GitHub account");
      } else {
        showToast(
          "success",
          `Successfully synced ${syncCount} repositories from GitHub!`,
        );
      }

      if (result.errors && result.errors.length > 0) {
        console.warn("⚠️ Some repos had sync errors:", result.errors);
        showToast(
          "info",
          `${result.errors.length} repositories had sync issues`,
        );
      }

      await fetchAllData();
    } catch (error: any) {
      console.error("❌ Failed to sync GitHub:", error);

      if (
        error.message.includes("401") ||
        error.message.includes("Session expired")
      ) {
        showToast("error", "Session expired. Please login again.");
        localStorage.removeItem("auth_token");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else if (error.message.includes("GitHub not connected")) {
        showToast("error", "GitHub connection lost. Please reconnect.");
        setGithubConnected(false);
      } else if (
        error.message.includes("Network") ||
        error.message.includes("Failed to fetch")
      ) {
        showToast("error", "Network error. Please check your connection.");
      } else {
        showToast("error", error.message || "Failed to sync repositories");
      }
    } finally {
      setSyncing(false);
    }
  };

  const handleAnalyzeRepo = async (repoId: string, repoName: string) => {
    setAnalyzing(repoId);

    try {
      showToast("info", `Starting analysis of ${repoName}...`);

      const result = await apiClient.analyzeRepository(repoId);

      const updatePullRequest = await apiClient.getUpdatedPullRequests(repoId);
      console.log("✅ Updated PRs after analysis:", updatePullRequest);

      if (result.issuesFound === 0) {
        showToast(
          "info",
          `Analysis complete! No issues found in ${repoName}. This could mean the code is clean or the AI needs more context.`,
        );
      } else {
        showToast(
          "success",
          `Analysis complete! Found ${result.issuesFound} issues (${result.critical} critical)`,
        );
      }

      await fetchAllData();
    } catch (error: any) {
      console.error("❌ Failed to analyze repository:", error);
      showToast("error", error.message || "Failed to analyze repository");
    } finally {
      setAnalyzing(null);
    }
  };

  const handleFixIssue = async (issue: Issue) => {
    setFixingIssue(issue._id);

    try {
      showToast("info", "Generating fix and creating pull request...");

      const result = await apiClient.fixIssue(issue._id);

      showToast(
        "success",
        `Fix created! PR #${result.prNumber} is ready for review`,
      );

      await fetchAllData();

      setActiveTab("prs");
    } catch (error: any) {
      console.error("❌ Failed to fix issue:", error);
      showToast("error", error.message || "Failed to generate fix");
    } finally {
      setFixingIssue(null);
    }
  };

  const handleSignOut = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("❌ Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      setLoading(true);
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
          console.log("📥 Dashboard: Found token in URL, storing...");
          apiClient.setToken(token);
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("token");
          window.history.replaceState(
            {},
            document.title,
            newUrl.pathname + newUrl.search,
          );
        }

        const githubConnectedParam = urlParams.get("github_connected");
        const githubUsername = urlParams.get("username");

        if (githubConnectedParam === "true") {
          showToast("success", `GitHub connected as @${githubUsername}!`);
          setGithubConnected(true);

          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("github_connected");
          newUrl.searchParams.delete("username");
          window.history.replaceState(
            {},
            document.title,
            newUrl.pathname + newUrl.search,
          );
        }

        const error = urlParams.get("error");
        if (error) {
          const errorMessage = urlParams.get("message") || error;
          console.error("❌ Callback error:", errorMessage);
          showToast("error", `Error: ${errorMessage.replace(/_/g, " ")}`);

          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("error");
          newUrl.searchParams.delete("message");
          window.history.replaceState(
            {},
            document.title,
            newUrl.pathname + newUrl.search,
          );
        }

        const storedToken = localStorage.getItem("auth_token");
        if (!storedToken) {
          console.error("❌ No auth token found");
          window.location.href = "/";
          return;
        }

        const { user } = await apiClient.getCurrentUser();
        setUser(user);

        try {
          const { isConnected } = await apiClient.getGitHubStatus();
          setGithubConnected(isConnected);
        } catch (error) {
          console.log("ℹ️ GitHub not connected yet");
        }

        await fetchAllData();
      } catch (error: any) {
        console.error("❌ Dashboard initialization failed:", error);

        if (
          error.message.includes("Network error") ||
          error.message.includes("Failed to fetch")
        ) {
          showToast("error", "Cannot connect to server. Please try again.");
        } else if (
          error.message.includes("Session expired") ||
          error.message.includes("401")
        ) {
          localStorage.removeItem("auth_token");
          window.location.href = "/";
        } else {
          showToast("error", error.message || "Failed to load dashboard");
        }
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  const stats = {
    totalRepos: repositories.length,
    activeRepos: repositories.filter((r) => r.isActive).length,
    openIssues: issues.filter(
      (i) =>
        i.status !== "resolved" &&
        i.status !== "ignored" &&
        i.status !== "pr-created",
    ).length,
    openPRs: pullRequests.filter((pr) => pr.status === "open").length,
    criticalIssues: issues.filter(
      (i) => i.severity === "CRITICAL" && i.status !== "resolved",
    ).length,
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      !issueSearch ||
      issue.title.toLowerCase().includes(issueSearch.toLowerCase()) ||
      issue.issueType.toLowerCase().includes(issueSearch.toLowerCase()) ||
      (issue.filePath &&
        issue.filePath.toLowerCase().includes(issueSearch.toLowerCase()));
    const matchesSeverity =
      issueSeverityFilter === "all" || issue.severity === issueSeverityFilter;
    const isActionable =
      issue.status !== "resolved" &&
      issue.status !== "ignored" &&
      issue.status !== "pr-created";
    return matchesSearch && matchesSeverity && isActionable;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark text-slate-200 font-tech">
      <div className="fixed inset-0 bg-grid z-0 pointer-events-none opacity-40" />
      <Navbar />

      {}
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-20 left-1/2 z-50 max-w-md w-full"
          >
            <div
              className={`mx-4 p-4 rounded-lg shadow-2xl border ${
                toast.type === "success"
                  ? "bg-emerald-900/90 border-emerald-500 text-emerald-100"
                  : toast.type === "error"
                    ? "bg-red-900/90 border-red-500 text-red-100"
                    : "bg-cyan-900/90 border-cyan-500 text-cyan-100"
              } backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3">
                {toast.type === "success" && (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                )}
                {toast.type === "error" && (
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                )}
                {toast.type === "info" && (
                  <Info className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{toast.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-2 flex items-center gap-2"
                >
                  <Activity className="w-3 h-3 animate-pulse" />
                  System Status: Operational
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-2 font-display">
                  CONTROL<span className="text-brand-primary">_CENTER</span>
                </h1>
                <p className="text-slate-500 font-light max-w-xl">
                  Monitoring {stats.totalRepos} target surfaces. Last heartbeat
                  check: {new Date().toLocaleTimeString()}.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {!githubConnected ? (
                  <button
                    onClick={handleConnectGitHub}
                    disabled={connecting}
                    className="px-6 py-3 bg-brand-primary text-bg-dark font-black transition-all hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] disabled:opacity-50 uppercase tracking-tighter text-sm flex items-center gap-2"
                  >
                    {connecting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <GitBranch className="w-4 h-4" />
                    )}
                    INIT_GITHUB_AUTH
                  </button>
                ) : (
                  <button
                    onClick={handleSyncGitHub}
                    disabled={syncing}
                    className="px-6 py-3 glass-panel text-white font-black hover:bg-white/5 transition-all disabled:opacity-50 uppercase tracking-tighter text-sm flex items-center gap-2 border-white/10"
                  >
                    {syncing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Activity className="w-4 h-4" />
                    )}
                    SYNC_SURFACES
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-400 font-bold transition-all uppercase tracking-tighter text-xs"
                >
                  EXIT_SESSION
                </button>
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 bg-white/5 border border-white/5">
              {[
                {
                  label: "SURFACES_MONITORED",
                  value: stats.totalRepos,
                  icon: GitBranch,
                  color: "brand-primary",
                },
                {
                  label: "ACTIVE_PIPELINES",
                  value: stats.activeRepos,
                  icon: Activity,
                  color: "emerald-400",
                },
                {
                  label: "DETECTED_THREATS",
                  value: stats.openIssues,
                  icon: AlertTriangle,
                  color: "yellow-400",
                },
                {
                  label: "AUTONOMOUS_FIXES",
                  value: stats.openPRs,
                  icon: GitPullRequest,
                  color: "brand-accent",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-bg-dark p-8 group overflow-hidden relative"
                >
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <stat.icon className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <div
                      className={`text-${stat.color} mb-4 font-mono text-[10px] tracking-widest`}
                    >
                      {stat.label}
                    </div>
                    <div className="text-4xl font-black text-white flex items-baseline gap-2">
                      {stat.value}
                      <span className="text-[10px] text-slate-600 font-mono tracking-tighter uppercase">
                        node_active
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {}
          <div className="flex gap-8 mb-10 border-b border-white/5 overflow-x-auto">
            {["overview", "repos", "issues", "prs", "audit", "api-testing"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-4 text-[10px] font-mono tracking-[0.2em] uppercase transition-all relative whitespace-nowrap ${
                    activeTab === tab
                      ? "text-brand-primary"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab === "prs"
                    ? "PULL_REQUESTS"
                    : tab === "audit"
                      ? "INTEL_LOGS"
                      : tab === "repos"
                        ? "SURFACE_NODES"
                        : tab === "api-testing"
                          ? "API_TESTING"
                          : tab.toUpperCase()}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary glow-primary shadow-[0_0_10px_#00f2ff]"
                    />
                  )}
                </button>
              ),
            )}
          </div>

          {}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {activeTab === "overview" && (
              <div className="grid lg:grid-cols-3 gap-8">
                {}
                <div className="lg:col-span-2 space-y-8">
                  <div className="glass-panel border-white/5 p-8 rounded-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-brand-primary/20">
                      AUTO_SCAN_v2.0
                    </div>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xs font-display tracking-widest text-slate-500 uppercase">
                        SECURITY_POSTURE_INDEX
                      </h3>
                      <Shield className="w-5 h-5 text-brand-primary" />
                    </div>

                    <div className="flex items-end gap-10">
                      <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-white/5"
                          />
                          <motion.circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeDasharray={440}
                            initial={{ strokeDashoffset: 440 }}
                            animate={{
                              strokeDashoffset:
                                440 -
                                440 *
                                  ((securityPosture?.postureIndex || 92) / 100),
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-brand-primary"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-4xl font-black text-white">
                            {securityPosture?.postureIndex || 92}
                          </div>
                          <div className="text-[10px] text-brand-primary font-mono lowercase">
                            {securityPosture?.trend || "stable"}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 space-y-6">
                        <div className="p-4 bg-brand-primary/5 border-l-2 border-brand-primary">
                          <div className="text-[10px] text-brand-primary font-display mb-1">
                            HEALTH_ADVISORY
                          </div>
                          <div className="text-white text-sm font-light leading-tight">
                            {securityPosture?.healthAdvisory ||
                              "Your attack surface is relatively secure. Review 3 minor logic flaws in payment gateway modules."}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-[8px] text-slate-600 font-mono tracking-widest mb-1 uppercase">
                              COVERAGE
                            </div>
                            <div className="text-xl font-black text-white">
                              {securityPosture?.coverage?.percentage || 0}%
                            </div>
                          </div>
                          <div>
                            <div className="text-[8px] font-mono text-slate-600 tracking-widest mb-1 uppercase">
                              RECENT_FIXES
                            </div>
                            <div className="text-xl font-black text-white">
                              {securityPosture?.activity?.mergedPRs || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {}
                  <div className="glass-panel border-white/5 rounded-none p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xs font-display tracking-widest text-slate-500 uppercase">
                        THREAT_INTEL_FEED
                      </h3>
                      <Activity className="w-4 h-4 text-brand-primary" />
                    </div>

                    <div className="space-y-1">
                      {issues.length === 0 ? (
                        <div className="text-center py-20 text-slate-600 font-mono text-xs">
                          NO_THREATS_DETECTED
                        </div>
                      ) : (
                        issues.slice(0, 6).map((issue, idx) => (
                          <motion.div
                            key={issue._id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group flex items-center gap-6 p-4 border border-transparent hover:border-white/5 hover:bg-white/5 transition-all"
                          >
                            <div className="font-mono text-[10px] text-slate-700">
                              {new Date(issue.createdAt).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" },
                              )}
                            </div>
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${issue.severity === "CRITICAL" ? "bg-red-500 glow-red" : issue.severity === "HIGH" ? "bg-orange-500" : "bg-brand-primary"}`}
                            />
                            <div className="flex-1">
                              <div className="text-white text-sm font-bold tracking-tight group-hover:text-brand-primary transition-colors">
                                {issue.title}
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono uppercase">
                                {issue.issueType} @{" "}
                                {issue.filePath?.split("/").pop() || "Global"}
                              </div>
                            </div>
                            <div className="text-[10px] font-mono text-slate-600">
                              {issue.severity}
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {}
                <div className="space-y-8">
                  <div className="glass-panel border-white/5 p-8 rounded-none">
                    <h4 className="text-[10px] font-display tracking-widest text-brand-primary mb-6 uppercase">
                      Active_Agents
                    </h4>
                    <div className="space-y-6">
                      {[
                        {
                          name: "KENDRA_SHIELD",
                          action: "Monitoring Auth Interface",
                          status: "PROTECTING",
                        },
                        {
                          name: "KENDRA_SENTRY",
                          action: "Scanning Repo Surfaces",
                          status: "SCANNING",
                        },
                        {
                          name: "KENDRA_FLOW",
                          action: "Waiting for Approvals",
                          status: "IDLE",
                        },
                      ].map((agent, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div
                            className={`w-2 h-2 rounded-full ${agent.status === "SCANNING" ? "bg-brand-primary animate-pulse" : "bg-brand-primary/20"}`}
                          />
                          <div className="flex-1">
                            <div className="text-white text-xs font-bold">
                              {agent.name}
                            </div>
                            <div className="text-[9px] text-slate-500 uppercase">
                              {agent.action}
                            </div>
                          </div>
                          <div className="text-[8px] font-mono text-brand-primary/50">
                            {agent.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel border-brand-accent/20 bg-brand-accent/5 p-8 rounded-none">
                    <div className="flex items-center gap-3 mb-4 text-brand-accent">
                      <Zap className="w-5 h-5" />
                      <h4 className="text-xs font-black uppercase tracking-widest font-display">
                        Efficiency_Gains
                      </h4>
                    </div>
                    <div className="text-3xl font-black text-white mb-2">
                      -32%
                    </div>
                    <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                      Average reduction in critical vulnerabilities since
                      integration.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "repos" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-display tracking-widest text-slate-500 uppercase">
                    MANAGED_SURFACE_NODES
                  </h3>
                </div>
                {repositories.length === 0 ? (
                  <div className="glass-panel border-white/5 py-24 text-center">
                    <GitBranch className="w-16 h-16 text-slate-800 mx-auto mb-6" />
                    <p className="text-slate-500 font-mono text-xs">
                      NO_NODES_FOUND. SYNC_REQUIRED.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/5 border border-white/5">
                    {repositories.map((repo) => (
                      <div
                        key={repo._id}
                        className="bg-bg-dark p-8 group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-20 transition-opacity">
                          <GitBranch className="w-12 h-12" />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-4">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${repo.isActive ? "bg-brand-primary glow-primary" : "bg-slate-700"}`}
                            />
                            <span className="text-[10px] font-mono text-slate-500 tracking-tighter uppercase">
                              {repo.platform} / {repo.language || "UNKNOWN"}
                            </span>
                          </div>
                          <h4 className="text-lg font-black text-white mb-2 tracking-tight group-hover:text-brand-primary transition-colors">
                            {repo.repoName}
                          </h4>
                          <p className="text-xs text-slate-500 mb-8 font-light italic truncate">
                            {repo.repoUrl}
                          </p>

                          <div className="flex gap-4">
                            <button
                              onClick={() =>
                                handleAnalyzeRepo(repo._id, repo.repoName)
                              }
                              disabled={analyzing === repo._id}
                              className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] tracking-widest uppercase transition-all disabled:opacity-50"
                            >
                              {analyzing === repo._id
                                ? "ANALYZING..."
                                : "SCAN_SURFACE"}
                            </button>
                            <a
                              href={repo.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/5 hover:bg-white/10 text-slate-400"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "issues" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                  <h3 className="text-sm font-display tracking-widest text-slate-500 uppercase">
                    IDENTIFIED_THREAT_DATABASE
                  </h3>
                  <div className="flex gap-4 w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="SEARCH_NODE..."
                      value={issueSearch}
                      onChange={(e) => setIssueSearch(e.target.value)}
                      className="bg-white/5 border border-white/10 px-4 py-2 text-[10px] font-mono text-white focus:outline-none focus:border-brand-primary w-full md:min-w-[200px]"
                    />
                    <select
                      value={issueSeverityFilter}
                      onChange={(e) => setIssueSeverityFilter(e.target.value)}
                      className="bg-white/5 border border-white/10 px-4 py-2 text-[10px] font-mono text-white focus:outline-none"
                    >
                      <option value="all">ALL_SEVERITIES</option>
                      <option value="CRITICAL">CRITICAL</option>
                      <option value="HIGH">HIGH</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="LOW">LOW</option>
                    </select>
                  </div>
                </div>

                {filteredIssues.length === 0 ? (
                  <div className="glass-panel border-white/5 py-24 text-center">
                    <Shield className="w-16 h-16 text-slate-800 mx-auto mb-6" />
                    <p className="text-slate-500 font-mono text-xs">
                      NO_THREATS_MATCHING_CRITERIA
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0.5 bg-white/10 border border-white/5">
                    {filteredIssues.map((issue) => (
                      <div
                        key={issue._id}
                        className="bg-bg-dark border-b border-white/5 group"
                      >
                        <div
                          className="p-6 flex flex-col md:flex-row gap-6 cursor-pointer hover:bg-white/5 transition-all"
                          onClick={() =>
                            setExpandedIssue(
                              expandedIssue === issue._id ? null : issue._id,
                            )
                          }
                        >
                          <div
                            className={`w-2 h-2 mt-2 rounded-full ${issue.severity === "CRITICAL" ? "bg-red-500 glow-red" : "bg-brand-primary"}`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span
                                className={`text-[8px] font-mono px-2 py-0.5 border ${getSeverityColor(issue.severity)}`}
                              >
                                {issue.severity}
                              </span>
                              <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                                {issue.issueType}
                              </span>
                            </div>
                            <h4 className="text-white font-bold tracking-tight mb-1">
                              {issue.title}
                            </h4>
                            <p className="text-xs text-slate-500 font-light truncate max-w-2xl">
                              {issue.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                                FILE_PATH
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">
                                {issue.filePath?.split("/").pop() || "Global"}
                              </div>
                            </div>
                            {expandedIssue === issue._id ? (
                              <ChevronUp className="w-4 h-4 text-slate-600" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-600" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedIssue === issue._id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-white/[0.02]"
                            >
                              <div className="p-10 border-t border-white/5 grid md:grid-cols-2 gap-10">
                                <div>
                                  <h5 className="text-[10px] font-mono text-brand-primary uppercase tracking-[0.2em] mb-4">
                                    Vulnerability_Deep_Dive
                                  </h5>
                                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                                    {issue.description}
                                  </p>

                                  {issue.aiExplanation && (
                                    <div className="p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-none mb-6">
                                      <div className="text-[8px] font-mono text-brand-primary mb-2 uppercase">
                                        AI_ENGINE_REASONING
                                      </div>
                                      <p className="text-[11px] text-slate-300 italic font-light">
                                        "{issue.aiExplanation}"
                                      </p>
                                    </div>
                                  )}

                                  <button
                                    onClick={() => handleFixIssue(issue)}
                                    disabled={fixingIssue === issue._id}
                                    className="w-full py-4 bg-brand-primary text-bg-dark font-black tracking-widest uppercase text-xs hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] disabled:opacity-50"
                                  >
                                    {fixingIssue === issue._id
                                      ? "EXECUTING_FIX..."
                                      : "INITIATE_REMEDIATION_PR"}
                                  </button>
                                </div>

                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 glass-panel border-white/5">
                                      <div className="text-[8px] font-mono text-slate-600 uppercase mb-1">
                                        AI_CONFIDENCE
                                      </div>
                                      <div className="text-xl font-black text-white">
                                        {(issue.aiConfidence || 0.85).toFixed(
                                          2,
                                        )}
                                      </div>
                                    </div>
                                    <div className="p-4 glass-panel border-white/5">
                                      <div className="text-[8px] font-mono text-slate-600 uppercase mb-1">
                                        IMPACT_SCORE
                                      </div>
                                      <div className="text-xl font-black text-white">
                                        HIGH
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "prs" && (
              <div className="space-y-6">
                <h3 className="text-sm font-mono tracking-widest text-slate-500 uppercase mb-6">
                  REMEDIATION_WORKFLOWS
                </h3>
                {pullRequests.length === 0 ? (
                  <div className="glass-panel border-white/5 py-24 text-center">
                    <GitPullRequest className="w-16 h-16 text-slate-800 mx-auto mb-6" />
                    <p className="text-slate-500 font-mono text-xs">
                      NO_ACTIVE_FLOWS
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {pullRequests.map((pr) => (
                      <div
                        key={pr._id}
                        className="glass-panel border-white/5 p-8 flex flex-col md:flex-row justify-between items-center gap-6"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-mono text-brand-primary">
                              #{pr.prNumber}
                            </span>
                            <h4 className="text-white font-bold">{pr.title}</h4>
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            {pr.branch}
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <div className="text-[8px] font-mono text-slate-600 uppercase mb-1">
                              REVIEW_STATUS
                            </div>
                            <div
                              className={`text-xs font-bold ${getStatusColor(pr.reviewStatus)}`}
                            >
                              {pr.reviewStatus.toUpperCase()}
                            </div>
                          </div>
                          <a
                            href={pr.prUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "audit" && (
              <div className="space-y-1">
                <h3 className="text-sm font-mono tracking-widest text-slate-500 uppercase mb-8">
                  AUTONOMOUS_OPERATION_LOGS
                </h3>
                {auditLogs.length === 0 ? (
                  <div className="glass-panel border-white/5 py-24 text-center">
                    <Activity className="w-16 h-16 text-slate-800 mx-auto mb-6" />
                    <p className="text-slate-500 font-mono text-xs">
                      LOG_STREAM_EMPTY
                    </p>
                  </div>
                ) : (
                  auditLogs.map((log) => (
                    <div
                      key={log._id}
                      className="group p-6 bg-white/[0.01] border-b border-white/5 hover:bg-white/[0.03] transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="font-mono text-[10px] text-slate-700">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                        <div
                          className={`w-1 h-4 ${log.approved ? "bg-brand-primary" : "bg-red-500"}`}
                        />
                        <div className="flex-1">
                          <div className="text-white text-sm font-bold truncate">
                            {log.action}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 uppercase italic">
                            {log.agentName} @ {log.riskLevel} RISK
                          </div>
                        </div>
                        <div className="text-[10px] font-mono text-slate-600">
                          {log.approved ? "AUTHORIZED" : "BLOCKED"}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "api-testing" && (
              <div className="space-y-6">
                <h3 className="text-sm font-mono tracking-widest text-slate-500 uppercase mb-6">
                  API_ENDPOINT_SECURITY_TESTING
                </h3>
                <APITestingPanel />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
