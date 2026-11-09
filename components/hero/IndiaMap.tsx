import React, { useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { projection } from './utils';

const extrudeSettings = {
  depth: 0.15,
  bevelEnabled: true,
  bevelSegments: 1,
  steps: 1,
  bevelSize: 0.01,
  bevelThickness: 0.01,
};

import { useFrame } from '@react-three/fiber';

function StateShape({ shape, id, isActive, isHighlighted, isPrimary, splitX, splitY }: { shape: THREE.Shape; id: string; isActive: boolean; isHighlighted: boolean; isPrimary: boolean; splitX: number; splitY: number }) {
  const materialRef = React.useRef<THREE.MeshStandardMaterial>(null);
  const lineMaterialRef = React.useRef<THREE.LineBasicMaterial>(null);

  const anchorPoint = useMemo(() => {
    const pts = shape.getPoints();
    if (pts.length === 0) return [0, 0, 0.2] as [number, number, number];
    const cx = pts.reduce((sum, p) => sum + p.x, 0) / pts.length;
    const cy = pts.reduce((sum, p) => sum + p.y, 0) / pts.length;
    return [cx, cy, 0.2] as [number, number, number];
  }, [shape]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      const targetColor = new THREE.Color(isHighlighted ? "#0066FF" : "#0A2540"); // Brighter blue for fill
      const targetEmissive = new THREE.Color(isHighlighted ? "#0066FF" : "#0A2540"); // Stronger emissive for glow
      materialRef.current.color.lerp(targetColor, delta * 5);
      materialRef.current.emissive.lerp(targetEmissive, delta * 5);
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, isHighlighted ? 0.6 : 0.2, delta * 5);
    }
    if (lineMaterialRef.current) {
      const targetColor = new THREE.Color(isHighlighted ? "#60A5FA" : "#0066FF"); // Bright border
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
          color="#0A2540"
          emissive="#0A2540"
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
          color="#0066FF"
          transparent 
          opacity={0.4} 
        />
      </line>
    </group>
  );
}

export interface StateAnchors {
  anchors: Record<string, [number, number, number]>;
  splitX: number;
  splitY: number;
}

export function IndiaMap({ activeCity, highlightedCity, onAnchorsChange }: { activeCity?: string | null; highlightedCity?: string | null; onAnchorsChange?: (anchors: StateAnchors) => void }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/data/states.json')
      .then(r => r.json())
      .then(setData)
      .catch(e => console.error("Failed to load geojson", e));
  }, []);
  
  const { shapesData, anchors, splitX, splitY } = useMemo(() => {
    if (!data) return { shapesData: [], anchors: {} as Record<string, [number, number, number]>, splitX: 0, splitY: 0 };

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
    const anchors: Record<string, [number, number, number]> = {};
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    Object.entries(shapesByState).forEach(([stateId, shapes]) => {
      // Find the shape with the maximum number of points in its first ring to mark as primary
      let maxPoints = -1;
      let primaryIndex = 0;
      shapes.forEach((s, i) => {
        const pts = s.shape.getPoints();
        for (const p of pts) {
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        }
        if (pts.length > maxPoints) {
          maxPoints = pts.length;
          primaryIndex = i;
        }
      });
      if (shapes[primaryIndex]) {
        shapes[primaryIndex].isPrimary = true;
        const pts = shapes[primaryIndex].shape.getPoints();
        const cx = pts.reduce((sum, p) => sum + p.x, 0) / pts.length;
        const cy = pts.reduce((sum, p) => sum + p.y, 0) / pts.length;
        anchors[stateId] = [cx, cy, 0.2];
      }
      result.push(...shapes);
    });

    return {
      shapesData: result,
      anchors,
      splitX: minX + (maxX - minX) * 0.50,
      splitY: minY + (maxY - minY) * 0.50
    };
  }, [data]);

  useEffect(() => {
    if (onAnchorsChange && Object.keys(anchors).length > 0) {
      onAnchorsChange({ anchors, splitX, splitY });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchors, splitX, splitY]);

  return (
    <group>
      {shapesData.map((data, i) => (
        <StateShape key={i} shape={data.shape} id={data.id} isActive={activeCity === data.id} isHighlighted={highlightedCity === data.id} isPrimary={data.isPrimary} splitX={splitX} splitY={splitY} />
      ))}
    </group>
  );
}
