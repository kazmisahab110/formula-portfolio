
import { useMemo } from "react";
import * as THREE from "three";
import {
  trackCurve,
  BARRIER_DISTANCE,
} from "./RaceTrack";

export default function SafetyBarriers() {
  const barriers = useMemo(() => {
    const segments = 400;
    const wallHeight = 1.3;

    const geometries: THREE.BufferGeometry[] = [];

    for (const side of [-1, 1]) {
      const vertices: number[] = [];
      const indices: number[] = [];

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;

        const point = trackCurve.getPointAt(t);
        const tangent = trackCurve.getTangentAt(t);

        const normal = new THREE.Vector3(
          -tangent.z,
          0,
          tangent.x
        ).normalize();

        const position = point
          .clone()
          .addScaledVector(
            normal,
            side * BARRIER_DISTANCE
          );

        vertices.push(
          position.x, 0, position.z,
          position.x, wallHeight, position.z
        );

        if (i < segments) {
          const a = i * 2;
          const b = a + 1;
          const c = a + 2;
          const d = a + 3;

          indices.push(
            a, b, c,
            b, d, c
          );
        }
      }

      const geometry = new THREE.BufferGeometry();

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          vertices,
          3
        )
      );

      geometry.setIndex(indices);
      geometry.computeVertexNormals();

      geometries.push(geometry);
    }

    return geometries;
  }, []);

  return (
    <group>
      {barriers.map((geometry, index) => (
        <mesh key={index} geometry={geometry}>
          <meshStandardMaterial
            color="#525963"
            metalness={0.55}
            roughness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
