import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getVideoBySlug } from "../../../../lib/videos";
import { TiltCard } from "../../../../components/TiltCard";
import { VideoHero } from "../../../../components/VideoHero";

interface VideoDetailProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: VideoDetailProps): Promise<Metadata> {
  const data = await getVideoBySlug(params.slug);
  if (!data) return {};
  const { video } = data;
  return {
    title: video.title,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [
        {
          url: video.heroThumb,
          width: 1280,
          height: 720,
          alt: video.title
        }
      ]
    }
  };
}

export default async function VideoDetailPage({ params }: VideoDetailProps) {
  const data = await getVideoBySlug(params.slug);
  if (!data) notFound();
  const { video, related } = data;

  return (
    <div className="container-size space-y-12 py-16">
      <Link href="/videos" className="text-sm text-muted hover:text-primary">
        ← 返回作品列表
      </Link>
      <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
        <article className="space-y-6">
          <VideoHero video={video} />
        </article>
        <aside className="space-y-6 rounded-2xl border border-white/5 bg-card/70 p-6 shadow-e1">
          <h1 className="text-3xl font-semibold leading-tight">{video.title}</h1>
          <p className="text-muted">{video.description}</p>
          <dl className="space-y-2 text-sm text-muted">
            <div className="flex justify-between">
              <dt>發佈時間</dt>
              <dd>{new Date(video.publishedAt).toLocaleString("zh-TW")}</dd>
            </div>
            <div className="flex justify-between">
              <dt>時長</dt>
              <dd>{video.duration}</dd>
            </div>
            <div className="flex justify-between">
              <dt>頻道</dt>
              <dd>{video.channelTitle}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-2 pt-2">
            {video.tags.map((tag) => (
              <span key={tag} className="rounded-pill border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted">
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            className="inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-2 text-sm font-semibold text-white shadow-e2 transition hover:-translate-y-0.5"
          >
            在 YouTube 開啟
          </Link>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">相關作品</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <TiltCard key={item.id} as="a" href={`/videos/${item.slug}`} className="group overflow-hidden">
                <Image
                  src={item.thumb}
                  alt={`${item.title} 縮圖`}
                  width={480}
                  height={360}
                  className="h-40 w-full object-cover transition-transform duration-[var(--slow)] group-hover:scale-105"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{item.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
