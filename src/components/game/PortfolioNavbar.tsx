
import "./PortfolioNavbar.css";

type PortfolioNavbarProps = {
  onAbout: () => void;
  onProjects: () => void;
  onSkills: () => void;
  onContact: () => void;
  onRace: () => void;
};

export default function PortfolioNavbar({
  onAbout,
  onProjects,
  onSkills,
  onContact,
  onRace,
}: PortfolioNavbarProps) {
  return (
    <nav className="portfolio-navbar">
      <div className="navbar-brand">
        <span className="navbar-brand-mark">07</span>
        <span className="navbar-brand-name">
          FORMULA <span>PORTFOLIO</span>
        </span>
      </div>

      <div className="navbar-links">
        <button onClick={onAbout}>ABOUT</button>
        <button onClick={onProjects}>PROJECTS</button>
        <button onClick={onSkills}>SKILLS</button>
        <button onClick={onContact}>CONTACT</button>

        <button
          className="navbar-race-button"
          onClick={onRace}
        >
          RACE
        </button>
      </div>
    </nav>
  );
}
