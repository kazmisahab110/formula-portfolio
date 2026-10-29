
import { Text } from "@react-three/drei";

type SponsorBoardProps = {
  label: string;
  color?: string;
};

export default function SponsorBoard({
  label,
  color = "#e10600",
}: SponsorBoardProps) {
  return (
    <group>
      {/* Support posts */}
      {[-2.8, 2.8].map((x) => (
        <mesh key={x} position={[x, 0.75, 0]}>
          <boxGeometry args={[0.12, 1.5, 0.12]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      ))}

      {/* Main advertisement board */}
      <mesh position={[0, 1.65, 0]}>
        <boxGeometry args={[6, 1.5, 0.2]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>

      {/* Colored top accent */}
      <mesh position={[0, 2.35, 0.12]}>
        <boxGeometry args={[6, 0.12, 0.05]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Front-facing sponsor name */}
      <Text
        position={[0, 1.65, 0.15]}
        fontSize={0.65}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
      >
        {label}
      </Text>

      {/* Back-facing sponsor name */}
      <Text
        position={[0, 1.65, -0.15]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.65}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
      >
        {label}
      </Text>
    </group>
  );
}
