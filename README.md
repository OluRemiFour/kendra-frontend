# AI DevOps Dashboard — Frontend

A clean, demo-friendly frontend for the AI DevOps platform. Built to showcase AI-powered repository analysis, automated fixes, and an actionable issues dashboard.

---

[![Demo](https://img.shields.io/badge/demo-local-lightgrey)]() [![License](https://img.shields.io/badge/license-MIT-blue)]() [![Built with Next.js](https://img.shields.io/badge/next.js-%5E13-black)]()

## Table of contents
- [Overview](#overview)
- [Highlights](#highlights)
- [Demo walkthrough](#demo-walkthrough)
- [Quick start](#quick-start)
- [Environment](#environment)
- [Project structure](#project-structure)
- [Running locally](#running-locally)
- [Backend integration](#backend-integration)
- [Future UI enhancements](#future-ui-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
This frontend provides a minimal, high-impact interface for interacting with an AI DevOps platform:
- Sign in with GitHub
- Connect repositories
- Trigger AI-powered analysis
- Inspect detected issues (severity, confidence, file-level context)
- Track automated fixes and created pull requests

Designed for clarity, speed, and demo impact — perfect for hackathons and product demos.

## Highlights
- One-click repository connection
- AI analysis with issue detection and severity/confidence scoring
- Issue dashboard with file-level insights
- Security findings and API-risk visibility
- Analysis status tracking (Running / Completed / Failed)

## Demo walkthrough
For a smooth demo:
1. Connect a GitHub repo (choose one with known issues for impact).
2. Click "Run analysis".
3. Walk through the Issue Dashboard:
   - Show severity & confidence filters
   - Open file-level insights and affected lines
4. Demonstrate automated-fix flow and show created PRs (if available).
5. Optionally highlight security scanning results and risk areas.

## Quick start
1. Install dependencies:
   npm install

2. Start dev server:
   npm run dev

3. Open the app:
   http://localhost:3000

## Environment
Set the backend base URL before running locally:

- NEXT_PUBLIC_API_BASE_URL — e.g.
  - local: `http://localhost:5000`
  - prod/staging: `https://api.example.com`

Example (macOS / Linux):
```bash
export NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
npm run dev
```

## Project structure
A simple overview of the frontend layout:

frontend/
├── components/          # Reusable UI components
│   ├── RepoCard.tsx
│   ├── IssueList.tsx
│   └── StatusIndicator.tsx
├── pages/               # Next.js pages
│   ├── dashboard.tsx
│   ├── repository/[id].tsx
│   └── analysis/[id].tsx
├── services/
│   └── apiClient.ts     # REST API wrapper
├── styles/              # Tailwind / global styles
└── public/              # static assets

(Adjust filenames above to match exact project file names.)

## Running locally (notes)
- App runs on port 3000 by default.
- The frontend relies on the backend API for:
  - Auth / OAuth (GitHub)
  - Repository metadata and analysis jobs
  - Fetching issues & PRs
- Use a dev backend or mocked API if backend is unavailable.

## Backend integration
Ensure the backend supports:
- OAuth with GitHub (callback URLs configured)
- Endpoints for repository listing, analysis triggers, job status, and issue retrieval.

Set:
- NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

## Design & Tech
- Framework: React + Next.js
- Styling: Tailwind CSS
- State: React hooks / Context
- API layer: REST
- Icons: Lucide / Heroicons

Design philosophy:
- Minimal cognitive load
- Clear visual hierarchy
- Fast, demo-friendly flows
- Built for developers

## Future UI enhancements
Planned or desirable improvements:
- Live analysis streaming UI (progress & logs)
- Fix preview diffs before PR creation
- Risk heatmaps (repo & file-level)
- Repo Q&A (chat with repository code)
- Richer filtering and saved views in the dashboard

## Contributing
- Open an issue describing the feature or bug.
- Fork the repo, create a branch, and open a PR with clear description and screenshots.
- Keep changes small and focused for easier review.

## License
MIT — see LICENSE file for details.

---