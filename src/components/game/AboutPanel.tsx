
import "./PortfolioPanels.css";

type AboutPanelProps = {
  onClose: () => void;
};

export default function AboutPanel({ onClose }: AboutPanelProps) {
  return (
    <div
      className="portfolio-panel-overlay"
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0, 0, 0, 0.65)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="portfolio-panel-content"
        style={{
          background: "#111827",
          color: "white",
          padding: "36px",
          borderRadius: "20px",
          width: "min(480px, 85vw)",
          border: "1px solid #00d4ff",
          boxShadow: "0 0 40px rgba(0, 212, 255, 0.15)",
        }}
      >
        <div
          style={{
            color: "#00d4ff",
            fontSize: "12px",
            letterSpacing: "3px",
            marginBottom: "12px",
          }}
        >
          DRIVER PROFILE
        </div>

        <h1 style={{ fontSize: "30px", margin: "0 0 16px" }}>
          About Me
        </h1>

        <p style={{ lineHeight: 1.7, color: "#d1d5db" }}>
          I'm a Computer Science student at the University of
          New Brunswick, passionate about software development,
          backend engineering, and building interactive
          applications.
        </p>

        <p style={{ lineHeight: 1.7, color: "#d1d5db" }}>
          I enjoy working with Java, Spring Boot, React,
          PostgreSQL, and Python to turn ideas into practical
          solutions.
        </p>

        <p style={{ lineHeight: 1.7, color: "#d1d5db" }}>
          This Formula-inspired portfolio combines my interest
          in motorsport with my passion for creating software.
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            background: "#e10600",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Continue Driving
        </button>
      </div>
    </div>
  );
}
