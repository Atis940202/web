# 視覺故事工作室 — Video Portfolio

以 Next.js 14 + App Router 建構的極簡互動個人作品集，聚焦 YouTube 影片展示，內建篩選、指令面板與輕量 Lightbox。

## 技術棧
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS（CSS Token 驅動）
- Framer Motion（支援 prefers-reduced-motion）
- Fuse.js（前端模糊搜尋）
- Prisma + SQLite/Postgres（選用資料庫腳手架）

## 開發
```bash
pnpm install
pnpm dev
```

### 指令
- `pnpm fetch:oembed`：使用 oEmbed 自動補齊影片資訊（快取於 `.cache/oembed.json`）
- `pnpm seed`：將 JSON 資料寫入資料庫（需先設定 `DATABASE_URL` 並執行 `prisma migrate deploy`）
- `pnpm build` / `pnpm start`
- `pnpm typecheck`

## 資料來源
- 靜態 JSON：`data/videos.json`
- `lib/videos.ts` 提供篩選、分頁與相關影片查詢，ISR 週期 3600 秒
- `lib/youtube.ts` 透過 oEmbed 抓取縮圖與標題，快取於 `.cache`

## 部署建議
- **本地**：直接使用 SQLite (`DATABASE_URL="file:./dev.db"`)，執行 `npx prisma migrate dev`、`pnpm seed`
- **Vercel**：
  1. 建立 Postgres（如 Supabase/Neon）並設定 `DATABASE_URL`
  2. 設定 `DATABASE_PROVIDER=postgres`
  3. 於部署前執行 `npx prisma migrate deploy` 與 `pnpm seed`
  4. 若需串接分析，可於 `layout.tsx` 補上 Plausible script（預留位置）

## 無障礙與互動
- Command Palette：`⌘/Ctrl + K`
- TiltCard：滑鼠 spotlight + 鍵盤可操作
- VideoLightbox：Focus Trap、Esc 關閉、youtube-nocookie
- 篩選器：多選 Tag/Year + Fuse 即時搜尋，同步 URL Query
- 符合焦點指示、語義化標籤與淡入降噪動畫

## 動態 Open Graph
- `/app/opengraph-image.tsx`：網站主 OG
- `/app/(routes)/videos/[slug]/opengraph-image.tsx`：單支影片 OG，含標題與標籤

## 後續拓展
- 可於 `scripts/seed.ts` 自訂更多影片與標籤
- 依需求整合 CMS 或自動化抓取影片清單
- 若需追蹤分析，建議導入 [Plausible](https://plausible.io/)（未預設任何追蹤碼）
