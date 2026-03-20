# Research Paper Semantic Finder

A React + Vite web app for searching research papers using Exa AI.

The app supports two retrieval modes:

- **Neural (semantic)**: finds papers by meaning/context.
- **Keyword**: finds papers by literal term matching.

## Features

- Search papers from the Exa API with relevance scoring.
- Toggle between `neural` and `keyword` retrieval.
- View title, author, year, source domain, and summary.
- Copy paper links directly from each result card.
- Responsive results grid for desktop and mobile.

## Tech Stack

- React 19
- Vite 8
- ESLint 9
- Fetch API for HTTP requests

## Project Structure

```text
paper-finder/
├─ public/
├─ src/
│  ├─ api/
│  │  └─ search.js            # Exa search API layer
│  ├─ components/
│  │  ├─ ModeToggle.jsx       # Neural/Keyword switch
│  │  ├─ ResultCard.jsx       # Paper result item
│  │  └─ ScoreBar.jsx         # Relevance score UI
│  ├─ App.jsx                 # Main app state + layout
│  ├─ App.css
│  ├─ index.css
│  └─ main.jsx
├─ eslint.config.js
├─ index.html
├─ package.json
└─ vite.config.js
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`). Open it in your browser.

## Available Scripts

- `npm run dev` — start dev server with HMR
- `npm run build` — create production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint checks

## How Search Works

1. User enters a query.
2. App sends a POST request to `https://api.exa.ai/search`.
3. Request includes mode (`neural` or `keyword`) and search options.
4. Exa returns results, which are rendered as cards with metadata and score bars.

The main API integration is in `src/api/search.js` via:

- `searchPapers({ query, mode, numResults })`

## API Key Note

The Exa API key is currently hardcoded in `src/api/search.js`.

For real deployments, move it to environment variables and avoid committing secrets to Git.

Typical Vite approach:

- Store key in `.env` as `VITE_EXA_API_KEY=...`
- Access with `import.meta.env.VITE_EXA_API_KEY`

## Current Behavior and UX

- Enter key and **Search** button both trigger search.
- Example query chips autofill and run search.
- Mode change reruns search if a prior search exists.
- Loading spinner is shown during API calls.
- Errors are displayed in a visible alert panel.

## Troubleshooting

- **`API error: 401/403`**: API key is invalid or expired.
- **No results**: broaden the query or try `neural` mode.
- **CORS/network issues**: verify internet access and API availability.

## Future Improvements

- Move API key to `.env` immediately.
- Add optional filters (year/source).
- Add pagination or infinite scroll.
- Add test coverage for UI components and API layer.
