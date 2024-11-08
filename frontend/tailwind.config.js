/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F4C75",
        "custom-background": "#f5f5f5",
        "custom-primary": "#8abf8a",
        "custom-hover": "#4b7e5f",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px,1fr))",
      },
    },
  },
  plugins: [],
};
