import { geoMercator } from 'd3-geo';
import * as THREE from 'three';

// Map projection centered on India
export const projection = geoMercator()
  .center([80, 22])
  .scale(800)
  .translate([0, 0]);

export function getProjectedPosition(lat: number, lng: number): [number, number, number] {
  const [x, y] = projection([lng, lat]) || [0, 0];
  // Note: in 3D, y is up, so we invert the projected y (which grows downwards in SVG)
  return [x / 100, -y / 100, 0.2]; // Z offset slightly above map surface
}

export const cities = [
  { name: "Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
];

export const connections = [
  ["Delhi", "Mumbai"],
  ["Delhi", "Kolkata"],
  ["Mumbai", "Bengaluru"],
  ["Bengaluru", "Chennai"],
  ["Mumbai", "Hyderabad"],
  ["Pune", "Delhi"],
  ["Ahmedabad", "Mumbai"],
];

export const transactions = [
  { city: "Delhi", amount: "₹8,50,000", time: "2m ago" },
  { city: "Maharashtra", amount: "₹5,20,000", time: "4m ago" },
  { city: "Karnataka", amount: "₹6,40,000", time: "5m ago" },
  { city: "Gujarat", amount: "₹4,80,000", time: "7m ago" },
  { city: "Tamil Nadu", amount: "₹4,10,000", time: "9m ago" },
  { city: "West Bengal", amount: "₹3,75,000", time: "12m ago" },
];
