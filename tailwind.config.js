module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "1/3": "33.333333%",
      },
      keyframes: {
        fadeout: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      transitionDelay: {
        5000: "5000ms",
      },
      animation: {
        fadeout: "fadeout 1000ms ease-out forwards",
        fadein: "fadein 1000ms ease-in forwards",
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
