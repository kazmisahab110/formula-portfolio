
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { trackCurve, TRACK_WIDTH } from "./RaceTrack";

type CheckpointProps = {
  label: string;
  trackPosition: number;
  color?: string;
};

export function getCheckpointPosition(
  trackPosition = 0.15
) {
  const point = trackCurve.getPointAt(trackPosition);
  const tangent = trackCurve.getTangentAt(trackPosition);

  const normal = new THREE.Vector3(
    -tangent.z,
    0,
    tangent.x
  ).normalize();

  return point
    .clone()
    .addScaledVector(normal, TRACK_WIDTH / 2 + 3);
}

export default function Checkpoint({
  label,
  trackPosition,
  color = "#00d4ff",
}: CheckpointProps) {
  const position = getCheckpointPosition(trackPosition);

  return (
    <group position={[position.x, 0, position.z]}>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
        />
      </mesh>

      <Billboard
        position={[0, 3.7, 0]}
        follow
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.035}
          outlineColor="black"
        >
          {label}
        </Text>
      </Billboard>

      <mesh
        position={[0, 0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.7, 1, 32]} />
        <meshBasicMaterial
          color={color}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
