
type WelcomeScreenProps = {
  onStart: () => void;
  onExplore: () => void;
};

export default function WelcomeScreen({
  onStart,
  onExplore,
}: WelcomeScreenProps) {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-eyebrow">
          <span className="welcome-red-line" />
          INTERACTIVE DEVELOPER PORTFOLIO
        </div>

        <h1 className="welcome-title">
          FORMULA
          <span>PORTFOLIO</span>
        </h1>

        <div className="welcome-divider" />

        <h2 className="welcome-name">
          SYED OWAIS HAIDER KAZMI
        </h2>

        <p className="welcome-description">
          Computer Science Student & Software Developer
        </p>

        <p className="welcome-subtitle">
          Explore my projects, skills, and experience
          from behind the wheel of a Formula racing car.
        </p>

        <button
          className="welcome-start-button"
          onClick={onStart}
        >
          START ENGINE <span>→</span>
        </button>

        <button
        className="welcome-explore-button"
        onClick={onExplore}
        >
        EXPLORE PORTFOLIO
        </button>

        <div className="welcome-instructions">
          <span>WASD / ARROWS — DRIVE</span>
          <span>E — EXPLORE CHECKPOINTS</span>
        </div>
      </div>

      <div className="welcome-side-label">
        ENGINEERED TO STAND OUT
      </div>

      <div className="welcome-bottom-bar">
        <span>01 / THE STARTING GRID</span>
        <span>BUILT WITH REACT + THREE.JS</span>
      </div>
    </div>
  );
}
