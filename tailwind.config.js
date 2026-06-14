/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.1), 0 16px 40px rgba(7, 12, 20, 0.45)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        appear: {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        appear: "appear 620ms ease-out both",
      },
    },
  },
  plugins: [],
};
