
export default function Grandstand() {
  return (
    <group>
      {/* Concrete base */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[18, 0.8, 9]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      {/* Tiered spectator seating */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          position={[0, 0.9 + i * 0.55, -3.5 + i * 1.3]}
        >
          <boxGeometry args={[17, 0.5, 1.3]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#2563eb" : "#1d4ed8"}
          />
        </mesh>
      ))}

      {/* Low-poly spectators */}
{Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 12 }, (_, seat) => {
    const x = -7.5 + seat * 1.35;
    const y = 1.25 + row * 0.55;
    const z = -3.5 + row * 1.3;

    const shirtColors = [
      "#e10600",
      "#facc15",
      "#22c55e",
      "#38bdf8",
      "#ffffff",
    ];

    return (
      <group key={`${row}-${seat}`} position={[x, y, z]}>
        {/* Shirt */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.35, 0.45, 0.25]} />
          <meshStandardMaterial
            color={shirtColors[(row + seat) % shirtColors.length]}
          />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.58, 0]}>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshStandardMaterial color="#e8b48a" />
        </mesh>
      </group>
    );
  })
)}

      {/* Support columns */}
      {[-8, 0, 8].map((x) => (
        <mesh key={x} position={[x, 2.8, 3.5]}>
          <boxGeometry args={[0.3, 5.6, 0.3]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      ))}

      {/* Grandstand roof */}
      <mesh position={[0, 5.8, 0]}>
        <boxGeometry args={[19, 0.3, 10]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* Red roof trim */}
      <mesh position={[0, 5.65, 5]}>
        <boxGeometry args={[19, 0.2, 0.2]} />
        <meshStandardMaterial color="#e10600" />
      </mesh>
    </group>
  );
}
