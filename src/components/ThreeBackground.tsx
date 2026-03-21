"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, useMemo } from "react";
import * as THREE from "three";

// Generate random points in a sphere
function Starfield({ count = 3000 }) {
  const ref = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);

  // Generate random positions using simple math
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // distribute within a radius
        const r = 2.5 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  // Rotate entire starfield slowly
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <PointMaterial
          transparent
          color={hovered ? "#4f46e5" : "#60a5fa"} 
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto mix-blend-screen opacity-60">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Starfield count={3000} />
      </Canvas>
    </div>
  );
}
