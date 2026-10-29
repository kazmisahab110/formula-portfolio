import "./PortfolioPanels.css";



type SkillsPanelProps = {
  onClose: () => void;
};

const skillGroups = [
  {
    title: "Programming Languages",
    skills: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "C#", "C"],
  },
  {
    title: "Backend Development",
    skills: ["Spring Boot", "REST APIs", "JPA / Hibernate", "JDBC"],
  },
  {
    title: "Frontend Development",
    skills: ["React", "HTML", "CSS", "Three.js", "React Three Fiber"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "Oracle Database", "MongoDB"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["Docker", "Git", "GitHub", "Linux", "AWS", "Azure", "Jenkins"],
  },
  {
    title: "Testing & AI",
    skills: ["JUnit", "Selenium", "Automated Testing", "LLM Integration", "RAG"],
  },
];

export default function SkillsPanel({ onClose }: SkillsPanelProps) {
  return (
    <div
      className="portfolio-panel-overlay"
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0, 0, 0, 0.78)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="portfolio-panel-content"
        style={{
          width: "min(850px, 100%)",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#111827",
          color: "white",
          border: "1px solid #a855f7",
          borderRadius: "20px",
          padding: "30px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            color: "#a855f7",
            fontSize: "12px",
            fontWeight: "bold",
            letterSpacing: "3px",
          }}
        >
          DRIVER TELEMETRY / TECH STACK
        </div>

        <h1 style={{ margin: "12px 0 8px", fontSize: "32px" }}>
          Technical Skills
        </h1>

        <p style={{ color: "#9ca3af", marginBottom: "28px" }}>
          Technologies and tools I use to design, build, and test software.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: "16px",
          }}
        >
          {skillGroups.map((group) => (
            <div
              key={group.title}
              style={{
                background: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <h2
                style={{
                  color: "#c084fc",
                  fontSize: "17px",
                  margin: "0 0 18px",
                }}
              >
                {group.title}
              </h2>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      background: "#374151",
                      color: "#e5e7eb",
                      padding: "7px 10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "28px",
            background: "#e10600",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Back to Racing
        </button>
      </div>
    </div>
  );
}
