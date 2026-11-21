/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: v("paper"),
        sheet: v("sheet"),
        ink: v("ink"),
        muted: v("muted"),
        rule: v("rule"),
        volt: v("volt"),
        lime: v("lime"),
        limeink: v("limeink"),
      },
      fontFamily: {
        display: ['"Inter Tight"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Source Serif 4"', "Georgia", "Cambria", "serif"],
      },
      maxWidth: { measure: "68ch" },
    },
  },
  plugins: [],
};
