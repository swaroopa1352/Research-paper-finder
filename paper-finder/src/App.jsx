import { useState, useEffect } from "react";
import { searchPapers } from "./api/search";
import ResultCard from "./components/ResultCard";
import ModeToggle from "./components/ModeToggle";

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("neural");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Mono:wght@400;500&family=Lora&display=swap";
    document.head.appendChild(link);
  }, []);

  async function handleSearch(e) {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const data = await searchPapers({ query, mode, numResults: 10 });
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  const exampleQueries = [
    "transformer attention mechanisms NLP",
    "retrieval augmented generation RAG",
    "diffusion models image generation",
    "reinforcement learning from human feedback",
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050a14; }
        .result-card {
          background: #0a1120; border: 1px solid #1a2235; border-radius: 14px;
          padding: 20px; opacity: 0; transform: translateY(16px);
          animation: slideIn 0.4s ease forwards; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .result-card:hover { border-color: #2a3f6f; box-shadow: 0 0 0 1px #1e3a5f30, 0 8px 32px #00000060; }
        @keyframes slideIn { to { opacity: 1; transform: translateY(0); } }
        .search-input {
          width: 100%; background: #0a1120; border: 1.5px solid #1e2d45;
          border-radius: 12px; padding: 15px 20px; color: #e8edf5;
          font-family: 'Sora', sans-serif; font-size: 15px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-input:focus { border-color: #00e5a0; box-shadow: 0 0 0 3px #00e5a015; }
        .search-input::placeholder { color: #3d4f6e; }
        .search-btn {
          background: #00e5a0; color: #050a14; border: none; border-radius: 12px;
          padding: 15px 28px; font-family: 'Sora', sans-serif; font-weight: 700;
          font-size: 14px; cursor: pointer; transition: transform 0.15s, background 0.2s; white-space: nowrap;
        }
        .search-btn:hover { background: #00ffb2; transform: translateY(-1px); }
        .search-btn:active { transform: translateY(0); }
        .search-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .chip {
          background: #0d1525; border: 1px solid #1e2d45; border-radius: 99px;
          padding: 5px 13px; font-size: 12px; font-family: 'DM Mono', monospace;
          color: #6b7a99; cursor: pointer; transition: all 0.15s;
        }
        .chip:hover { border-color: #00e5a060; color: #00e5a0; background: #00e5a008; }
        .spinner {
          width: 36px; height: 36px; border: 3px solid #1e2d45;
          border-top-color: #00e5a0; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 680px) { .grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#050a14", padding: "0 16px 60px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", paddingTop: 52 }}>

          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 38, color: "#e8edf5", lineHeight: 1.2, marginBottom: 12 }}>
            Research Paper<br />
            <span style={{ background: "linear-gradient(90deg, #00e5a0, #4a9eff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Semantic Finder</span>
          </h1>

          <p style={{ fontFamily: "'Lora', Georgia, serif", color: "#6b7a99", fontSize: 15, lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
            Find deeply relevant research using semantic search — not just keyword matching. Toggle between modes to feel the difference.
          </p>

          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <input className="search-input" value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="e.g. transformer attention mechanisms NLP..." />
            <button className="search-btn" onClick={handleSearch} disabled={loading || !query.trim()}>
              {loading ? "..." : "Search →"}
            </button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 36 }}>
            <ModeToggle mode={mode} onChange={m => { setMode(m); if (searched) handleSearch(); }} />
            <span style={{ color: "#2a3245", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>try:</span>
            {exampleQueries.map(q => (
              <button key={q} className="chip" onClick={() => { setQuery(q); setTimeout(handleSearch, 50); }}>{q}</button>
            ))}
          </div>

          {searched && !loading && (
            <div style={{ background: "#0a1120", border: "1px solid #1a2235", borderRadius: 12, padding: "12px 18px", marginBottom: 24, display: "flex", gap: 12 }}>
              <span style={{ fontSize: 18 }}>{mode === "neural" ? "⚡" : "#"}</span>
              <div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 500, color: mode === "neural" ? "#00e5a0" : "#f5c542" }}>
                  {mode === "neural" ? "Neural (semantic) search" : "Keyword search"}
                </span>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: "#6b7a99", marginTop: 3, lineHeight: 1.6 }}>
                  {mode === "neural"
                    ? "Your query is encoded into a dense embedding vector and results are retrieved by semantic proximity — capturing meaning, not surface tokens."
                    : "Traditional BM25-style retrieval. Results match your literal terms. Switch to neural to see how semantic search finds what you actually mean."}
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "48px 0" }}>
              <div className="spinner" />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#3d4f6e" }}>searching the research corpus...</span>
            </div>
          )}

          {error && (
            <div style={{ background: "#1a0d0d", border: "1px solid #5a1e1e", borderRadius: 12, padding: 16, color: "#ff7b54", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
              ✕ {error}
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#3d4f6e" }}>{results.length} results · {mode} search</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#2a3245" }}>relevance score →</span>
              </div>
              <div className="grid">
                {results.map((r, i) => <ResultCard key={r.id ?? i} result={r} index={i} />)}
              </div>
            </>
          )}

          {!loading && !searched && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#2a3245" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>◎</div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13 }}>enter a topic or paper title above to begin</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
