import Link from "next/link";
import { notFound } from "next/navigation";
import { FilterBar } from "../../../components/FilterBar";
import { VideoCard } from "../../../components/VideoCard";
import { allTags, allYears, getVideos, allVideos } from "../../../lib/videos";

interface VideosPageProps {
  searchParams?: Record<string, string | string[]>;
}

function parseNumber(value?: string | string[]) {
  if (!value) return undefined;
  const parsed = Array.isArray(value) ? parseInt(value[0], 10) : parseInt(value, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const page = parseNumber(searchParams?.page) || 1;
  const pageSize = 6;
  const tag = searchParams?.tag;
  const year = searchParams?.year as string | string[] | undefined;
  const q = Array.isArray(searchParams?.q) ? searchParams?.q[0] : searchParams?.q;

  const { videos, totalPages, currentPage, total } = getVideos({
    page,
    pageSize,
    tag: tag ? (Array.isArray(tag) ? tag : [tag]) : undefined,
    year: year ? (Array.isArray(year) ? year.map(Number) : [Number(year)]) : undefined,
    q
  });

  if (currentPage > totalPages && totalPages > 0) {
    notFound();
  }

  const buildPageLink = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (tag) {
      const tags = Array.isArray(tag) ? tag : [tag];
      tags.forEach((value) => params.append("tag", value));
    }
    if (year) {
      const years = Array.isArray(year) ? year : [year];
      years.forEach((value) => params.append("year", String(value)));
    }
    if (q) params.set("q", q);
    params.set("page", String(pageNumber));
    return `?${params.toString()}`;
  };

  return (
    <div className="container-size space-y-10 py-20">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Video Library</p>
        <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-semibold">作品列表</h1>
        <p className="text-muted">以篩選器探索全部 {total} 支作品，支援標籤、年份與關鍵字。</p>
      </header>
      <FilterBar tags={allTags} years={allYears} videos={allVideos} />
      <div className="grid gap-8 md:grid-cols-2">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      <nav className="flex items-center justify-between" aria-label="分頁導覽">
        <Link
          href={buildPageLink(Math.max(1, currentPage - 1))}
          className="rounded-pill border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-primary hover:text-primary"
          aria-disabled={currentPage === 1}
          aria-label="上一頁"
        >
          上一頁
        </Link>
        <p className="text-sm text-muted">
          第 {currentPage} / {totalPages} 頁
        </p>
        <Link
          href={buildPageLink(Math.min(totalPages, currentPage + 1))}
          className="rounded-pill border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-primary hover:text-primary"
          aria-disabled={currentPage === totalPages}
          aria-label="下一頁"
        >
          下一頁
        </Link>
      </nav>
    </div>
  );
}
