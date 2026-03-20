import { useState } from "react";
import ScoreBar from "./ScoreBar";

export default function ResultCard({ result, index }) {
  const [copied, setCopied] = useState(false);
  const delay = `${index * 80}ms`;

  function copy() {
    navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const domain = (() => { try { return new URL(result.url).hostname.replace("www.", ""); } catch { return result.url; } })();
  const year = result.publishedDate ? result.publishedDate.slice(0, 4) : "—";

  return (
    <div className="result-card" style={{ animationDelay: delay }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
        <a href={result.url} target="_blank" rel="noopener noreferrer"
          style={{ color: "#e8edf5", fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, lineHeight: 1.4, textDecoration: "none", flex: 1 }}
          onMouseEnter={e => e.target.style.color = "#00e5a0"}
          onMouseLeave={e => e.target.style.color = "#e8edf5"}>
          {result.title}
        </a>
        <button onClick={copy}
          style={{ flexShrink: 0, background: copied ? "#00e5a020" : "transparent", border: `1px solid ${copied ? "#00e5a0" : "#2a3245"}`, borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 11, color: copied ? "#00e5a0" : "#6b7a99", fontFamily: "'DM Mono', monospace", transition: "all 0.2s" }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
        {result.author && <span style={{ fontSize: 11, color: "#6b7a99", fontFamily: "'DM Mono', monospace" }}>{result.author}</span>}
        <span style={{ fontSize: 11, color: "#3d4f6e", fontFamily: "'DM Mono', monospace" }}>·</span>
        <span style={{ fontSize: 11, color: "#6b7a99", fontFamily: "'DM Mono', monospace" }}>{year}</span>
        <span style={{ fontSize: 11, color: "#3d4f6e", fontFamily: "'DM Mono', monospace" }}>·</span>
        <span style={{ fontSize: 11, color: "#4a9eff", fontFamily: "'DM Mono', monospace" }}>{domain}</span>
      </div>

      {result.summary && (
        <p style={{ fontSize: 13, color: "#8a97b0", lineHeight: 1.65, margin: "0 0 12px 0", fontFamily: "'Lora', Georgia, serif" }}>
          {result.summary}
        </p>
      )}

      <ScoreBar score={result.score ?? 0.8} />
    </div>
  );
}
