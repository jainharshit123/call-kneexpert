/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-light": "#60a5fa",
        "green-light": "#4ade80",
        "green-medium": "#34d399",
        "green-dark": "#10b981",
        "orange-light": "#fb923c",
        "red-light": "#f87171",
        "purple-light": "#a78bfa",
        "teal-light": "#2dd4bf",
        "grey-light": "#94a3b8",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
