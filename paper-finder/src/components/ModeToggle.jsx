export default function ModeToggle({ mode, onChange }) {
  return (
    <div style={{ display: "inline-flex", background: "#0d1220", border: "1px solid #1e2535", borderRadius: 10, padding: 4, gap: 4 }}>
      {["neural", "keyword"].map(m => (
        <button key={m} onClick={() => onChange(m)}
          style={{
            padding: "7px 18px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 12,
            fontFamily: "'DM Mono', monospace", fontWeight: 500, transition: "all 0.2s",
            background: mode === m ? (m === "neural" ? "#00e5a0" : "#f5c542") : "transparent",
            color: mode === m ? "#050a14" : "#6b7a99",
          }}>
          {m === "neural" ? "⚡ neural" : "# keyword"}
        </button>
      ))}
    </div>
  );
}
