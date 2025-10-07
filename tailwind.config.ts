import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx,css}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        card: "var(--card)",
        primary: "var(--primary)",
        ring: "var(--ring)"
      },
      boxShadow: {
        e1: "var(--e1)",
        e2: "var(--e2)",
        e3: "var(--e3)"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)"
      },
      fontFamily: {
        sans: ["'InterVariable'", "system-ui", "sans-serif"]
      },
      transitionDuration: {
        fast: "var(--fast)",
        base: "var(--base)",
        slow: "var(--slow)"
      },
      transitionTimingFunction: {
        default: "var(--easing)"
      }
    }
  }
};

export default config;
