import { NextResponse } from "next/server";
import Fuse from "fuse.js";
import videosData from "../../../data/videos.json" assert { type: "json" };

const fuse = new Fuse(videosData, {
  keys: ["title", "description", "tags"],
  threshold: 0.35
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  if (!q) {
    return NextResponse.json([]);
  }
  const results = fuse.search(q).map((item) => ({
    title: item.item.title,
    slug: item.item.slug,
    description: item.item.description,
    tags: item.item.tags
  }));
  return NextResponse.json(results);
}
