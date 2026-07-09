import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#030304",
          backgroundImage:
            "radial-gradient(circle at 12% 10%, rgba(77,125,255,0.35), transparent 55%), radial-gradient(circle at 90% 90%, rgba(139,92,246,0.32), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="40" height="40" viewBox="0 0 26 26" fill="none">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4d7dff" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path d="M13 0L26 13L13 26L0 13L13 0Z" fill="url(#g)" />
            <path d="M13 7L19 13L13 19L7 13L13 7Z" fill="#030304" />
          </svg>
          <span style={{ fontSize: 30, color: "#f4f4f6", fontWeight: 600 }}>
            Bilvora Technologies
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: 68,
              color: "#f4f4f6",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            We build technology
          </span>
          <span
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
              backgroundImage: "linear-gradient(100deg, #4d7dff 10%, #8b5cf6 60%, #c084fc 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            from the future.
          </span>
          <span style={{ fontSize: 26, color: "#9d9da8", marginTop: 12 }}>
            AI Voice Agents · AI Automation · Websites · SaaS · Enterprise Software
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
