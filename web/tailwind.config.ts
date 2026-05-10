import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Critical-word accent — pure blue. The whole brand language hangs on this.
        marker: {
          DEFAULT: "#0000FF",
          fade: "rgba(0,0,255,0.08)",
        },
        ink: {
          DEFAULT: "#0a0a0a",
          80: "rgba(10,10,10,0.80)",
          60: "rgba(10,10,10,0.60)",
          40: "rgba(10,10,10,0.40)",
          20: "rgba(10,10,10,0.18)",
          10: "rgba(10,10,10,0.08)",
          5:  "rgba(10,10,10,0.04)",
        },
      },
      fontFamily: {
        // Geometric humanist sans — close to BaseSans without licensing it.
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "Arial", "sans-serif"],
        // Pixel-block display headline — gives the basebatches.xyz "batches" vibe.
        block: ["VT323", "ui-monospace", "Menlo", "monospace"],
        mono: ["JetBrains Mono", "ui-monospace", "Menlo", "Consolas", "monospace"],
      },
      letterSpacing: {
        tightish: "-0.025em",
        ultratight: "-0.045em",
      },
    },
  },
  plugins: [],
} satisfies Config;
