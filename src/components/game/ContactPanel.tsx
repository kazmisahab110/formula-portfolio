import "./PortfolioPanels.css";


type ContactPanelProps = {
  onClose: () => void;
};

export default function ContactPanel({ onClose }: ContactPanelProps) {
  const links = [
    {
      label: "GitHub",
      description: "Explore my code and projects",
      url: "https://github.com/kazmisahab110",
    },
    {
      label: "LinkedIn",
      description: "Connect with me professionally",
      url: "https://www.linkedin.com/in/syed-owais-haider-kazmi-30558b28b/",
    },
    {
  label: "University Email",
  description: "syedowaishaider.kazmi@unb.ca",
  url: "mailto:syedowaishaider.kazmi@unb.ca",
},
{
  label: "Personal Email",
  description: "haiderowais786@gmail.com",
  url: "mailto:haiderowais786@gmail.com",
},
  ];

  return (
    <div
      className="portfolio-panel-overlay"
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="portfolio-panel-content"
        style={{
          background: "#111827",
          border: "1px solid #22c55e",
          borderRadius: "20px",
          padding: "32px",
          width: "min(580px, 100%)",
          maxHeight: "85vh",
          overflowY: "auto",
          boxSizing: "border-box",
          color: "white",
        }}
      >
        <p
          style={{
            color: "#4ade80",
            fontSize: "12px",
            letterSpacing: "3px",
            fontWeight: "bold",
          }}
        >
          PIT STOP / GET IN TOUCH
        </p>

        <h1 style={{ fontSize: "32px", margin: "12px 0" }}>
          Let's Connect
        </h1>

        <p style={{ color: "#9ca3af", lineHeight: 1.7 }}>
          Thanks for taking a lap around my portfolio!
          I'm interested in software engineering opportunities,
          collaborating on projects, and connecting with people
          in tech.
        </p>

        <div
          style={{
            display: "grid",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.label === "LinkedIn" || link.url.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              style={{
                background: "#1f2937",
                border: "1px solid #374151",
                padding: "16px",
                borderRadius: "12px",
                color: "white",
                textDecoration: "none",
                display: "block",
              }}
            >
              <strong style={{ color: "#4ade80" }}>
                {link.label} ↗
              </strong>

              <div
                style={{
                    color: "#9ca3af",
                    fontSize: "13px",
                    marginTop: "6px",
                }}
                >
                {link.description}
                </div>
            </a>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "26px",
            padding: "12px 24px",
            background: "#e10600",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Back to Racing
        </button>
      </div>
    </div>
  );
}
