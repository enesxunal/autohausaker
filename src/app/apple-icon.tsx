import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          border: "4px solid #c9a962",
          borderRadius: 32,
          color: "#c9a962",
          fontSize: 96,
          fontWeight: 700,
          fontFamily: "serif",
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
