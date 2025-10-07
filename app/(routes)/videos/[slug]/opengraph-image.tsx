import { ImageResponse } from "next/server";
import { getVideoBySlug } from "../../../../lib/videos";

export const runtime = "edge";

interface Props {
  params: { slug: string };
}

export async function GET({ params }: Props) {
  const data = await getVideoBySlug(params.slug);
  if (!data) {
    return new ImageResponse(
      <div style={{
        fontSize: 64,
        color: "#f8fafc",
        background: "#0f172a",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        視覺故事工作室
      </div>,
      { width: 1200, height: 630 }
    );
  }
  const { video } = data;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          color: "#f8fafc",
          background: "linear-gradient(135deg,#0b1120,#1e3a8a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px"
        }}
      >
        <div style={{ fontSize: 30, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.2em" }}>Video</div>
        <div style={{ marginTop: 16, fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>{video.title}</div>
        <div style={{ marginTop: 24, fontSize: 28, maxWidth: 720, color: "#cbd5f5" }}>{video.description}</div>
        <div style={{ marginTop: 36, display: "flex", gap: 16, flexWrap: "wrap" }}>
          {video.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                backgroundColor: "rgba(56,189,248,0.22)",
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
