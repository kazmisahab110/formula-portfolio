
import * as THREE from "three";
import { trackCurve, BARRIER_DISTANCE } from "./RaceTrack";
import SponsorBoard from "./SponsorBoard";

const sponsors = [
  { label: "JAVA", color: "#f97316", t: 0.05 },
  { label: "SPRING BOOT", color: "#22c55e", t: 0.20 },
  { label: "REACT", color: "#38bdf8", t: 0.35 },
  { label: "POSTGRESQL", color: "#60a5fa", t: 0.52 },
  { label: "DOCKER", color: "#2563eb", t: 0.68 },
  { label: "GITHUB", color: "#a78bfa", t: 0.83 },
];

export default function TrackSponsors() {
  return (
    <group>
      {sponsors.map((sponsor) => {
        const point = trackCurve.getPointAt(sponsor.t);
        const tangent = trackCurve.getTangentAt(sponsor.t);

        // Use the opposite side of the track
        const normal = new THREE.Vector3(
        tangent.z,
        0,
        -tangent.x
        ).normalize();

        const position = point.clone().addScaledVector(
        normal,
        BARRIER_DISTANCE + 9
        );

        const rotationY = Math.atan2(
          tangent.x,
          tangent.z
        );

        return (
          <group
            key={sponsor.label}
            position={[position.x, 0, position.z]}
            rotation={[0, rotationY, 0]}
          >
            <SponsorBoard
              label={sponsor.label}
              color={sponsor.color}
            />
          </group>
        );
      })}
    </group>
  );
}
