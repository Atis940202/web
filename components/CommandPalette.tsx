"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { featuredVideos, allTags, allVideos } from "../lib/videos";

type CommandItem = {
  label: string;
  href: string;
  keywords: string;
};

const staticCommands: CommandItem[] = [
  { label: "首頁", href: "/", keywords: "首頁" },
  { label: "作品列表", href: "/videos", keywords: "作品" },
  { label: "關於", href: "/about", keywords: "關於" },
  { label: "聯絡", href: "/contact", keywords: "聯絡" }
];

const combinedItems: CommandItem[] = Array.from(
  new Map(
    [
      ...staticCommands,
      ...featuredVideos.map((video) => ({
        label: video.title,
        href: `/videos/${video.slug}`,
        keywords: `${video.title} ${video.tags.join(" ")}`
      })),
      ...allTags.map((tag) => ({
        label: `標籤：${tag}`,
        href: `/videos?tag=${encodeURIComponent(tag)}`,
        keywords: tag
      })),
      ...allVideos.map((video) => ({
        label: `影片：${video.title}`,
        href: `/videos/${video.slug}`,
        keywords: `${video.title} ${video.tags.join(" ")}`
      }))
    ].map((item) => [item.href, item])
  ).values()
);

const fuse = new Fuse(combinedItems, {
  keys: ["label", "keywords"],
  threshold: 0.35
});

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const toggle = () => setOpen((value) => !value);
    const close = () => setOpen(false);
    document.addEventListener("command:toggle", toggle);
    document.addEventListener("command:close", close);
    return () => {
      document.removeEventListener("command:toggle", toggle);
      document.removeEventListener("command:close", close);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const results = useMemo(() => {
    if (!query) return combinedItems;
    return fuse.search(query).map((item) => item.item);
  }, [query]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] bg-black/60 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label="快速指令面板"
      onClick={() => setOpen(false)}
    >
      <div
        className="mx-auto mt-24 w-full max-w-xl rounded-xl border border-white/10 bg-bg/95 p-4 shadow-e3"
        onClick={(event) => event.stopPropagation()}
      >
        <label className="flex items-center gap-3 rounded-pill bg-white/5 px-4 py-3">
          <span className="text-sm text-muted">搜尋</span>
          <input
            autoFocus
            aria-label="快速指令搜尋"
            className="flex-1 bg-transparent text-sm outline-none"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="輸入影片、標籤或頁面"
          />
        </label>
        <div className="mt-4 max-h-80 overflow-y-auto rounded-lg border border-white/5">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-muted">沒有對應項目</p>
          ) : (
            <ul>
              {results.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-muted transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <span>{item.label}</span>
                    <kbd>↵</kbd>
                  </Link>
                  {index < results.length - 1 && <div className="h-px bg-white/5" aria-hidden />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
