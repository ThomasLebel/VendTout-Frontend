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
        lightGrey : "#EDF2F2",
        darkGrey : "#5A6566",
      },
    },
  },
  plugins: [],
} satisfies Config;
