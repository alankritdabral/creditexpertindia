import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { cities, getProjectedPosition } from './utils';
import { Html } from '@react-three/drei';

export function CityNodes({ activeCity }: { activeCity: string | null }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.children.forEach((child: any, i) => {
        if (child.userData.isRing) {
          const isActive = child.userData.cityName === activeCity;
          const scale = isActive ? 1 + Math.sin(time * 3) * 0.3 : 1 + Math.sin(time * 2 + i) * 0.1;
          child.scale.set(scale, scale, scale);
          
          if (child.material) {
            child.material.opacity = isActive ? 0.8 : 0.3;
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {cities.map((city, i) => {
        const [x, y, z] = getProjectedPosition(city.lat, city.lng);
        const isActive = activeCity === city.name;
        
        return (
          <group key={city.name} position={[x, y, z]}>
            {/* Center dot */}
            <mesh>
              <circleGeometry args={[0.02, 16]} />
              <meshBasicMaterial color={isActive ? "#16B364" : "#35D6C7"} />
            </mesh>
            
            {/* Pulsing ring */}
            <mesh userData={{ isRing: true, cityName: city.name }} position={[0, 0, -0.01]}>
              <ringGeometry args={[0.025, 0.035, 32]} />
              <meshBasicMaterial 
                color={isActive ? "#16B364" : "#5B5CFF"} 
                transparent 
                opacity={0.3} 
                side={THREE.DoubleSide} 
              />
            </mesh>
            
            {/* Soft glow */}
            <mesh position={[0, 0, -0.02]}>
              <circleGeometry args={[0.06, 16]} />
              <meshBasicMaterial color={isActive ? "#16B364" : "#5B5CFF"} transparent opacity={0.15} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
