
import { Canvas } from "@react-three/fiber";

import FormulaCar from "./FormulaCar";
import DrivingControls from "./DrivingControls";
import Checkpoint from "./Checkpoint";


import StartFinishLine from "./StartFinishLine";


import RaceTrack from "./RaceTrack";
import SafetyBarriers from "./SafetyBarriers";

import { useRef, useState } from "react";
import * as THREE from "three";
import FollowCamera from "./FollowCamera";
import RacingHUD from "./RacingHUD";

import { useEffect } from "react";
import AboutPanel from "./AboutPanel";
import ProjectsPanel from "./ProjectsPanel";
import SkillsPanel from "./SkillsPanel";
import ContactPanel from "./ContactPanel";
import PitBuilding from "./PitBuilding";
import PitLane from "./PitLane";
import Grandstand from "./Grandstand";

import TrackSponsors from "./TrackSponsors";
import TrackTrees from "./TrackTrees";
import TrackLight from "./TrackLight";

import WelcomeScreen from "./WelcomeScreen";
import "./WelcomeScreen.css";

import StartingLights from "../StartingLights";
import RaceResults from "./RaceResults";
import PortfolioNavbar from "./PortfolioNavbar";
import "./PortfolioNavbar.css";


function Ground() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.05, 0]}
    >
      <planeGeometry args={[500, 500]} />
      <meshStandardMaterial color="#4f9347" roughness={1} />
    </mesh>
  );
}






export default function Scene() {
  const carRef = useRef<THREE.Group>(null);
  const [speed, setSpeed] = useState(0);
  const [lap, setLap] = useState(1);
  const [restartKey, setRestartKey] = useState(0);
  const [raceFinished, setRaceFinished] = useState(false);
  const [raceTime, setRaceTime] = useState(0);
  const [checkpointNearby, setCheckpointNearby] =
  useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [portfolioOnly, setPortfolioOnly] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [exploringAfterFinish, setExploringAfterFinish] = useState(false);
  
 
const [gameStarted, setGameStarted] = useState(false);
const [showStartingLights, setShowStartingLights] = useState(false);

// RACE TIMER
useEffect(() => {
  if (
    !gameStarted ||
    portfolioOnly ||
    showStartingLights ||
    raceFinished ||
    aboutOpen ||
    projectsOpen ||
    skillsOpen ||
    contactOpen
  ) {
    return;
  }

  let previousTime = performance.now();

  const interval = window.setInterval(() => {
    const currentTime = performance.now();
    const elapsed = (currentTime - previousTime) / 1000;

    previousTime = currentTime;

    setRaceTime((previous) => previous + elapsed);
  }, 50);

  return () => window.clearInterval(interval);
}, [
  gameStarted,
  showStartingLights,
  raceFinished,
  aboutOpen,
  projectsOpen,
  skillsOpen,
  contactOpen,
]);


  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (gameStarted && event.key.toLowerCase() === "e") {
  if (checkpointNearby === "about") {
    setAboutOpen(true);
  } else if (checkpointNearby === "projects") {
    setProjectsOpen(true);
  } else if (checkpointNearby === "skills") {
  setSkillsOpen(true);
} else if (checkpointNearby === "contact") {
  setContactOpen(true);
}
}

    if (event.key === "Escape") {
      setAboutOpen(false);
      setProjectsOpen(false);
      setSkillsOpen(false);
      setContactOpen(false);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [checkpointNearby, gameStarted]);


const closeAllPanels = () => {
  setAboutOpen(false);
  setProjectsOpen(false);
  setSkillsOpen(false);
  setContactOpen(false);
};

const openPanel = (
  panel: "about" | "projects" | "skills" | "contact"
) => {
  closeAllPanels();

  if (panel === "about") setAboutOpen(true);
  if (panel === "projects") setProjectsOpen(true);
  if (panel === "skills") setSkillsOpen(true);
  if (panel === "contact") setContactOpen(true);
};
  
return (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "100vh",
    }}
  >
    <Canvas camera={{ position: [0, 4.5, 44], fov: 65 }}>
      <color attach="background" args={["#87CEEB"]} />

      
      <fog attach="fog" args={["#87ceeb", 65, 190]} />
      
      <ambientLight intensity={0.65} />

      <hemisphereLight
        args={["#bfe9ff", "#426b35", 1.1]}
      />

      <directionalLight
        position={[35, 60, 25]}
        intensity={2}
        color="#fff5e6"
      />

      <Ground />
      <RaceTrack />
      <StartFinishLine />
      <SafetyBarriers />
      <TrackSponsors />
      <TrackTrees />

      {/* Trackside floodlights */}
      <TrackLight position={[-55, 0, 45]} />
      <TrackLight position={[-55, 0, -30]} />
      <TrackLight position={[55, 0, -35]} />
      <TrackLight position={[55, 0, 40]} />

      {/* Pit garage complex */}
      <group
        position={[0, 0, 55]}
        rotation={[0, Math.PI, 0]}
      >
        <PitBuilding />
        <group position={[0, 0, 7.5]}>
          <PitLane />
        </group>
      </group>

      {/* Spectator grandstand */}
        <group
          position={[0, 0, 8]}
          rotation={[0, Math.PI, 0]}
        >
          <Grandstand />
        </group>
        

      <Checkpoint
        label="ABOUT ME"
        trackPosition={0.15}
        color="#00d4ff"
      />

      <Checkpoint
        label="PROJECTS"
        trackPosition={0.40}
        color="#facc15"
      />

      <Checkpoint
        label="SKILLS"
        trackPosition={0.65}
        color="#a855f7"
      />
      
      <Checkpoint
        label="CONTACT"
        trackPosition={0.85}
        color="#22c55e"
      />


      

      <FormulaCar
        carRef={carRef}
        onSpeedChange={setSpeed}
        onCheckpointNearby={setCheckpointNearby}
       onLapComplete={() => {
  setLap((previous) => {
    if (previous >= 3) {
      setRaceFinished(true);
      return 3;
    }

    return previous + 1;
  });
}}

        restartKey={restartKey}
        isPaused={
          !gameStarted ||
          portfolioOnly ||
          raceFinished ||
          showStartingLights ||
          aboutOpen ||
          projectsOpen ||
          skillsOpen ||
          contactOpen
        }
      />

      <FollowCamera target={carRef} />
    </Canvas>

    
  {!gameStarted && !showStartingLights && (
      <WelcomeScreen
        onStart={() => {
          setPortfolioOnly(false);
          setShowStartingLights(true);
        }}
        onExplore={() => {
          setPortfolioOnly(true);
          setGameStarted(true);
          setProjectsOpen(true);
        }}
      />
    )}



    {projectsOpen && (
  <ProjectsPanel onClose={() => setProjectsOpen(false)} />
)}

    {skillsOpen && (
  <SkillsPanel onClose={() => setSkillsOpen(false)} />
)}

