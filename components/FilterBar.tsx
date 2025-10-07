"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Fuse from "fuse.js";
import type { Video } from "../lib/videos";

interface FilterBarProps {
  tags: string[];
  years: number[];
  videos: Video[];
}

export function FilterBar({ tags, years, videos }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTags = searchParams.getAll("tag");
  const activeYears = searchParams.getAll("year");
  const query = searchParams.get("q") || "";

  const fuse = useMemo(() => {
    return new Fuse(videos, {
      keys: ["title", "description", "tags"],
      threshold: 0.3
    });
  }, [videos]);

  const searchResults = query ? fuse.search(query).map((item) => item.item.slug) : [];

  const toggleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const values = params.getAll(key);
    if (values.includes(value)) {
      const filtered = values.filter((item) => item !== value);
      params.delete(key);
      filtered.forEach((item) => params.append(key, item));
    } else {
      params.append(key, value);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="space-y-4 rounded-xl border border-white/5 bg-card/60 p-6 shadow-e1">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex w-full items-center gap-3 rounded-pill bg-white/5 px-4 py-2 focus-within:ring-2 focus-within:ring-primary">
          <span className="text-sm text-muted">搜尋</span>
          <input
            type="search"
            defaultValue={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="輸入關鍵字或標籤"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            aria-label="搜尋影片"
          />
        </label>
        {query && (
          <p className="text-xs text-muted">
            即時匹配 {searchResults.length || videos.length} 項
          </p>
        )}
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        <fieldset className="flex flex-wrap gap-2" aria-label="標籤篩選">
          {tags.map((tag) => {
            const active = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleParam("tag", tag)}
                className={`rounded-pill px-4 py-2 text-sm transition-all ${
                  active
                    ? "bg-primary/20 text-primary shadow-e2"
                    : "bg-white/5 text-muted hover:bg-white/10"
                }`}
                aria-pressed={active}
              >
                #{tag}
              </button>
            );
          })}
        </fieldset>
        <fieldset className="flex flex-wrap gap-2" aria-label="年份篩選">
          {years.map((year) => {
            const active = activeYears.includes(String(year));
            return (
              <button
                key={year}
                type="button"
                onClick={() => toggleParam("year", String(year))}
                className={`rounded-pill px-4 py-2 text-sm transition-all ${
                  active
                    ? "bg-primary/20 text-primary shadow-e2"
                    : "bg-white/5 text-muted hover:bg-white/10"
                }`}
                aria-pressed={active}
              >
                {year}
              </button>
            );
          })}
        </fieldset>
      </div>
    </section>
  );
}
