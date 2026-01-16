import { useState } from "react";
import { Loader2, Shield, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import apiClient from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function APITestingPanel() {
  const [endpoint, setEndpoint] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const handleTest = async () => {
    if (!endpoint.trim()) {
      return;
    }

    setTesting(true);
    setTestResults(null);

    try {
      let parsedHeaders = {};
      if (headers.trim()) {
        try {
          parsedHeaders = JSON.parse(headers);
        } catch (e) {
          throw new Error("Invalid JSON in headers field");
        }
      }

      const result = await apiClient.testAPIEndpoint(endpoint, method, parsedHeaders);
      setTestResults(result.results);
    } catch (error: any) {
      setTestResults({
        endpoint,
        method,
        timestamp: new Date(),
        findings: [
          {
            severity: "ERROR",
            category: "Test Error",
            issue: error.message || "Failed to test endpoint",
            recommendation: "Verify endpoint URL and try again",
          },
        ],
        score: 0,
      });
    } finally {
      setTesting(false);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
      case "HIGH":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "MEDIUM":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "LOW":
      case "INFO":
        return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
      case "HIGH":
        return "border-red-500/30 bg-red-500/5";
      case "MEDIUM":
        return "border-yellow-500/30 bg-yellow-500/5";
      case "LOW":
      case "INFO":
        return "border-cyan-500/30 bg-cyan-500/5";
      default:
        return "border-gray-500/30 bg-gray-500/5";
    }
  };

  return (
    <div className="space-y-8">
      {/* Test Form */}
      <div className="glass-panel border-white/5 p-8 rounded-none">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-brand-primary" />
          <h3 className="text-sm font-mono tracking-widest text-slate-500 uppercase">
            API_ENDPOINT_SECURITY_SCANNER
          </h3>
        </div>

        <div className="space-y-6">
          {/* Endpoint URL */}
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
              Endpoint URL
            </label>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary font-mono"
            />
          </div>

          {/* HTTP Method */}
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
              HTTP Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary font-mono"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          {/* Headers (Optional) */}
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
              Headers (JSON, Optional)
            </label>
            <textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder='{"Authorization": "Bearer token"}'
              rows={3}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary font-mono"
            />
          </div>

          {/* Test Button */}
          <button
            onClick={handleTest}
            disabled={testing || !endpoint.trim()}
            className="w-full py-4 bg-brand-primary text-bg-dark font-black tracking-widest uppercase text-xs hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {testing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                SCANNING_ENDPOINT...
              </span>
            ) : (
              "INITIATE_SECURITY_SCAN"
            )}
          </button>
        </div>
      </div>

      {/* Test Results */}
      <AnimatePresence>
        {testResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel border-white/5 p-8 rounded-none"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-mono tracking-widest text-slate-500 uppercase">
                SCAN_RESULTS
              </h3>
              <div className="flex items-center gap-4">
                <div className="text-[10px] font-mono text-slate-600">
                  {new Date(testResults.timestamp).toLocaleString()}
                </div>
                <div
                  className={`px-4 py-2 font-black text-2xl ${
                    testResults.score >= 80
                      ? "text-green-400"
                      : testResults.score >= 50
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {testResults.score}/100
                </div>
              </div>
            </div>

            {/* Endpoint Info */}
            <div className="mb-6 p-4 bg-white/5 border-l-2 border-brand-primary">
              <div className="text-[10px] text-brand-primary font-mono mb-1">
                TESTED_ENDPOINT
              </div>
              <div className="text-white text-sm font-mono">
                {testResults.method} {testResults.endpoint}
              </div>
            </div>

            {/* Findings */}
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">
                SECURITY_FINDINGS ({testResults.findings.length})
              </div>

              {testResults.findings.map((finding: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 border ${getSeverityColor(finding.severity)}`}
                >
                  <div className="flex items-start gap-4">
                    {getSeverityIcon(finding.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`text-[8px] font-mono px-2 py-0.5 border ${
                            finding.severity === "CRITICAL" || finding.severity === "HIGH"
                              ? "text-red-400 border-red-500/30"
                              : finding.severity === "MEDIUM"
                              ? "text-yellow-400 border-yellow-500/30"
                              : "text-cyan-400 border-cyan-500/30"
                          }`}
                        >
                          {finding.severity}
                        </span>
                        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                          {finding.category}
                        </span>
                      </div>
                      <h4 className="text-white font-bold mb-2">{finding.issue}</h4>
                      <p className="text-sm text-slate-400 font-light mb-3">
                        {finding.recommendation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