{contactOpen && (
  <ContactPanel onClose={() => setContactOpen(false)} />
)}

    {gameStarted && !portfolioOnly && !showStartingLights &&   (
  <>
    <DrivingControls />
    <RacingHUD speed={speed} lap={lap} raceTime={raceTime} />
  </>
)}


    {aboutOpen && (
  <AboutPanel onClose={() => setAboutOpen(false)} />
)}


{showStartingLights && (
  <StartingLights
    onComplete={() => {
      setShowStartingLights(false);
      setGameStarted(true);
    }}
  />
)}

{raceFinished && !exploringAfterFinish && (
  <RaceResults
    raceTime={raceTime}
    onRestart={() => {
      setLap(1);
      setRaceTime(0);
      setRestartKey((previous) => previous + 1);
      setRaceFinished(false);
      setExploringAfterFinish(false);
    }}
   onExplore={() => {
    setExploringAfterFinish(true);
    setProjectsOpen(true);
  }}
  />
)}


    {gameStarted && (
  <PortfolioNavbar
    onAbout={() => openPanel("about")}
    onProjects={() => openPanel("projects")}
    onSkills={() => openPanel("skills")}
    onContact={() => openPanel("contact")}
    onRace={() => {
  closeAllPanels();

  if (portfolioOnly) {
    setPortfolioOnly(false);
    setLap(1);
    setRaceTime(0);
    setRestartKey((previous) => previous + 1);
    setShowStartingLights(true);
  }
}}
  />
)}

    {gameStarted && !portfolioOnly && !showStartingLights && checkpointNearby && (
  <div
    style={{
      position: "absolute",
      bottom: "110px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(12, 17, 27, 0.9)",
      color: "white",
      padding: "14px 24px",
      borderRadius: "12px",
      border: "1px solid #00d4ff",
      fontFamily: "Arial, sans-serif",
      fontWeight: "bold",
      zIndex: 10,
      pointerEvents: "none",
    }}
  >
    {checkpointNearby === "about"
  ? "Press E to Explore About Me"
  : checkpointNearby === "projects"
    ? "Press E to Explore Projects"
    : checkpointNearby === "skills"
      ? "Press E to Explore Skills"
      : "Press E to Explore Contact"}
  </div>
)}
    
  </div>
);

}
