import { Text } from "@react-three/drei";



export default function PitBuilding() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main garage building */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[18, 5, 7]} />
        <meshStandardMaterial color="#252b35" />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 5.2, 0]}>
        <boxGeometry args={[19, 0.4, 8]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* Garage doors */}
      {[-6, 0, 6].map((x) => (
        <mesh key={x} position={[x, 1.7, 3.55]}>
          <boxGeometry args={[5, 3.4, 0.1]} />
          <meshStandardMaterial
            color="#64748b"
            metalness={0.2}
            roughness={0.6}
            emissive="#334155"
            emissiveIntensity={0.25}
            />
        </mesh>
      ))}

      {/* Upper glass windows */}
      {[-6, 0, 6].map((x) => (
        <mesh key={x} position={[x, 4.3, 3.56]}>
          <boxGeometry args={[5, 0.9, 0.08]} />
          <meshStandardMaterial
            color="#60a5fa"
            metalness={0.3}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* Red racing stripe */}
      <mesh position={[0, 3.7, 3.65]}>
        <boxGeometry args={[18, 0.2, 0.1]} />
        <meshStandardMaterial color="#e10600" />
      </mesh>

      {/* Racing team sign */}
        <Text
        position={[0, 4.85, 3.75]}
        fontSize={0.75}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.025}
        outlineColor="#000000"
        >
        FORMULA PORTFOLIO RACING
        </Text>






    </group>
  );
}
