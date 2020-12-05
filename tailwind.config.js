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
          "0%": { opacity: 1, transform: "scale(1)" },
          "55%": { opacity: 1, transform: "scale(1)" },
          "60%": { opacity: 0, transform: "scale(0.6)" },
          "100%": { opacity: 0, transform: "scale(0.6)" },
        },

        fadein: {
          "0%": { opacity: 0 },
          "60%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeout: "fadeout 3000ms ease-out forwards",
        fadein: "fadein 3000ms ease-in forwards",
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
