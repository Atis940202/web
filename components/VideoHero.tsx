"use client";

import { useState } from "react";
import Image from "next/image";
import { VideoLightbox } from "./VideoLightbox";
import type { Video } from "../lib/videos";

interface VideoHeroProps {
  video: Video;
}

export function VideoHero({ video }: VideoHeroProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-e2">
      <button
        type="button"
        className="group absolute inset-0 z-10 flex w-full items-center justify-center"
        onClick={() => setOpen(true)}
        aria-label={`播放 ${video.title}`}
      >
        <span className="rounded-full bg-primary/80 px-6 py-3 text-sm font-semibold text-white shadow-e2 transition group-hover:-translate-y-0.5">
          播放影片
        </span>
      </button>
      <Image
        src={video.heroThumb}
        alt={`${video.title} 縮圖`}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 60vw, 100vw"
        priority
      />
      <VideoLightbox open={open} onClose={() => setOpen(false)} video={video} />
    </div>
  );
}
