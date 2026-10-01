import React, { useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { AnimatePresence } from 'framer-motion';
import { projection, transactions } from './utils';
import { LoanNotification } from './LoanNotification';

const extrudeSettings = {
  depth: 0.15,
  bevelEnabled: true,
  bevelSegments: 1,
  steps: 1,
  bevelSize: 0.01,
  bevelThickness: 0.01,
};

import { useFrame } from '@react-three/fiber';

function StateShape({ shape, id, isActive, isHighlighted, isPrimary }: { shape: THREE.Shape; id: string; isActive: boolean; isHighlighted: boolean; isPrimary: boolean }) {
  const materialRef = React.useRef<THREE.MeshStandardMaterial>(null);
  const lineMaterialRef = React.useRef<THREE.LineBasicMaterial>(null);

  const centroid = useMemo(() => {
    const pts = shape.getPoints();
    if (pts.length === 0) return [0, 0, 0.2] as [number, number, number];
    const cx = pts.reduce((sum, p) => sum + p.x, 0) / pts.length;
    const cy = pts.reduce((sum, p) => sum + p.y, 0) / pts.length;
    return [cx, cy, 0.2] as [number, number, number];
  }, [shape]);

  const transaction = useMemo(() => transactions.find(t => t.city === id), [id]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      const targetColor = new THREE.Color(isHighlighted ? "#243F91" : "#172A5A");
      const targetEmissive = new THREE.Color(isHighlighted ? "#3157C7" : "#172A5A");
      materialRef.current.color.lerp(targetColor, delta * 5);
      materialRef.current.emissive.lerp(targetEmissive, delta * 5);
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, isHighlighted ? 0.4 : 0.2, delta * 5);
    }
    if (lineMaterialRef.current) {
      const targetColor = new THREE.Color(isHighlighted ? "#6C63FF" : "#3157C7");
      lineMaterialRef.current.color.lerp(targetColor, delta * 5);
      lineMaterialRef.current.opacity = THREE.MathUtils.lerp(lineMaterialRef.current.opacity, isHighlighted ? 0.9 : 0.4, delta * 5);
    }
  });

  return (
    <group>
      <mesh>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#172A5A"
          emissive="#172A5A"
          emissiveIntensity={0.2}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(shape.getPoints().flatMap(p => [p.x, p.y, 0.16])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          ref={lineMaterialRef}
          color="#3157C7"
          transparent 
          opacity={0.4} 
        />
      </line>
      {/* ALWAYS render the Html wrapper if this state has a transaction, to allow AnimatePresence to work */}
      {isPrimary && transaction && (
        <Html position={centroid} center zIndexRange={[100, 0]}>
          <AnimatePresence>
            {isActive && <LoanNotification transaction={transaction} />}
          </AnimatePresence>
        </Html>
      )}
    </group>
  );
}

export function IndiaMap({ activeCity, highlightedCity }: { activeCity?: string | null; highlightedCity?: string | null }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/data/states.json')
      .then(r => r.json())
      .then(setData)
      .catch(e => console.error("Failed to load geojson", e));
  }, []);
  
  const shapesData = useMemo(() => {
    if (!data) return [];

    const shapesByState: Record<string, { id: string; shape: THREE.Shape; isPrimary: boolean }[]> = {};

    const processPolygon = (id: string, rings: number[][][]) => {
      const shape = new THREE.Shape();
      // Outer ring
      for (let i = 0; i < rings[0].length; i++) {
        const [lng, lat] = rings[0][i];
        const projected = projection([lng, lat]);
        if (projected) {
          const px = projected[0] / 100;
          const py = -projected[1] / 100;
          if (i === 0) {
            shape.moveTo(px, py);
          } else {
            shape.lineTo(px, py);
          }
        }
      }
      // Holes
      for (let h = 1; h < rings.length; h++) {
        const hole = new THREE.Path();
        for (let i = 0; i < rings[h].length; i++) {
          const [lng, lat] = rings[h][i];
          const projected = projection([lng, lat]);
          if (projected) {
            const px = projected[0] / 100;
            const py = -projected[1] / 100;
            if (i === 0) hole.moveTo(px, py);
            else hole.lineTo(px, py);
          }
        }
        shape.holes.push(hole);
      }
      
      if (!shapesByState[id]) shapesByState[id] = [];
      shapesByState[id].push({ id, shape, isPrimary: false });
    };

    data.features.forEach((feature: any) => {
      const id = feature.id || "Unknown";
      if (feature.geometry.type === 'Polygon') {
        processPolygon(id, feature.geometry.coordinates);
      } else if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach((rings: number[][][]) => {
          processPolygon(id, rings);
        });
      }
    });

    const result: { id: string; shape: THREE.Shape; isPrimary: boolean }[] = [];
    Object.values(shapesByState).forEach(shapes => {
      // Find the shape with the maximum number of points in its first ring to mark as primary
      let maxPoints = -1;
      let primaryIndex = 0;
      shapes.forEach((s, i) => {
        const pts = s.shape.getPoints();
        if (pts.length > maxPoints) {
          maxPoints = pts.length;
          primaryIndex = i;
        }
      });
      if (shapes[primaryIndex]) {
        shapes[primaryIndex].isPrimary = true;
      }
      result.push(...shapes);
    });

    return result;
  }, [data]);

  return (
    <group>
      {shapesData.map((data, i) => (
        <StateShape key={i} shape={data.shape} id={data.id} isActive={activeCity === data.id} isHighlighted={highlightedCity === data.id} isPrimary={data.isPrimary} />
      ))}
    </group>
  );
}
