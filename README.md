# 🚀 Community Vibe — Hackathon Feedback Portal

A modern, full-stack feedback portal designed to capture participant experiences at hackathons, validate responses, and generate instant automated organizer replies.

## ✨ Features
- **Luminous Bento-Grid UI:** Split-screen glassmorphic dashboard with interactive star rating pickers and pill-button selectors.
- **Automated Organizer Response:** Dynamically generates custom replies based on Wi-Fi reliability and overall community vibe metrics.
- **Live Community Pulse Feed:** Real-time display of submitted feedback entries with instant creation (`POST`), retrieval (`GET`), and removal (`DELETE`).
- **Strict Schema Validation:** Mongoose models with enum enforcement for event ratings and experience categories.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3 (Glassmorphism & Aurora Mesh Gradients), Vanilla JavaScript (`fetch` API)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB & Mongoose ODM

## 📂 Project Structure
```text
├── backend/
│   ├── models/
│   │   └── Feedback.js          # Mongoose schema & enum validation
│   ├── routes/
│   │   └── feedbackRoutes.js    # REST API endpoints & auto-reply generator
│   ├── server.js                # Express app setup & MongoDB connection
│   └── .env                     # Environment variables (PORT, MONGO_URI)
└── frontend/
    ├── index.html               # Split-screen Bento dashboard markup
    ├── style.css                # Luminous glassmorphic styles
    └── script.js                # Interactive UI logic & API integration