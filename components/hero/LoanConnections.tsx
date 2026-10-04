import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cities, connections, getProjectedPosition } from './utils';

export function LoanConnections({ activeCity }: { activeCity: string | null }) {
  const curves = useMemo(() => {
    return connections.map(([city1, city2]) => {
      const c1 = cities.find(c => c.name === city1);
      const c2 = cities.find(c => c.name === city2);
      if (!c1 || !c2) return null;

      const p1 = new THREE.Vector3(...getProjectedPosition(c1.lat, c1.lng));
      const p2 = new THREE.Vector3(...getProjectedPosition(c2.lat, c2.lng));
      
      // Calculate a control point for the curve (raised in Z, slightly offset in X/Y)
      const midPoint = p1.clone().lerp(p2, 0.5);
      const distance = p1.distanceTo(p2);
      midPoint.z += distance * 0.5; // Arc height proportional to distance

      const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      return {
        city1,
        city2,
        geometry,
        curve
      };
    }).filter(Boolean);
  }, []);

  return (
    <group>
      {curves.map((curveInfo, i) => {
        if (!curveInfo) return null;
        const isActive = activeCity === curveInfo.city1 || activeCity === curveInfo.city2;
        
        return (
          <primitive key={i} object={new THREE.Line(
            curveInfo.geometry,
            new THREE.LineBasicMaterial({
              color: isActive ? "#35D6C7" : "#5B5CFF",
              transparent: true,
              opacity: isActive ? 0.6 : 0.2
            })
          )} />
        );
      })}
    </group>
  );
}
