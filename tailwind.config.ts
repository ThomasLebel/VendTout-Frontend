import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainColor : "#00757F",
        iconGrey : "rgb(90 101 102)",
        lightGray : "#EDF2F2",
        darkGray : "rgb(90 101 102)",
      },
    },
  },
  plugins: [],
} satisfies Config;
