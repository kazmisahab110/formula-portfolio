
type RacingHUDProps = {
  speed: number;
  raceTime: number;
  lap: number;
};

export default function RacingHUD({
  speed,
  raceTime,
  lap,
}: RacingHUDProps) {
  const minutes = Math.floor(raceTime / 60);
  const seconds = Math.floor(raceTime % 60);
  const milliseconds = Math.floor((raceTime % 1) * 100);

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}.` +
    `${String(milliseconds).padStart(2, "0")}`;

  const kmh = Math.round(Math.abs(speed) * 3.6);

  const gear =
    speed < -0.1
      ? "R"
      : kmh < 1
        ? "N"
        : String(Math.min(6, Math.floor(kmh / 18) + 1));

  const speedPercent = Math.min(100, (kmh / 90) * 100);

  const labelStyle = {
    color: "#9ca3af",
    fontSize: "11px",
    letterSpacing: "1.5px",
    fontWeight: "bold" as const,
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "24px",
        right: "24px",
        width: "220px",
        padding: "20px",
        background: "rgba(12, 17, 27, 0.92)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: "16px",
        fontFamily: "Arial, sans-serif",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* Header */}
      <div
        style={{
          color: "#f87171",
          fontSize: "11px",
          fontWeight: "bold",
          letterSpacing: "2px",
          marginBottom: "14px",
        }}
      >
        FORMULA PORTFOLIO
      </div>

      {/* Speed and gear */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "42px",
              fontWeight: "bold",
              lineHeight: 1.1,
            }}
          >
            {String(kmh).padStart(3, "0")}
          </div>
          <div style={labelStyle}>KM/H</div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              lineHeight: 1.1,
            }}
          >
            {gear}
          </div>
          <div style={labelStyle}>GEAR</div>
        </div>
      </div>

      {/* Race timer */}
      <div
        style={{
          marginTop: "20px",
          paddingTop: "14px",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={labelStyle}>RACE TIME</span>

        <span
          style={{
            fontFamily: "'Russo One', Arial, sans-serif",
            fontSize: "17px",
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formattedTime}
        </span>
      </div>

      {/* Lap counter — separate row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "14px",
          paddingTop: "14px",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <span style={labelStyle}>LAP</span>

        <span
          style={{
            color: "#ffffff",
            fontFamily: "'Russo One', Arial, sans-serif",
            fontSize: "19px",
            whiteSpace: "nowrap",
          }}
        >
          {String(lap).padStart(2, "0")} / 03
        </span>
      </div>

      {/* Speed bar */}
      <div
        style={{
          marginTop: "18px",
          height: "6px",
          background: "#374151",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${speedPercent}%`,
            height: "100%",
            background: "#e10600",
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
