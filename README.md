# Jotish — Astrology Insights Web App

A multi-page React + TypeScript application built as an assignment submission. Jotish lets users explore employee data through an astrology-themed interface with live charts, an interactive map, and an in-app camera capture feature.

## Live Demo

Deployed on Vercel — [jotish-assignment-submission.vercel.app](https://jotish-assignment-submission.vercel.app)

## Explanatory Video

[Watch on Google Drive](https://drive.google.com/file/d/1SnRpsHAr9k-TCQX63LcEZbKHpCKW3hC9/view?usp=drive_link)

---

## Shared Snapshot:

Landing Page:
<img width="1903" height="1030" alt="image" src="https://github.com/user-attachments/assets/591874e6-5b9b-4dbe-adac-2de89a37ec28" />


SignIn Page:
<img width="1875" height="1032" alt="image" src="https://github.com/user-attachments/assets/e5424b43-b50b-42f0-a39d-0d1f86ebf3b7" />


Dashboard Page:
<img width="1880" height="1031" alt="image" src="https://github.com/user-attachments/assets/cbf5227f-da98-4c6c-8c44-32241036c786" />

Map Insight Page:
<img width="1888" height="1029" alt="image" src="https://github.com/user-attachments/assets/cbd78ec9-77cf-4296-8db3-f2ee20533520" />


Analysis Page:
<img width="1885" height="1032" alt="image" src="https://github.com/user-attachments/assets/4427194c-2406-4db6-b4aa-f477eee87603" />

Employee details with snapshot taking Page:
<img width="1865" height="1006" alt="image" src="https://github.com/user-attachments/assets/4e17fa83-4a54-45ee-96a0-d30e41363732" />


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

Thanks
