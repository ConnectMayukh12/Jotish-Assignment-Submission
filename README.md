# Jotish — Astrology Insights Web App

A multi-page React + TypeScript application built as an assignment submission. Jotish lets users explore employee data through an astrology-themed interface with live charts, an interactive map, and an in-app camera capture feature.

## Live Demo

Deployed on Vercel — [jotish-assignment-submission.vercel.app](https://jotish-assignment-submission.vercel.app)

## Explanatory Video

[Watch on Google Drive](https://drive.google.com/file/d/1SnRpsHAr9k-TCQX63LcEZbKHpCKW3hC9/view?usp=drive_link)

---

## Features

- **Landing Page** — Astrology-themed hero with an infinite-scroll image gallery. Redirects logged-in users straight to Dashboard.
- **Sign In** — Credential-based auth using environment variables. Session stored in `sessionStorage`.
- **Dashboard** — Fetches live employee data from a remote API. Includes live search/filter, and links to Charts and Map.
- **Employee Details** — Per-employee profile page with a front-facing camera capture.
- **Photo Result** — Displays the captured photo with a timestamp and a download option.
- **Charts** — Three Recharts visualisations: salary bar chart, office distribution donut, and top roles horizontal bar.
- **Map** — Interactive Leaflet map with city markers sized and coloured by employee count.
- **404 Page** — Animated capybara loader with a friendly not-found message.

---

## Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Framework  | React 19 + TypeScript   |
| Build Tool | Vite 7                  |
| Styling    | Tailwind CSS 4          |
| Routing    | React Router DOM        |
| Charts     | Recharts                |
| Map        | React Leaflet + Leaflet |
| Font       | Google Sans             |
| Deployment | Vercel                  |

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── CameraCapture.tsx
│   ├── CapybaraLoader.tsx
│   ├── LandingHero.tsx
│   ├── Loader.tsx
│   ├── NavBar.tsx
│   └── ProtectedRoute.tsx
├── constants/index.ts
├── hooks/
│   └── useEmployeeData.ts
├── pages/
│   ├── Charts.tsx
│   ├── Dashboard.tsx
│   ├── Details.tsx
│   ├── Landing.tsx
│   ├── Map.tsx
│   ├── NotFound.tsx
│   ├── PhotoResult.tsx
│   └── SignIn.tsx
├── types/index.ts
├── utils/
│   └── auth.ts
├── App.tsx
└── main.tsx
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/ConnectMayukh12/Jotish-Assignment-Submission.git
cd Jotish-Assignment-Submission
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_VALID_USERNAME=testuser
VITE_VALID_PASSWORD=Test123
```

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## Deployment (Vercel)

The repo includes a `vercel.json` that rewrites all routes to `index.html` for client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Add your `VITE_VALID_USERNAME` and `VITE_VALID_PASSWORD` in **Vercel → Project → Settings → Environment Variables** before deploying.
