export default function ContactPage() {
  return (
    <div className="container-size space-y-10 py-20">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Contact</p>
        <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-semibold">聯絡我們</h1>
        <p className="text-muted">歡迎透過以下方式聯繫，讓我們一起打造下一支動人的作品。</p>
      </header>
      <section className="grid gap-8 md:grid-cols-2">
        <form className="space-y-4 rounded-2xl border border-white/5 bg-card/70 p-6 shadow-e1" aria-label="聯絡表單">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-muted">
              您的名字
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-fg focus:border-primary focus:outline-none"
              placeholder="請輸入姓名"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-muted">
              聯絡 Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-fg focus:border-primary focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm text-muted">
              合作需求與想法
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-fg focus:border-primary focus:outline-none"
              placeholder="簡述專案內容、時程與預算範圍"
            />
          </div>
          <p className="text-xs text-muted">
            此表單為靜態示意，請直接使用下方 Email 或社群連結與我們聯繫。
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white shadow-e2 transition hover:-translate-y-0.5"
          >
            發送 Email
          </a>
        </form>
        <aside className="space-y-6 rounded-2xl border border-white/5 bg-card/70 p-6 shadow-e1">
          <h2 className="text-2xl font-semibold">其他管道</h2>
          <ul className="space-y-3 text-sm text-muted">
            <li>
              <a className="hover:text-primary" href="mailto:hello@example.com">
                hello@example.com
              </a>
            </li>
            <li>
              <a className="hover:text-primary" href="https://www.youtube.com/channel/UCRx4A7sx6DGcdMNCnAdTN0g">
                YouTube 頻道
              </a>
            </li>
          </ul>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-muted">
            <p>工作時間：週一至週五 10:00–18:00 (GMT+8)</p>
            <p className="mt-2">地址：台北市松山區創意街 88 號 5 樓</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
