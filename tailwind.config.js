/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        rgb: {
          "0%, 100%": { color: "#ff0000", borderColor: "#ff0000" },
          "25%": { color: "#00ff00", borderColor: "#00ff00" },
          "50%": { color: "#0000ff", borderColor: "#0000ff" },
          "75%": { color: "#ffff00", borderColor: "#ffff00" },
        },
         underlineGlow: {
          "0%, 100%": { borderColor: "#ff0000" },  // Red
          "25%": { borderColor: "#00ff00" },       // Green
          "50%": { borderColor: "#0000ff" },       // Blue
          "75%": { borderColor: "#ffff00" },       // Yellow
        },
        glowPulse: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 10px rgba(255,215,0,0.6)" },
          "50%": { transform: "scale(1.08)", boxShadow: "0 0 20px rgba(255,215,0,1)" },
        },
      },
      animation: {
        rgb: "rgb 4s linear infinite",
        underlineGlow: "underlineGlow 4s linear infinite",
        glowPulse: "glowPulse 0.6s ease-in-out",
      },
    },
  },
  plugins: [],
};
