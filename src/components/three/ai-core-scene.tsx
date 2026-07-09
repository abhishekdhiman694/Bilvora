"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export function AICoreScene({
  interactive = false,
  particleCount = 60,
}: {
  interactive?: boolean;
  particleCount?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (group) {
      group.rotation.y += delta * 0.16;

      if (!interactive) {
        const targetX = state.pointer.y * 0.25;
        const targetZ = state.pointer.x * -0.15;
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, 0.04);
        group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetZ, 0.04);
      }
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.09;
      shellRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={22} color="#4d7dff" />
      <pointLight position={[-3, -2, -3]} intensity={14} color="#8b5cf6" />
      <pointLight position={[0, 3, -2]} intensity={8} color="#c084fc" />

      <group ref={groupRef}>
        <mesh>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#6d5bd0"
            emissive="#4d7dff"
            emissiveIntensity={0.35}
            roughness={0.1}
            metalness={0.4}
            distort={0.42}
            speed={1.6}
          />
        </mesh>

        <mesh ref={shellRef} scale={1.55}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#8fb0ff" wireframe transparent opacity={0.16} />
        </mesh>

        <Sparkles
          count={particleCount}
          scale={3.2}
          size={2.4}
          speed={0.28}
          noise={0.4}
          color="#b79cfb"
        />
      </group>

      {interactive ? (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      ) : null}
    </>
  );
}
