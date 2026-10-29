
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  getTrackDistance,
  TRACK_WIDTH,
  BARRIER_DISTANCE,
  trackCurve,
} from "./RaceTrack";

import { getCheckpointPosition } from "./Checkpoint";

import { Text } from "@react-three/drei";





function Wheel({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Racing tire */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.55, 0.55, 0.4, 48]} />
        <meshStandardMaterial
          color="#101010"
          roughness={0.95}
        />
      </mesh>

      {/* Left wheel rim */}
      <mesh
        position={[-0.215, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.32, 0.32, 0.025, 48]} />
        <meshStandardMaterial
          color="#777777"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Right wheel rim */}
      <mesh
        position={[0.215, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.32, 0.32, 0.025, 48]} />
        <meshStandardMaterial
          color="#777777"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Red tire sidewall marking */}
      {[-0.23, 0.23].map((x) => (
        <mesh
          key={x}
          position={[x, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <torusGeometry args={[0.43, 0.025, 8, 48]} />
          <meshStandardMaterial color="#e10600" />
        </mesh>
      ))}
    </group>
  );
}







type FormulaCarProps = {
  carRef: React.RefObject<THREE.Group | null>;
  onSpeedChange?: (speed: number) => void;
  onCheckpointNearby?: (checkpoint: string | null) => void;
  onLapComplete?: () => void;
  restartKey: number;
  isPaused?: boolean;
};

export default function FormulaCar({
  carRef,
  onSpeedChange,
  onCheckpointNearby,
  onLapComplete,
  restartKey,
  isPaused = false,
}: FormulaCarProps) {

  const speed = useRef(0);
  const previousTrackProgress = useRef<number | null>(null);
  const lapStage = useRef(0);
  
const keys = useRef({
  forward: false,
  backward: false,
  left: false,
  right: false,
});

// Reset the car when a new race starts
useEffect(() => {
  const car = carRef.current;

  if (!car) return;

  // Return to the starting grid
  car.position.set(0, 0.5, 35);

  const tangent = trackCurve.getTangentAt(0);

  car.rotation.set(
    0,
    Math.atan2(-tangent.x, -tangent.z),
    0
  );

  // Reset driving physics
  speed.current = 0;

  keys.current = {
    forward: false,
    backward: false,
    left: false,
    right: false,
  };

    // Reset lap tracking
  previousTrackProgress.current = null;
  lapStage.current = 0;

  onSpeedChange?.(0);
  onCheckpointNearby?.(null);
}, [restartKey]);



useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();

      if (isPaused) {
    return;
  }

    if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
      event.preventDefault();
    }

    if (key === "w" || key === "arrowup") {
      keys.current.forward = true;
    }

    if (key === "s" || key === "arrowdown") {
      keys.current.backward = true;
    }

    if (key === "a" || key === "arrowleft") {
      keys.current.left = true;
    }

    if (key === "d" || key === "arrowright") {
      keys.current.right = true;
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();

    if (key === "w" || key === "arrowup") {
      keys.current.forward = false;
    }

    if (key === "s" || key === "arrowdown") {
      keys.current.backward = false;
    }

    if (key === "a" || key === "arrowleft") {
      keys.current.left = false;
    }

    if (key === "d" || key === "arrowright") {
      keys.current.right = false;
    }
  };

  const resetKeys = () => {
    keys.current = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("blur", resetKeys);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    window.removeEventListener("blur", resetKeys);
  };
}, [isPaused]);


  

