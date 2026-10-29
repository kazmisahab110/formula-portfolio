
export default function DrivingControls() {
  return (
    <div
      style={{
        position: "absolute",
        top: "105px",
        left: "24px",
        padding: "18px",
        width: "220px",
        background: "rgba(12, 17, 27, 0.88)",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: "16px",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div
        style={{
          color: "#f87171",
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "1.5px",
          marginBottom: "14px",
        }}
      >
        DRIVING CONTROLS
      </div>

      <div style={{ fontSize: "13px", lineHeight: "2" }}>
        <div>W / ↑ — Accelerate</div>
        <div>S / ↓ — Brake / Reverse</div>
        <div>A / ← — Steer Left</div>
        <div>D / → — Steer Right</div>
      </div>
    </div>
  );
}
