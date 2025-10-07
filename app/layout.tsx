import Link from "next/link";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: {
    default: "視覺故事工作室 | Video Portfolio",
    template: "%s | 視覺故事工作室"
  },
  description: "視覺故事工作室 — YouTube 影片作品集，展示互動設計與影像敘事。",
  openGraph: {
    title: "視覺故事工作室",
    description: "YouTube 影片作品集",
    url: "/",
    siteName: "視覺故事工作室",
    locale: "zh_TW",
    type: "website"
  },
  other: {
    "theme-color": "#0b0c10"
  }
};

export const viewport: Viewport = {
  themeColor: "#0b0c10"
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
          >
            跳到主要內容
          </a>
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-40 backdrop-blur bg-bg/80 border-b border-white/5">
              <div className="container-size flex items-center justify-between py-4">
                <Link href="/" className="font-semibold tracking-wide text-lg">
                  視覺故事工作室
                </Link>
                <nav aria-label="主導覽" className="flex items-center gap-6 text-sm">
                  <Link href="/videos" className="hover:text-primary transition-colors">
                    作品
                  </Link>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    關於
                  </Link>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    聯絡
                  </Link>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-pill px-4 py-2 bg-primary/10 text-primary shadow-e1 hover:shadow-e2 transition-all duration-[var(--base)]"
                    data-command-open
                  >
                    快速選單
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted">
                      <kbd>⌘</kbd>
                      <kbd>K</kbd>
                    </span>
                  </button>
                </nav>
              </div>
            </header>
            <main id="main" className="flex-1">
              {children}
            </main>
            <footer className="border-t border-white/5 py-10 mt-16">
              <div className="container-size text-sm text-muted flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} 視覺故事工作室。保留所有權利。</p>
                <div className="flex gap-4">
                  <a
                    className="hover:text-primary transition-colors"
                    href="https://www.youtube.com/channel/UCRx4A7sx6DGcdMNCnAdTN0g"
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube 頻道
                  </a>
                  <a className="hover:text-primary transition-colors" href="mailto:hello@example.com">
                    hello@example.com
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
