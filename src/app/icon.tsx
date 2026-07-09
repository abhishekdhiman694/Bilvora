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
          borderRadius: 6,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4d7dff" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path d="M13 0L26 13L13 26L0 13L13 0Z" fill="url(#g)" />
          <path d="M13 7L19 13L13 19L7 13L13 7Z" fill="#030304" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
