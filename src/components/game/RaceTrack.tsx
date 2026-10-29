
import { useMemo } from "react";
import * as THREE from "three";

// Centerline of our racing circuit
const trackPoints = [
  new THREE.Vector3(0, 0, 35),
  new THREE.Vector3(-25, 0, 30),
  new THREE.Vector3(-40, 0, 10),
  new THREE.Vector3(-30, 0, -20),
  new THREE.Vector3(-5, 0, -35),
  new THREE.Vector3(25, 0, -25),
  new THREE.Vector3(40, 0, 0),
  new THREE.Vector3(30, 0, 25),
];

export const trackCurve = new THREE.CatmullRomCurve3(
  trackPoints,
  true,
  "catmullrom",
  0.5
);

export const TRACK_WIDTH = 12;

function createTrackGeometry() {
  const segments = 240;
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

    const left = point.clone().addScaledVector(
      normal,
      TRACK_WIDTH / 2
    );

    const right = point.clone().addScaledVector(
      normal,
      -TRACK_WIDTH / 2
    );

    vertices.push(left.x, 0.01, left.z);
    vertices.push(right.x, 0.01, right.z);

    if (i < segments) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;

      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}



function RacingCurbs() {
  const curbs = useMemo(() => {
    const segments = 240;
    const curbWidth = 0.6;
    const curbLength = trackCurve.getLength() / segments;

    const pieces = [];

    for (let i = 0; i < segments; i++) {
      const t = (i + 0.5) / segments;

      const point = trackCurve.getPointAt(t);
      const tangent = trackCurve.getTangentAt(t);

      const normal = new THREE.Vector3(
        -tangent.z,
        0,
        tangent.x
      ).normalize();

      const angle = Math.atan2(tangent.x, tangent.z);

      for (const side of [-1, 1]) {
        const position = point.clone().addScaledVector(
          normal,
          side * (TRACK_WIDTH / 2 + curbWidth / 2)
        );

        pieces.push({
          key: `${i}-${side}`,
          position: [position.x, 0.045, position.z] as [
            number, number, number
          ],
          angle,
          color: i % 2 === 0 ? "#e10600" : "#ffffff",
        });
      }
    }

    return { pieces, curbWidth, curbLength };
  }, []);

  return (
    <group>
      {curbs.pieces.map((curb) => (
        <mesh
          key={curb.key}
          position={curb.position}
          rotation={[0, curb.angle, 0]}
        >
          <boxGeometry
            args={[
              curbs.curbWidth,
              0.06,
              curbs.curbLength * 1.05
            ]}
          />
          <meshStandardMaterial color={curb.color} />
        </mesh>
      ))}
    </group>
  );
}



function GrassRunoff() {
  const geometry = useMemo(() => {
    const segments = 400;
    const runoffWidth = 8;
    const curbWidth = 0.6;

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

        const innerOffset =
          TRACK_WIDTH / 2 + curbWidth;

        const outerOffset =
          innerOffset + runoffWidth;

        const innerPoint = point
          .clone()
          .addScaledVector(normal, side * innerOffset);

        const outerPoint = point
          .clone()
          .addScaledVector(normal, side * outerOffset);

        vertices.push(
          innerPoint.x, 0.012, innerPoint.z,
          outerPoint.x, 0.012, outerPoint.z
        );

        if (i < segments) {
          const a = i * 2;
          const b = a + 1;
          const c = a + 2;
          const d = a + 3;

          if (side === 1) {
            indices.push(a, b, c, b, d, c);
          } else {
            indices.push(a, c, b, b, c, d);
          }
        }
      }

      const geo = new THREE.BufferGeometry();

      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      geo.setIndex(indices);
      geo.computeVertexNormals();

      geometries.push(geo);
    }

    return geometries;
  }, []);

  return (
    <group>
      {geometry.map((geo, index) => (
        <mesh key={index} geometry={geo}>
          <meshStandardMaterial
            color="#5caa4d"
            side={THREE.DoubleSide}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  );
}




export default function RaceTrack() {
  const geometry = useMemo(
    () => createTrackGeometry(),
    []
  );

  
return (
  <group>
    <GrassRunoff />

    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#242424"
        side={THREE.DoubleSide}
        roughness={0.95}
      />
    </mesh>

    <RacingCurbs />
  </group>
);

}


export const RUNOFF_WIDTH = 8;
export const CURB_WIDTH = 0.6;

export const BARRIER_DISTANCE =
  TRACK_WIDTH / 2 + CURB_WIDTH + RUNOFF_WIDTH + 0.5;

const TRACK_SAMPLES = 600;

const centerlineSamples = Array.from(
  { length: TRACK_SAMPLES },
  (_, i) => trackCurve.getPointAt(i / TRACK_SAMPLES)
);

export function getTrackDistance(
  position: THREE.Vector3
): number {
  let minDistanceSquared = Infinity;

  for (const point of centerlineSamples) {
    const dx = position.x - point.x;
    const dz = position.z - point.z;

    const distanceSquared = dx * dx + dz * dz;

    if (distanceSquared < minDistanceSquared) {
      minDistanceSquared = distanceSquared;
    }
  }

  return Math.sqrt(minDistanceSquared);
}

