
type TreeProps = {
  scale?: number;
};

export default function Tree({ scale = 1 }: TreeProps) {
  return (
    <group scale={scale}>
      {/* Tree trunk */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.22, 0.32, 2.4, 8]} />
        <meshStandardMaterial color="#795548" />
      </mesh>

      {/* Lower foliage */}
      <mesh position={[0, 3, 0]}>
        <coneGeometry args={[1.5, 2.5, 8]} />
        <meshStandardMaterial
          color="#166534"
          flatShading
        />
      </mesh>

      {/* Middle foliage */}
      <mesh position={[0, 4, 0]}>
        <coneGeometry args={[1.2, 2.2, 8]} />
        <meshStandardMaterial
          color="#15803d"
          flatShading
        />
      </mesh>

      {/* Upper foliage */}
      <mesh position={[0, 4.9, 0]}>
        <coneGeometry args={[0.85, 1.7, 8]} />
        <meshStandardMaterial
          color="#22c55e"
          flatShading
        />
      </mesh>
    </group>
  );
}
