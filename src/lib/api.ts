const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://kendra-backend-2kcs.onrender.com";

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = this.getTokenFromStorage();
  }

  
  getTokenFromStorage() {
    
    const token = localStorage.getItem("auth_token");

    
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      this.setToken(urlToken);
      
      window.history.replaceState({}, document.title, window.location.pathname);
      return urlToken;
    }

    return token;
  }

  
  setToken(token) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  
  clearToken() {
    this.token = null;
    localStorage.removeItem("auth_token");
  }

  
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
      
    } else {
      console.warn("⚠️ No token available for request to:", endpoint);
    }

    const config = {
      ...options,
      headers,
    };

    
    if (options.body && typeof options.body !== "string") {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      
      if (response.status === 401) {
        console.error("❌ 401 Unauthorized - Token may be expired");
        this.clearToken();

        
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login?error=session_expired";
        }

        throw new Error("Session expired. Please login again.");
      }

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ API Error Response:", {
          status: response.status,
          endpoint,
          error: data.error,
        });
        throw new Error(data.error || `API error: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`❌ API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  

  
  getCurrentUser() {
    return this.request("/api/auth/me");
  }

  
  getGitHubStatus() {
    return this.request("/api/auth/github/status");
  }

  
  connectGitHub() {
    if (!this.token) {
      console.error("No token available for GitHub connect");
      window.location.href = "/";
      return;
    }

    console.log(
      "🔗 Connecting GitHub with token:",
      this.token.substring(0, 20) + "..."
    );

    window.location.href = `${this.baseUrl}/api/auth/github/connect?token=${encodeURIComponent(this.token)}`;
  }

  
  disconnectGitHub() {
    return this.request("/api/auth/github/disconnect", {
      method: "POST",
    });
  }

  
  logout() {
    return this.request("/api/auth/logout", {
      method: "POST",
    }).finally(() => {
      this.clearToken();
    });
  }

  

  
  getRepositories() {
    return this.request("/api/repositories");
  }

  
  syncRepositories() {
    return this.request("/api/repositories/sync", {
      method: "POST",
    });
  }

  
  syncRepository(owner, repo) {
    return this.request(`/api/repositories/${owner}/${repo}/sync`, {
      method: "POST",
    });
  }

  
  updateRepository(repoId, data) {
    return this.request(`/api/repositories/${repoId}`, {
      method: "PATCH",
      body: data,
    });
  }

  
  deleteRepository(repoId) {
    return this.request(`/api/repositories/${repoId}`, {
      method: "DELETE",
    });
  }

  

  
  analyzeRepository(repositoryId) {
    return this.request(`/api/issues/analyze/${repositoryId}`, {
      method: "POST",
    });
  }

  
  getIssues(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/issues${query ? `?${query}` : ""}`);
  }

  
  getIssue(issueId) {
    return this.request(`/api/issues/${issueId}`);
  }

  
  fixIssue(issueId) {
    return this.request(`/api/issues/${issueId}/fix`, {
      method: "POST",
    });
  }

  
  updateIssue(issueId, data) {
    return this.request(`/api/issues/${issueId}`, {
      method: "PATCH",
      body: data,
    });
  }

  
  getIssueStats(repositoryId) {
    return this.request(`/api/issues/stats/${repositoryId}`);
  }

  
  getPullRequests(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/pull-requests${query ? `?${query}` : ""}`);
  }

  
  getPullRequest(prId) {
    return this.request(`/api/pull-requests/${prId}`);
  }

  
  getPRStats(repositoryId) {
    return this.request(`/api/pull-requests/stats/${repositoryId}`);
  }

  
  syncPullRequests() {
    return this.request("/api/pull-requests/sync", {
      method: "POST",
    });
  }

  

  
  getAuditLogs(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/audit${query ? `?${query}` : ""}`);
  }

  
  getAuditStats(repositoryId) {
    const query = repositoryId ? `?repositoryId=${repositoryId}` : "";
    return this.request(`/api/audit/stats${query}`);
  }

  
  getAuditLog(logId) {
    return this.request(`/api/audit/${logId}`);
  }

  getUpdatedPullRequests(repositoryId) {
    return this.request(`/api/stats/${repositoryId}`);
  }

  

  
  getSecurityPosture() {
    return this.request("/api/stats/security-posture");
  }

  
  getThreats(repositoryId) {
    return this.request(`/api/issues/threats/${repositoryId}`);
  }

  
  testAPIEndpoint(endpoint, method = "GET", headers = {}) {
    return this.request("/api/issues/test-endpoint", {
      method: "POST",
      body: { endpoint, method, headers },
    });
  }

  
  getPenTestReport(repositoryId) {
    return this.request(`/api/issues/pen-test-report/${repositoryId}`);
  }

  

  
  debugGitHubConnection() {
    return this.request("/api/auth/github/debug");
  }
}


const apiClient = new ApiClient();

export default apiClient;
