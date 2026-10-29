
import Tree from "./Tree";
import { getTrackDistance, BARRIER_DISTANCE } from "./RaceTrack";

const treePositions: [number, number][] = [];

for (let x = -90; x <= 90; x += 15) {
  for (let z = -90; z <= 90; z += 15) {
    const distance = getTrackDistance({ x, y: 0, z } as any);

    if (distance > BARRIER_DISTANCE + 12) {
      treePositions.push([x, z]);
    }
  }
}

export default function TrackTrees() {
  return (
    <group>
      {treePositions.map(([x, z], index) => (
        <group key={index} position={[x, 0, z]}>
            <Tree scale={0.8 + (index % 4) * 0.15} />
        </group>
))}
    </group>
  );
}
