import { ImageResponse } from "next/og";

export const alt = "Credit Expert India: debt consolidation and personal loan options for salaried professionals";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B1F3A", color: "#ffffff", padding: 80 }}>
        <div style={{ fontSize: 34, fontWeight: 700, color: "#9fb8e6" }}>Credit Expert India</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Too many EMIs?</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, color: "#4fd1a1" }}>Let&apos;s make them simpler.</div>
        </div>
        <div style={{ fontSize: 28, color: "#c9d6ee" }}>Debt consolidation, balance transfer and personal loan options</div>
      </div>
    ),
    size
  );
}
