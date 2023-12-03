export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      quicksand: ["Quicksand", "system-ui"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        astrofetch: {
          primary: "#6000ff",

          secondary: "#1e40af",

          accent: "#4ade80",

          neutral: "#111827",

          "base-100": "#1f2937",

          info: "#00d7ff",

          success: "#3a8800",

          warning: "#d57b00",

          error: "#b91c1c",
        },
      },
    ],
  },
};
