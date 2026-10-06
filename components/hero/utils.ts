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

export const transactions: import('./LoanNotification').Transaction[] = [
  { city: "Tamil Nadu", title: "Home Loan", amount: "₹18,50,000", time: "Just now", status: "Approved", type: "home" },
  { city: "Maharashtra", title: "3 Loans Merged", amount: "₹42,300 → ₹31,850 EMI", time: "2m ago", status: "Consolidated", type: "merge" },
  { city: "Karnataka", title: "EMI Reduced", amount: "₹28,500 → ₹21,200", time: "4m ago", status: "Refinanced", type: "reduce" },
  { city: "Delhi", title: "Credit Card Debt", amount: "₹2,45,000 consolidated", time: "8m ago", status: "Cleared", type: "card" },
  { city: "West Bengal", title: "Interest Rate Reduced", amount: "16.5% → 10.99%", time: "11m ago", status: "Updated", type: "percent" },
  { city: "Gujarat", title: "Loan Transfer", amount: "₹9,50,000", time: "14m ago", status: "Transferred", type: "transfer" },
  { city: "Uttar Pradesh", title: "Overdraft Refinanced", amount: "₹6,80,000", time: "17m ago", status: "Refinanced", type: "bank" },
  { city: "Assam", title: "Interest Saved", amount: "₹3,84,600", time: "22m ago", status: "Saved", type: "save" },
  { city: "Rajasthan", title: "App Loans Combined", amount: "4 loans → 1 EMI", time: "27m ago", status: "Merged", type: "app" },
  { city: "Bihar", title: "Debt Consolidated", amount: "₹11,25,000", time: "32m ago", status: "Approved", type: "merge" },
  { city: "Tamil Nadu", title: "Personal Loan", amount: "₹4,72,800", time: "36m ago", status: "Disbursed", type: "home" },
  { city: "Maharashtra", title: "EMI Reduced", amount: "₹18,750 → ₹13,420", time: "41m ago", status: "Refinanced", type: "reduce" }
];
