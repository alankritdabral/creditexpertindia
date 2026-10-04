import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { cities, connections, getProjectedPosition } from './utils';

export function LoanParticles({ activeCity }: { activeCity: string | null }) {
  const particlesRef = useRef<THREE.Group>(null);
  
  const particleData = useMemo(() => {
    return connections.map(([city1, city2], index) => {
      const c1 = cities.find(c => c.name === city1);
      const c2 = cities.find(c => c.name === city2);
      if (!c1 || !c2) return null;

      const p1 = new THREE.Vector3(...getProjectedPosition(c1.lat, c1.lng));
      const p2 = new THREE.Vector3(...getProjectedPosition(c2.lat, c2.lng));
      const midPoint = p1.clone().lerp(p2, 0.5);
      const distance = p1.distanceTo(p2);
      midPoint.z += distance * 0.5;

      const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
      
      return {
        curve,
        progress: (index % 10) / 10, // Deterministic initial position
        speed: 0.2 + ((index * 7) % 10) * 0.02, // Deterministic speed
        city1,
        city2
      };
    }).filter(Boolean) as { curve: THREE.QuadraticBezierCurve3, progress: number, speed: number, city1: string, city2: string }[];
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    
    particleData.forEach((data, i) => {
      data.progress = (data.progress + delta * data.speed) % 1;
      
      const point = data.curve.getPoint(data.progress);
      const child = particlesRef.current?.children[i] as THREE.Mesh;
      if (child) {
        child.position.copy(point);
        
        // Emphasize particles that are on an active connection
        const isActive = activeCity === data.city1 || activeCity === data.city2;
        if (child.material) {
          (child.material as THREE.MeshBasicMaterial).color.setHex(isActive ? 0x16B364 : 0xffffff);
          const scale = isActive ? 1.5 : 1.0;
          child.scale.set(scale, scale, scale);
        }
      }
    });
  });

  return (
    <group ref={particlesRef}>
      {particleData.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}
