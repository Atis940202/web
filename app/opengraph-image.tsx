import { ImageResponse } from "next/server";
import { featuredVideos } from "../lib/videos";

export const runtime = "edge";

export async function GET() {
  const video = featuredVideos[0];
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          color: "#f8fafc",
          background: "linear-gradient(135deg,#0f172a,#1e293b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px"
        }}
      >
        <div style={{ fontSize: 28, color: "#38bdf8", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Video Portfolio
        </div>
        <div style={{ marginTop: 24, fontSize: 64, fontWeight: 700 }}>{video.title}</div>
        <div style={{ marginTop: 16, fontSize: 28, maxWidth: 720, color: "#cbd5f5" }}>{video.description}</div>
        <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
          {video.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                backgroundColor: "rgba(56,189,248,0.18)",
                color: "#38bdf8",
                fontSize: 24
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
