import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        temple: {
          gold: '#D4AF37',
          'gold-light': '#F4E5A1',
          green: '#2D5A3D',
          'green-dark': '#1A3D2B',
          white: '#FFFFFF',
          cream: '#FFF8E7',
          gray: '#F5F5F5',
        },
      },
      fontFamily: {
        sinhala: ['Noto Sans Sinhala', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
