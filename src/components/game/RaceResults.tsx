
type RaceResultsProps = {
  raceTime: number;
  onRestart: () => void;
  onExplore: () => void;
};

export default function RaceResults({
  raceTime,
  onRestart,
  onExplore,
}: RaceResultsProps) {
  const minutes = Math.floor(raceTime / 60);
  const seconds = Math.floor(raceTime % 60);
  const hundredths = Math.floor((raceTime % 1) * 100);

  const finalTime =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}.` +
    `${String(hundredths).padStart(2, "0")}`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(5, 10, 20, 0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        color: "#ffffff",
        fontFamily: "'Russo One', Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", padding: "30px" }}>
        <div
          style={{
            color: "#e10600",
            letterSpacing: "5px",
            marginBottom: "20px",
          }}
        >
          CHEQUERED FLAG
        </div>

        <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", margin: "0 0 15px" }}>
          RACE COMPLETE
        </h1>

        <div
          style={{
            fontSize: "72px",
            color: "#e10600",
            marginBottom: "20px",
          }}
        >
          P1
        </div>

        <p style={{ color: "#9ca3af", letterSpacing: "3px" }}>
          FINAL RACE TIME
        </p>

        <div style={{ fontSize: "42px", marginBottom: "40px" }}>
          {finalTime}
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onRestart}
            style={{
              padding: "16px 28px",
              background: "#e10600",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            RACE AGAIN
          </button>

          <button
            onClick={onExplore}
            style={{
              padding: "16px 28px",
              background: "transparent",
              color: "white",
              border: "1px solid #64748b",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            EXPLORE PORTFOLIO
          </button>
        </div>
      </div>
    </div>
  );
}
