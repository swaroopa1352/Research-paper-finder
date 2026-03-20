export default function ScoreBar({ score }) {
  const pct = Math.round(score * 100);
  const color = pct > 89 ? "#00e5a0" : pct > 74 ? "#f5c542" : "#ff7b54";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: "#1e2535", borderRadius: 99 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.8s cubic-bezier(.4,0,.2,1)" }} />
      </div>
      <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color, minWidth: 34 }}>{pct}%</span>
    </div>
  );
}
