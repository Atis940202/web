"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "../hooks/useReducedMotionSafe";
import type { Video } from "../lib/videos";
import { VideoCard } from "./VideoCard";

interface FeaturedCarouselProps {
  videos: Video[];
}

export function FeaturedCarousel({ videos }: FeaturedCarouselProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotionSafe();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setIndex((value) => (value + 1) % videos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [videos.length, prefersReducedMotion]);

  const current = videos[index];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -32 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: [0.2, 0.6, 0.2, 1] }}
        >
          <VideoCard video={current} />
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex items-center justify-center gap-3">
        {videos.map((video, idx) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setIndex(idx)}
            className={`h-2.5 w-8 rounded-pill transition-all ${
              idx === index ? "bg-primary" : "bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`切換到 ${video.title}`}
          />
        ))}
      </div>
    </div>
  );
}
