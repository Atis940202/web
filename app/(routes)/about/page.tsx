export default function AboutPage() {
  return (
    <div className="container-size space-y-12 py-20">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">About</p>
        <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-semibold">關於視覺故事工作室</h1>
        <p className="text-muted">
          我們以「影像即體驗」為核心理念，專注於打造具有故事張力與互動性的內容。從前期企劃到後期整合，團隊將影像、聲音與設計語言串連，讓觀眾感受作品的節奏與溫度。
        </p>
      </header>
      <section className="grid gap-10 md:grid-cols-2">
        <article className="space-y-4 rounded-2xl border border-white/5 bg-card/70 p-6 shadow-e1">
          <h2 className="text-2xl font-semibold">專長領域</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li>• 影像導演、攝影指導與剪輯整合</li>
            <li>• 互動展演、跨媒體敘事設計</li>
            <li>• 品牌紀錄片、活動紀實、表演藝術影像</li>
            <li>• 影像與空間裝置整合、沉浸式體驗策劃</li>
          </ul>
        </article>
        <article className="space-y-4 rounded-2xl border border-white/5 bg-card/70 p-6 shadow-e1">
          <h2 className="text-2xl font-semibold">使用工具</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted">
            <li>DaVinci Resolve</li>
            <li>Adobe Premiere Pro</li>
            <li>After Effects</li>
            <li>Cinema 4D</li>
            <li>Unreal Engine</li>
            <li>Blender</li>
            <li>Pro Tools</li>
            <li>TouchDesigner</li>
          </ul>
        </article>
      </section>
      <section className="space-y-4 rounded-2xl border border-white/5 bg-card/70 p-6 shadow-e1">
        <h2 className="text-2xl font-semibold">合作方式</h2>
        <p className="text-sm text-muted">
          我們相信良好的溝通是創作成功的基礎。歡迎透過郵件簡述需求、時程與預算，我們會在三個工作日內回覆並安排諮詢。若需跨國合作，可提供遠端同步會議與雲端檔案協作。
        </p>
        <p className="text-sm text-muted">
          也歡迎與互動設計師、展演策展人或科技藝術家聯繫，共同打造多感官的跨域作品。
        </p>
      </section>
    </div>
  );
}
