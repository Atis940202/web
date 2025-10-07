"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Video } from "../lib/videos";
import clsx from "clsx";

interface VideoLightboxProps {
  open: boolean;
  onClose: () => void;
  video: Video;
}

export function VideoLightbox({ open, onClose, video }: VideoLightboxProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    if (!containerRef.current) {
      containerRef.current = document.createElement("div");
      document.body.appendChild(containerRef.current);
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "Tab") {
        const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey) {
            if (document.activeElement === first) {
              event.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      if (lastFocused.current) {
        lastFocused.current.focus();
      }
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
        containerRef.current = null;
      }
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
        containerRef.current = null;
      }
    };
  }, []);

  if (!open) return null;

  if (!containerRef.current) {
    containerRef.current = document.createElement("div");
    document.body.appendChild(containerRef.current);
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${video.title} 播放框`}
      className={clsx(
        "fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-6",
        "backdrop-blur"
      )}
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 rounded-pill bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          關閉
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-e3">
          <LiteYouTubeEmbed id={video.youtubeId} title={video.title} />
        </div>
        <div className="mt-6 space-y-2 text-sm text-white/90">
          <h2 className="text-2xl font-semibold text-white">{video.title}</h2>
          <p>{video.description}</p>
          <div className="flex flex-wrap gap-2 pt-2 text-xs uppercase tracking-[0.2em] text-white/70">
            {video.tags.map((tag) => (
              <span key={tag} className="rounded-pill border border-white/20 px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    containerRef.current
  );
}

function LiteYouTubeEmbed({ id, title }: { id: string; title: string }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleClick = () => {
      if (activated.current) return;
      activated.current = true;
      const iframe = document.createElement("iframe");
      iframe.width = "560";
      iframe.height = "315";
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      iframe.title = title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframeRef.current = iframe;
      container.innerHTML = "";
      container.appendChild(iframe);
    };
    container.addEventListener("click", handleClick, { once: true });
    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [id, title]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full cursor-pointer bg-black"
      role="button"
      tabIndex={0}
      aria-label={`${title} 播放`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          containerRef.current?.click();
        }
      }}
    >
      <picture>
        <source srcSet={`https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`} type="image/webp" />
        <img
          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          alt={`${title} 縮圖`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </picture>
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <span className="rounded-full bg-primary/80 p-4 shadow-e2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M8 5.14v13.72L19 12 8 5.14z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
