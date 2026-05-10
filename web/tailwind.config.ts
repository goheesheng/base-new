import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base brand
        base: {
          DEFAULT: "#0052FF",
          50: "#E6EEFF",
          100: "#B8D0FF",
          400: "#3D7BFF",
          500: "#0052FF",
          600: "#0046DB",
          700: "#0038B0",
          900: "#001F66",
        },
        // Accent palette mirrors solana.new's small-ASCII-icon colors
        // but lead with Base blue and a Coinbase-flavored mint.
        mint: { DEFAULT: "#7BFFD4", 500: "#7BFFD4" },
        peach: { DEFAULT: "#FF9E6B" },
        amber: { DEFAULT: "#FFE66D" },
        violet: { DEFAULT: "#A78BFA" },
        rose: { DEFAULT: "#FF6B6B" },
        teal: { DEFAULT: "#4ECDC4" },
        // Surface tones
        ink: {
          DEFAULT: "#ededed",
          muted: "rgba(255,255,255,0.6)",
          dim: "rgba(255,255,255,0.4)",
          subtle: "rgba(255,255,255,0.08)",
          line: "rgba(255,255,255,0.1)",
          card: "rgba(255,255,255,0.04)",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        sans: ["Helvetica", "Arial", "system-ui", "sans-serif"],
        display: ["VT323", "ui-monospace", "Menlo", "monospace"],
      },
      letterSpacing: {
        ultratight: "-0.05em",
      },
      backgroundImage: {
        // Hero aurora — Base-flavored blue + violet + mint, brighter and lower
        // so the heading stays readable against pure black.
        "hero-glow":
          "radial-gradient(70% 50% at 50% 100%, rgba(0,82,255,0.55) 0%, rgba(0,82,255,0) 65%), radial-gradient(40% 40% at 8% 95%, rgba(167,139,250,0.40) 0%, rgba(167,139,250,0) 65%), radial-gradient(40% 40% at 92% 95%, rgba(123,255,212,0.30) 0%, rgba(123,255,212,0) 65%), radial-gradient(60% 30% at 50% 0%, rgba(0,82,255,0.10) 0%, rgba(0,82,255,0) 70%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