useFrame((_, delta) => {
  if (!carRef.current) return;

  const car = carRef.current;

  if (isPaused) {
    speed.current = 0;

    keys.current.forward = false;
    keys.current.backward = false;
    keys.current.left = false;
    keys.current.right = false;

    onSpeedChange?.(0);
    return;
  }



  const distanceFromTrack = getTrackDistance(car.position);

  const isOnGrass =
  distanceFromTrack > TRACK_WIDTH / 2;
  

  // Driving configuration
  
const acceleration = isOnGrass ? 8 : 12;
const braking = isOnGrass ? 12 : 20;
const friction = isOnGrass ? 10 : 5;
const maxSpeed = isOnGrass ? 10 : 25;
const maxReverseSpeed = isOnGrass ? -4 : -8;
const turnSpeed = isOnGrass ? 0.9 : 1.6;


  // Prevent large jumps between frames
  const dt = Math.min(delta, 0.05);

  // Accelerate forward
  if (keys.current.forward) {
    if (speed.current < 0) {
      speed.current += braking * dt;
    } else {
      speed.current += acceleration * dt;
    }
  }

  // Brake or reverse
  if (keys.current.backward) {
    if (speed.current > 0) {
      speed.current -= braking * dt;
    } else {
      speed.current -= acceleration * dt;
    }
  }

  // Gradual slowdown when no pedal is pressed
  if (!keys.current.forward && !keys.current.backward) {
    if (speed.current > 0) {
      speed.current = Math.max(
        0,
        speed.current - friction * dt
      );
    } else if (speed.current < 0) {
      speed.current = Math.min(
        0,
        speed.current + friction * dt
      );
    }
  }

  
// Extra resistance when driving on grass
if (isOnGrass) {
  const grassDrag = 2 * dt;

  if (speed.current > 0) {
    speed.current = Math.max(
      0,
      speed.current - grassDrag
    );
  } else if (speed.current < 0) {
    speed.current = Math.min(
      0,
      speed.current + grassDrag
    );
  }
}


  

  // Limit maximum speed
  speed.current = THREE.MathUtils.clamp(
    speed.current,
    maxReverseSpeed,
    maxSpeed
  );

  // Stop tiny movements
  if (Math.abs(speed.current) < 0.05) {
    speed.current = 0;
  }

  // Steering becomes stronger as speed increases
  const steeringStrength = Math.min(
    Math.abs(speed.current) / 10,
    1
  );

  if (steeringStrength > 0) {
    const direction = speed.current >= 0 ? 1 : -1;

    if (keys.current.left) {
      car.rotation.y +=
        turnSpeed * steeringStrength * dt * direction;
    }

    if (keys.current.right) {
      car.rotation.y -=
        turnSpeed * steeringStrength * dt * direction;
    }
  }

  
  // Remember the car's position before moving
  const previousPosition = car.position.clone();

  // Move in the direction the car faces
  car.translateZ(-speed.current * dt);

  // Check the new position against the barriers
  const newDistance = getTrackDistance(car.position);

  // Leave a small margin for the car's body
  const safeDistance = BARRIER_DISTANCE - 1.5;

  if (newDistance > safeDistance) {
    // Restore the previous safe position
    car.position.copy(previousPosition);

    // Stop the car on impact
    speed.current = 0;
  }


// LAP TRACKING
let closestTrackIndex = 0;
let closestTrackDistance = Infinity;

const totalSamples = 400;

for (let i = 0; i < totalSamples; i++) {
  const point = trackCurve.getPointAt(i / totalSamples);

  const distance = Math.hypot(
    car.position.x - point.x,
    car.position.z - point.z
  );

  if (distance < closestTrackDistance) {
    closestTrackDistance = distance;
    closestTrackIndex = i;
  }
}

const progress = closestTrackIndex / totalSamples;
const previousProgress = previousTrackProgress.current;

// Pass each quarter of the track in order.
if (lapStage.current === 0 && progress >= 0.25 && progress < 0.5) {
  lapStage.current = 1;
}

if (lapStage.current === 1 && progress >= 0.5 && progress < 0.75) {
  lapStage.current = 2;
}

if (lapStage.current === 2 && progress >= 0.75) {
  lapStage.current = 3;
}

// Detect crossing the start/finish line.
if (
  previousProgress !== null &&
  previousProgress > 0.9 &&
  progress < 0.1 &&
  speed.current > 0 &&
  lapStage.current === 3
) {
  onLapComplete?.();
  lapStage.current = 0;
}

// Save progress for the next frame.
previousTrackProgress.current = progress;


  
const checkpoints = [
  { id: "about", position: 0.15 },
  { id: "projects", position: 0.40 },
  { id: "skills", position: 0.65 },
  { id: "contact", position: 0.85 },
];

let nearbyCheckpoint: string | null = null;
let closestDistance = 12;

for (const checkpoint of checkpoints) {
  const checkpointPosition = getCheckpointPosition(
    checkpoint.position
  );

  const distance = Math.hypot(
    car.position.x - checkpointPosition.x,
    car.position.z - checkpointPosition.z
  );

  if (distance < closestDistance) {
    closestDistance = distance;
    nearbyCheckpoint = checkpoint.id;
  }
}

onCheckpointNearby?.(nearbyCheckpoint);


  // Report the final speed after collision detection
   onSpeedChange?.(speed.current);







});



  return (
    <group
  ref={carRef}
  position={[0, 0.5, 35]}
  rotation={[
    0,
    Math.atan2(
      -trackCurve.getTangentAt(0).x,
      -trackCurve.getTangentAt(0).z
    ),
    0,
  ]}
>
      {/* Main chassis */}
      <mesh>
        <boxGeometry args={[1.8, 0.5, 4]} />
       <meshStandardMaterial
        color="#e10600"
        metalness={0.4}
         roughness={0.25}
        />
      </mesh>

      {/* White racing stripe */}
    <mesh position={[0, 0.265, 0.7]}>
      <boxGeometry args={[0.18, 0.015, 1.2]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.35}
        metalness={0.1}
      />
    </mesh>

      {/* Aerodynamic tapered front nose */}
<mesh
  position={[0, -0.05, -2.45]}
  rotation={[-Math.PI / 2, 0, 0]}
>
  <cylinderGeometry args={[0.18, 0.48, 1.8, 8]} />
  <meshStandardMaterial
    color="#e10600"
    metalness={0.35}
    roughness={0.3}
    flatShading
  />
</mesh>

{/* Left aerodynamic sidepod */}
<mesh position={[-0.8, 0.08, 0.45]} scale={[0.7, 0.45, 1.5]}>
  <sphereGeometry args={[1, 16, 12]} />
  <meshStandardMaterial
    color="#b90500"
    metalness={0.35}
    roughness={0.3}
  />
</mesh>

{/* Right aerodynamic sidepod */}
<mesh position={[0.8, 0.08, 0.45]} scale={[0.7, 0.45, 1.5]}>
  <sphereGeometry args={[1, 16, 12]} />
  <meshStandardMaterial
    color="#b90500"
    metalness={0.35}
    roughness={0.3}
  />
</mesh>

      
{/* Front wheels */}
<Wheel position={[-1.15, -0.05, -1.4]} />
<Wheel position={[1.15, -0.05, -1.4]} />

{/* Rear wheels */}
<Wheel position={[-1.15, -0.05, 1.4]} />
<Wheel position={[1.15, -0.05, 1.4]} />


{/* Front wing */}
<mesh position={[0, -0.2, -3.1]}>
  <boxGeometry args={[3.2, 0.12, 0.6]} />
  <meshStandardMaterial color="#111111" />
</mesh>

{/* Front wing endplates */}
<mesh position={[-1.55, -0.1, -3.1]}>
  <boxGeometry args={[0.1, 0.3, 0.8]} />
  <meshStandardMaterial color="#e10600" />
</mesh>

<mesh position={[1.55, -0.1, -3.1]}>
  <boxGeometry args={[0.1, 0.3, 0.8]} />
  <meshStandardMaterial color="#e10600" />
</mesh>


{/* Rear wing supports */}
<mesh position={[-0.5, 0.45, 1.8]}>
  <boxGeometry args={[0.12, 0.9, 0.12]} />
  <meshStandardMaterial color="#222222" />
</mesh>

<mesh position={[0.5, 0.45, 1.8]}>
  <boxGeometry args={[0.12, 0.9, 0.12]} />
  <meshStandardMaterial color="#222222" />
</mesh>

{/* Main rear wing */}
<mesh position={[0, 0.95, 1.8]}>
  <boxGeometry args={[2.8, 0.08, 0.55]} />
  <meshStandardMaterial
    color="#111111"
    metalness={0.45}
    roughness={0.3}
  />
</mesh>

{/* Racing number on rear wing */}
<group position={[0, 1.035, 1.8]}>
  <Text
    rotation={[-Math.PI / 2, 0, 0]}
    font="/fonts/RussoOne-Regular.woff"
    fontSize={0.42}
    color="#ffffff"
    anchorX="center"
    anchorY="middle"
    letterSpacing={0.01}
  >
    07
  </Text>
</group>

{/* Lower rear wing element */}
<mesh position={[0, 0.72, 1.65]} rotation={[-0.12, 0, 0]}>
  <boxGeometry args={[2.5, 0.07, 0.4]} />
  <meshStandardMaterial
    color="#292929"
    metalness={0.35}
    roughness={0.4}
  />
</mesh>

{/* Rear wing endplates */}
<mesh position={[-1.45, 0.9, 1.8]}>
  <boxGeometry args={[0.12, 0.5, 0.9]} />
  <meshStandardMaterial color="#e10600" />
</mesh>

<mesh position={[1.45, 0.9, 1.8]}>
  <boxGeometry args={[0.12, 0.5, 0.9]} />
  <meshStandardMaterial color="#e10600" />
</mesh>


{/* Rear diffuser */}
<mesh position={[0, -0.28, 2.05]}>
  <boxGeometry args={[1.7, 0.12, 0.7]} />
  <meshStandardMaterial
    color="#151515"
    metalness={0.25}
    roughness={0.5}
  />
</mesh>

{/* Diffuser fins */}
{[-0.65, -0.3, 0.3, 0.65].map((x) => (
  <mesh key={x} position={[x, -0.2, 2.05]}>
    <boxGeometry args={[0.06, 0.25, 0.65]} />
    <meshStandardMaterial color="#111111" />
  </mesh>
))}


{/* Cockpit opening */}
<mesh position={[0, 0.28, -0.1]}>
  <boxGeometry args={[0.9, 0.12, 1.3]} />
  <meshStandardMaterial color="#111111" />
</mesh>

{/* Cockpit side protection */}
<mesh position={[-0.5, 0.35, -0.1]}>
  <boxGeometry args={[0.12, 0.25, 1.4]} />
  <meshStandardMaterial color="#e10600" />
</mesh>

<mesh position={[0.5, 0.35, -0.1]}>
  <boxGeometry args={[0.12, 0.25, 1.4]} />
  <meshStandardMaterial color="#e10600" />
</mesh>


{/* Driver helmet */}
<mesh position={[0, 0.65, 0]}>
  <sphereGeometry args={[0.35, 24, 24]} />
  <meshStandardMaterial color="#ffffff" />
</mesh>

{/* Helmet visor */}
<mesh position={[0, 0.68, -0.28]}>
  <boxGeometry args={[0.48, 0.16, 0.12]} />
  <meshStandardMaterial
    color="#111827"
    metalness={0.4}
    roughness={0.2}
  />
</mesh>


{/* Halo side supports */}
<mesh position={[-0.45, 0.75, 0.1]}>
  <boxGeometry args={[0.1, 0.1, 1.1]} />
  <meshStandardMaterial color="#222222" />
</mesh>

<mesh position={[0.45, 0.75, 0.1]}>
  <boxGeometry args={[0.1, 0.1, 1.1]} />
  <meshStandardMaterial color="#222222" />
</mesh>

{/* Halo front crossbar */}
<mesh position={[0, 0.75, -0.45]}>
  <boxGeometry args={[1, 0.1, 0.12]} />
  <meshStandardMaterial color="#222222" />
</mesh>




    </group>
  );
}
