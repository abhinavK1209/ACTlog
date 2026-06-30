# ACT Error Logs

A fast, minimal web app to log and review ACT English and Reading mistakes. Built with React + TypeScript + Vite.

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Features

- **Dashboard** — quick stats, unreviewed alert, click-to-navigate
- **English Log** — log missed/guessed/slow questions with type, why missed, rule/fix
- **Reading Log** — log with proof location, why missed, fix next time
- **Filters** — by question type, miss type, reviewed status, source/test
- **Sort** — by date, question type, reviewed status
- **Edit & Delete** — inline edit modal, delete with confirmation
- **Analytics** — bar charts for question type, miss type, review status
- **Data** — all stored in localStorage, no login required
- **Export** — English CSV, Reading CSV, all data as JSON
- **Import** — restore from JSON backup

## Stack

- React 19 + TypeScript
- Vite
- localStorage (no backend)

## Component Structure

```
src/
  types.ts                  — shared TypeScript types
  utils/storage.ts          — localStorage + CSV/JSON export/import
  utils/stats.ts            — analytics helpers
  components/
    Dashboard.tsx           — home page with big cards + stats
    EnglishLog.tsx          — English page
    ReadingLog.tsx          — Reading page
    EnglishEntryForm.tsx    — add English error form
    ReadingEntryForm.tsx    — add Reading error form
    EnglishTable.tsx        — filterable/sortable English table + edit modal
    ReadingTable.tsx        — filterable/sortable Reading table + edit modal
    Analytics.tsx           — bar chart analytics
    StatsCards.tsx          — stat chips (used on dashboard)
  App.tsx                   — tab navigation + state management
  index.css                 — all styles (dark, minimal, responsive)
```
