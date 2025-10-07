import fs from "node:fs";
import path from "node:path";
import data from "../data/videos.json" assert { type: "json" };
import { fetchYouTubeOEmbed } from "../lib/youtube";

type Video = (typeof data)[number];

async function run() {
  const videos = data as Video[];
  const enriched = [] as Video[];
  for (const video of videos) {
    const oembed = await fetchYouTubeOEmbed(video.youtubeId);
    if (oembed) {
      enriched.push({
        ...video,
        title: oembed.title || video.title,
        channelTitle: oembed.author_name || video.channelTitle,
        thumb: oembed.thumbnail_url || video.thumb
      });
    } else {
      enriched.push({ ...video });
    }
  }
  const targetPath = path.join(process.cwd(), "data", "videos.json");
  fs.writeFileSync(targetPath, JSON.stringify(enriched, null, 2), "utf-8");
  console.log(`Updated ${enriched.length} videos with oEmbed metadata.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
