import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          // Base brand blue
          DEFAULT: "#0052FF",
          50: "#E6EEFF",
          100: "#B8D0FF",
          500: "#0052FF",
          600: "#0046DB",
          900: "#001F66",
        },
        ink: {
          DEFAULT: "#0A0E27",
          muted: "#5B6378",
          light: "#9CA3AF",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
