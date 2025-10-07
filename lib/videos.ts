import { cache } from "react";
import data from "../data/videos.json" assert { type: "json" };

export type Video = {
  id: string;
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
  tags: string[];
  thumb: string;
  heroThumb: string;
  year: number;
  featured: boolean;
};

type GetVideosOptions = {
  page?: number;
  pageSize?: number;
  tag?: string[];
  year?: number[];
  q?: string;
};

function normalize(value?: string | string[]): string[] | undefined {
  if (!value) return undefined;
  return Array.isArray(value) ? value : [value];
}

const videos = (data as Video[]).sort((a, b) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export const allVideos = videos;

export const getVideos = cache(function getVideos({
  page = 1,
  pageSize = 9,
  tag,
  year,
  q
}: GetVideosOptions) {
  const tagFilter = normalize(tag);
  const yearFilter = normalize(year as unknown as string);
  const filtered = videos.filter((video) => {
    const matchesTag = tagFilter
      ? tagFilter.every((t) => video.tags.map((tag) => tag.toLowerCase()).includes(t.toLowerCase()))
      : true;
    const matchesYear = yearFilter ? yearFilter.includes(String(video.year)) : true;
    const matchesQuery = q
      ? `${video.title} ${video.description} ${video.tags.join(" ")}`
          .toLowerCase()
          .includes(q.toLowerCase())
      : true;
    return matchesTag && matchesYear && matchesQuery;
  });
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    videos: filtered.slice(start, end),
    total,
    totalPages,
    currentPage,
    pageSize
  };
});

export const getVideoBySlug = cache(async function getVideoBySlug(slug: string) {
  const video = videos.find((item) => item.slug === slug);
  if (!video) return null;
  const related = videos
    .filter((item) => item.slug !== slug && item.tags.some((tag) => video.tags.includes(tag)))
    .slice(0, 6);
  return { video, related };
});

export const featuredVideos = videos.filter((video) => video.featured);
export const latestVideo = videos[0];
export const allTags = Array.from(new Set(videos.flatMap((video) => video.tags))).sort();
export const allYears = Array.from(new Set(videos.map((video) => video.year))).sort((a, b) => b - a);

export const revalidate = 3600;
