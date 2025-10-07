import fs from "node:fs";
import path from "node:path";

const CACHE_PATH = path.join(process.cwd(), ".cache", "oembed.json");

type OEmbed = {
  title: string;
  author_name: string;
  thumbnail_url: string;
  html: string;
};

function ensureCache() {
  if (!fs.existsSync(path.dirname(CACHE_PATH))) {
    fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  }
  if (!fs.existsSync(CACHE_PATH)) {
    fs.writeFileSync(CACHE_PATH, JSON.stringify({}), "utf-8");
  }
}

export async function fetchYouTubeOEmbed(id: string): Promise<OEmbed | null> {
  ensureCache();
  const cacheRaw = fs.readFileSync(CACHE_PATH, "utf-8");
  const cache = JSON.parse(cacheRaw) as Record<string, OEmbed>;
  if (cache[id]) {
    return cache[id];
  }
  try {
    const url = new URL("https://www.youtube.com/oembed");
    url.searchParams.set("url", `https://www.youtube.com/watch?v=${id}`);
    url.searchParams.set("format", "json");
    const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("Failed to fetch oEmbed");
    const data = (await response.json()) as OEmbed;
    cache[id] = data;
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), "utf-8");
    return data;
  } catch (error) {
    console.error("oEmbed fetch error", error);
    return null;
  }
}
