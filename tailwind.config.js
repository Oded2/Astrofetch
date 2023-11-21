export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      {
        mytheme: {
          primary: "#6000ff",

          secondary: "#1e40af",

          accent: "#4ade80",

          neutral: "#00160b",

          "base-100": "#1f2937",

          info: "#00d7ff",

          success: "#3a8800",

          warning: "#d57b00",

          error: "#ff0034",
        },
      },
    ],
  },
};
