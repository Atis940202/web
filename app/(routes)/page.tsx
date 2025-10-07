import Link from "next/link";
import { FeaturedCarousel } from "../../components/FeaturedCarousel";
import { featuredVideos, latestVideo } from "../../lib/videos";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="gradient-mask pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" />
        <div className="absolute left-1/3 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/4 rounded-full bg-sky-400/20 blur-[140px]" />
      </div>
      <section className="container-size flex flex-col gap-16 pt-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <p className="text-sm uppercase tracking-[0.45em] text-muted">Video Storyteller</p>
            <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-tight">
              以影像建構情緒，
              <br />
              將故事的節奏掌握在指尖。
            </h1>
            <p className="max-w-xl text-lg text-muted">
              我是視覺故事工作室的主理人，擅長結合互動設計與影像敘事。專注於品牌故事、表演藝術與紀實創作，將畫面與聲音轉化為令人難忘的體驗。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/videos"
                className="inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white shadow-e2 transition-transform duration-[var(--fast)] hover:-translate-y-0.5"
              >
                探索作品
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-pill border border-white/10 px-6 py-3 text-sm text-muted transition-all hover:border-primary hover:text-primary"
              >
                認識我
              </Link>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-2 rounded-pill border border-white/10 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden />
                最近上片：
              </span>
              <time dateTime={latestVideo.publishedAt}>
                {new Date(latestVideo.publishedAt).toLocaleString("zh-TW", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </time>
            </div>
          </div>
          <div className="flex-1">
            <FeaturedCarousel videos={featuredVideos} />
          </div>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              title: "全方位影像服務",
              description: "從企劃、拍攝到後製與動態設計，提供完整的一條龍製作流程。"
            },
            {
              title: "以互動思維入影像",
              description: "擅長將互動體驗融入影片，打造兼具敘事與參與感的內容。"
            },
            {
              title: "合作夥伴",
              description: "與藝文、品牌、新創團隊合作，打造具指標性的視覺作品。"
            }
          ].map((feature) => (
            <div key={feature.title} className="space-y-3 rounded-xl border border-white/5 bg-card/60 p-6 shadow-e1">
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
