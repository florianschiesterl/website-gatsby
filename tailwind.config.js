module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontSize: {
      base: "1.7em",
      xl: "10em",
    },
    extend: {
      colors: {
        black: "#090A0B",
      },
      spacing: {
        "1/4": "25%",
        "1/3": "33.333333%",
      },
      rotate: {
        6: "6deg",
        45: "45deg",
        360: "360deg",
      },
      keyframes: {
        fadeout: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "55%": { opacity: 1, transform: "scale(1)" },
          "60%": { opacity: 0, transform: "scale(0)" },
          "100%": { opacity: 0, transform: "scale(0)" },
        },

        fadein: {
          "0%": { opacity: 0, overflow: "hidden" },
          "60%": { opacity: 0, overflow: "hidden" },
          "100%": { opacity: 1, overflow: "visible" },
        },
      },
      animation: {
        fadeout: "fadeout 3000ms ease-out forwards",
        fadein: "fadein 3000ms ease-in forwards",
      },
    },
  },

  variants: {
    extend: {
      rotate: ["group-hover"],
    },
  },
  plugins: [],
};
