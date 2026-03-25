import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Liva Spor Kulübü - Cimnastik & Taekwondo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src="https://livasporkulubu.com/images/logo.png"
          width={200}
          height={200}
          style={{ marginBottom: 30 }}
        />
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: 10,
          }}
        >
          Liva Spor Kulübü
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#2EC4B6",
            fontWeight: 600,
          }}
        >
          Cimnastik & Taekwondo
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.5)",
            marginTop: 15,
          }}
        >
          Başakşehir / İstanbul
        </div>
      </div>
    ),
    { ...size }
  );
}
