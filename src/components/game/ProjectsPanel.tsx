import "./PortfolioPanels.css";



type ProjectsPanelProps = {
  onClose: () => void;
};

const projects = [
  {
    name: "SpecLayer",
    category: "AI / Hackathon",
    description:
      "An AI-powered platform that transforms equipment photos into interactive component maps, grounded in retrieved technical documentation.",
    technologies: ["Python", "AI/LLMs", "Computer Vision", "RAG"],
    github: "https://github.com/kazmisahab110",
  },
  {
    name: "Premier Zone",
    category: "Full-Stack Development",
    description:
      "A football web application with player statistics, team exploration, REST APIs, and PostgreSQL-backed data.",
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL"],
    github: "https://github.com/kazmisahab110",
  },
  {
    name: "ScoutIQ",
    category: "Database Engineering",
    description:
      "A football analytics database project using Oracle AI Database, relational schema design, and data ingestion pipelines.",
    technologies: ["Oracle SQL", "Docker", "SQL*Loader"],
    github: "https://github.com/kazmisahab110",
  },
  {
    name: "Formula Racing Portfolio",
    category: "Interactive 3D Development",
    description:
      "An interactive racing experience that lets visitors drive around a circuit to discover software projects and portfolio information.",
    technologies: ["React", "TypeScript", "Three.js", "React Three Fiber"],
    github: "https://github.com/kazmisahab110",
  },
];

export default function ProjectsPanel({
  onClose,
}: ProjectsPanelProps) {
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
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="portfolio-panel-content"
        style={{
          background: "#111827",
          color: "white",
          width: "min(900px, 100%)",
          maxHeight: "85vh",
          overflowY: "auto",
          borderRadius: "20px",
          padding: "30px",
          boxSizing: "border-box",
          border: "1px solid #facc15",
        }}
      >
        <div
          style={{
            color: "#facc15",
            letterSpacing: "3px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          THE GARAGE / SELECTED WORK
        </div>

        <h1 style={{ margin: "12px 0 8px", fontSize: "32px" }}>
          My Projects
        </h1>

        <p style={{ color: "#9ca3af", marginBottom: "28px" }}>
          Explore the software I've designed and built.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "16px",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.name}
              style={{
                background: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "14px",
                padding: "22px",
              }}
            >
              <div
                style={{
                  color: "#facc15",
                  fontSize: "11px",
                  letterSpacing: "1px",
                  fontWeight: "bold",
                }}
              >
                {project.category}
              </div>

              <h2 style={{ margin: "12px 0", fontSize: "22px" }}>
                {project.name}
              </h2>

              <p
                style={{
                  color: "#d1d5db",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                {project.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginTop: "18px",
                }}
              >
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      background: "#374151",
                      color: "#e5e7eb",
                      fontSize: "12px",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: "inline-block",
                    marginTop: "20px",
                    color: "#facc15",
                    fontSize: "13px",
                    fontWeight: "bold",
                    textDecoration: "none",
                }}
>
    View on GitHub ↗
    </a>



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
