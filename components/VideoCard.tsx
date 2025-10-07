"use client";

import Image from "next/image";
import { useState } from "react";
import { TiltCard } from "./TiltCard";
import clsx from "clsx";
import { VideoLightbox } from "./VideoLightbox";
import type { Video } from "../lib/videos";

interface VideoCardProps {
  video: Video;
  onOpen?: (slug: string) => void;
  layout?: "grid" | "list";
}

export function VideoCard({ video, onOpen, layout = "grid" }: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    onOpen?.(video.slug);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <TiltCard
        role="button"
        aria-label={`${video.title} 影片播放`}
        tabIndex={0}
        onClick={handleOpen}
        className={clsx(
          "group overflow-hidden focus-visible:ring-2 ring-offset-2 ring-offset-bg", 
          layout === "list" ? "flex gap-4 items-center" : "flex flex-col"
        )}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleOpen();
          }
        }}
      >
        <div className="relative w-full overflow-hidden rounded-xl">
          <Image
            src={video.heroThumb}
            alt={`${video.title} 縮圖`}
            width={1280}
            height={720}
            className="h-48 w-full object-cover transition-transform duration-[var(--slow)] group-hover:scale-105"
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-pill bg-black/60 px-3 py-1 text-xs font-semibold text-white">
            <span aria-label="影片時長">{video.duration}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <div className="flex items-center justify-between text-xs text-muted uppercase tracking-widest">
            <time dateTime={video.publishedAt}>{new Date(video.publishedAt).toLocaleDateString("zh-TW")}</time>
            <span>{video.channelTitle}</span>
          </div>
          <h3 className="text-lg font-semibold leading-tight">{video.title}</h3>
          <p className="text-sm text-muted line-clamp-3">{video.description}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-pill border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted transition-all group-hover:bg-primary/10 group-hover:text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
      <VideoLightbox open={open} onClose={handleClose} video={video} />
    </>
  );
}
