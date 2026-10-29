
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type FollowCameraProps = {
  target: React.RefObject<THREE.Group | null>;
};

export default function FollowCamera({
  target,
}: FollowCameraProps) {
  const { camera } = useThree();

  const desiredPosition = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const smoothTarget = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!target.current) return;

    const car = target.current;

    // Camera sits behind and above the car
    const offset = new THREE.Vector3(0, 6, 11);
    offset.applyQuaternion(car.quaternion);

    desiredPosition.current
      .copy(car.position)
      .add(offset);

    // Camera looks slightly ahead of the car
    const lookAhead = new THREE.Vector3(0, 0.5,-7);
    lookAhead.applyQuaternion(car.quaternion);

    desiredTarget.current
      .copy(car.position)
      .add(lookAhead);

    // Smooth camera movement
    const smoothing = 1 - Math.exp(-5 * delta);

    camera.position.lerp(
      desiredPosition.current,
      smoothing
    );

    smoothTarget.current.lerp(
      desiredTarget.current,
      smoothing
    );

    camera.lookAt(smoothTarget.current);
    });

  return null;
}
