"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#030304",
          color: "#f4f4f6",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 24,
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 600, margin: 0 }}>
            Something went wrong.
          </h1>
          <p style={{ marginTop: 12, color: "#9d9da8", maxWidth: 420 }}>
            A critical error occurred. Please refresh the page or try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 24,
              padding: "12px 24px",
              borderRadius: 999,
              background: "#f4f4f6",
              color: "#030304",
              border: "none",
              fontSize: "0.925rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
