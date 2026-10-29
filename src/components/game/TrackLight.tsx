
import { useMemo } from "react";
import * as THREE from "three";
import { trackCurve } from "./RaceTrack";

type TrackLightProps = {
  position: [number, number, number];
};

export default function TrackLight({ position }: TrackLightProps) {
  const rotationY = useMemo(() => {
    const lightPosition = new THREE.Vector3(...position);

    // Find the closest point on the racetrack centerline.
    let closestPoint = trackCurve.getPointAt(0);
    let closestDistance = Infinity;

    for (let i = 0; i <= 500; i++) {
      const point = trackCurve.getPointAt(i / 500);

      const distance =
        (point.x - lightPosition.x) ** 2 +
        (point.z - lightPosition.z) ** 2;

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPoint = point;
      }
    }

    // Floodlight panels face local +Z.
    // Rotate the entire structure toward the racetrack.
    return Math.atan2(
      closestPoint.x - lightPosition.x,
      closestPoint.z - lightPosition.z
    );
  }, [position[0], position[1], position[2]]);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Concrete foundation */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.65, 0.8, 0.5, 8]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      {/* Main lighting pole */}
      <mesh position={[0, 5.5, 0]}>
        <cylinderGeometry args={[0.12, 0.2, 11, 8]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.65}
          roughness={0.35}
        />
      </mesh>

      {/* Horizontal lighting arm */}
      <mesh position={[0, 10.8, 0]}>
        <boxGeometry args={[3.5, 0.2, 0.3]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      {/* Floodlight panels */}
      {[-1.2, 0, 1.2].map((x) => (
        <group key={x} position={[x, 10.5, 0.2]}>
          <mesh>
            <boxGeometry args={[0.9, 0.6, 0.2]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>

          <mesh position={[0, 0, 0.12]}>
            <boxGeometry args={[0.75, 0.45, 0.03]} />
            <meshStandardMaterial
              color="#fff7cc"
              emissive="#fff7cc"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
