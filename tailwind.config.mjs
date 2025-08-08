/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF", // White background
        secondary: "#F9FAFB", // Very light gray for cards/sections
        accent: "#E5E7EB", // Border colors
        "text-primary": "#111827", // Darkest gray for main text
        "text-secondary": "#6B7280", // Lighter gray for secondary text
        "brand-blue": {
          500: "#3B82F6", // Main blue
          600: "#2563EB", // Hover blue
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
