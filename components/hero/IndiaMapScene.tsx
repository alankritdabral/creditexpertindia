import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { IndiaMap } from './IndiaMap';
import { CityNodes } from './CityNodes';
import { LoanConnections } from './LoanConnections';
import { LoanParticles } from './LoanParticles';
import { Center } from '@react-three/drei';

function SceneContent({ activeCity, highlightedCity, isReducedMotion }: { activeCity: string | null, highlightedCity: string | null, isReducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock, mouse, camera }) => {
    if (!isReducedMotion && groupRef.current) {
      // Subtle vertical floating
      const time = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.04;
      
      // Mouse interaction (parallax / rotation)
      const targetRotateX = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.05, 0.05);
      const targetRotateY = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.08, 0.05);
      
      groupRef.current.rotation.x = targetRotateX;
      groupRef.current.rotation.y = targetRotateY;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lights */}
      <ambientLight intensity={0.8} color="#f0f5ff" />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, 5, 2]} intensity={0.5} color="#3157C7" />
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#5B5CFF" />
      
      <Center>
        {/* We tilt the map to give an isometric/3D feel */}
        <group rotation={[-Math.PI / 4, 0, 0]} position={[0, 0, 0]}>
          <IndiaMap activeCity={activeCity} highlightedCity={highlightedCity} />
          <CityNodes activeCity={activeCity} />
          {!isReducedMotion && <LoanConnections activeCity={activeCity} />}
          {!isReducedMotion && <LoanParticles activeCity={activeCity} />}
        </group>
      </Center>
    </group>
  );
}

export function IndiaMapScene({ activeCity, highlightedCity, isReducedMotion }: { activeCity: string | null, highlightedCity: string | null, isReducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent activeCity={activeCity} highlightedCity={highlightedCity} isReducedMotion={isReducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
