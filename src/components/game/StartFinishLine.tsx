
import { useMemo } from "react";
import * as THREE from "three";
import { trackCurve, TRACK_WIDTH } from "./RaceTrack";

export default function StartFinishLine() {
  const tiles = useMemo(() => {
    const pieces = [];

    // Place the line slightly ahead of the starting car
    const t = 0.025;
    const point = trackCurve.getPointAt(t);
    const tangent = trackCurve.getTangentAt(t);

    const normal = new THREE.Vector3(
      -tangent.z,
      0,
      tangent.x
    ).normalize();

    const columns = 16;
    const rows = 2;
    const tileWidth = TRACK_WIDTH / columns;
    const tileLength = 0.6;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const across =
          -TRACK_WIDTH / 2 + (col + 0.5) * tileWidth;

        const along =
          (row - (rows - 1) / 2) * tileLength;

        const position = point
          .clone()
          .addScaledVector(normal, across)
          .addScaledVector(tangent, along);

        pieces.push({
          key: `${row}-${col}`,
          position: [
            position.x,
            0.035,
            position.z,
          ] as [number, number, number],
          rotation: Math.atan2(
            tangent.x,
            tangent.z
          ),
          color:
            (row + col) % 2 === 0
              ? "#ffffff"
              : "#111111",
        });
      }
    }

    return pieces;
  }, []);

  return (
    <group>
      {tiles.map((tile) => (
        <mesh
          key={tile.key}
          position={tile.position}
          rotation={[-Math.PI / 2, 0, -tile.rotation]}
        >
          <planeGeometry
            args={[TRACK_WIDTH / 16, 0.6]}
          />
          <meshBasicMaterial
            color={tile.color}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
