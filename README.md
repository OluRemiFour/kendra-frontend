AI DevOps Dashboard – Frontend
Overview
This frontend provides a clean, intuitive interface for interacting with the AI DevOps platform.

Users can:
Sign in with Github
Connect GitHub repositories
Trigger AI-powered analysis
View detected issues
Track severity & confidence
Monitor automated fixes and PRs
Designed for clarity, speed, and demo impact.

Features:
GitHub Repository Connection
Repository Overview
One-click AI Analysis

Issue Dashboard:
Severity levels
Confidence indicators
File-level insights

Security Findings View
API endpoint risks
Auth & validation gaps

Analysis Status Tracking
Running
Completed
Failed (with clear feedback)

Design Philosophy
Minimal cognitive load
Clear visual hierarchy
Hackathon-friendly demo flow
Built for developers, not managers

Tech Stack
Framework: React / Next.js
Styling: Tailwind CSS
State: React hooks / Context

API Layer: REST
Icons: Lucide / Heroicons

Project Structure
frontend/
│
├── components/
│   ├── Repo cards
│   ├── Issue lists
│   └── Status indicators
│
├── pages/
│   ├── Dashboard
│   ├── Repository view
│   └── Analysis results
│
├── services/
│   └── API client
│
└── styles/

Running Locally
npm install
npm run dev


Frontend runs on:
http://localhost:3000

Backend Integration
Ensure backend is running and set:
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

Demo Tips:
For best demo impact:
Connect a repo with known issues
Run analysis live
Show detected issues
Highlight auto-fix + PR creation
Emphasize security scanning

Future UI Enhancements:
Live analysis streaming
Fix preview diffs
Risk heatmaps
Repo Q&A (chat with your code)

Final Note:
This frontend is designed to show AI in action, not just results  making complex DevOps workflows approachable, fast, and visual.
