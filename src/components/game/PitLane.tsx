
export default function PitLane() {
  return (
    <group position={[0, 0, 0]}>
      {/* Pit lane asphalt */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.015, 0]}
      >
        <planeGeometry args={[22, 8]} />
        <meshStandardMaterial color="#30343b" />
      </mesh>

      {/* Yellow lane boundary */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.025, -3.5]}
      >
        <planeGeometry args={[21, 0.12]} />
        <meshBasicMaterial color="#facc15" />
      </mesh>

      {/* Pit box markings */}
      {[-6, 0, 6].map((x) => (
        <mesh
          key={x}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[x, 0.03, 0]}
        >
          <planeGeometry args={[0.12, 6]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}
