import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#030304",
          borderRadius: 8,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="t" x1="16" y1="3" x2="16" y2="15" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="l" x1="5" y1="10" x2="15" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="r" x1="17" y1="12" x2="27" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
          </defs>
          <path d="M16 3.6L25.8 9.2L16 14.8L6.2 9.2L16 3.6Z" fill="url(#t)" />
          <path d="M5.4 10.8L15.2 16.4V27.6L5.4 22V10.8Z" fill="url(#l)" />
          <path d="M16.8 16.4L26.6 10.8V22L16.8 27.6V16.4Z" fill="url(#r)" />
          <path d="M16 13L18.6 16L16 19L13.4 16L16 13Z" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
