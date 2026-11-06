import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#06111f",
        foreground: "#e7f2ff",
        primary: "#22d3ee",
      },
    },
  },
  plugins: [forms],
} satisfies Config;
