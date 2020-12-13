module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontSize: {
      base: "1.7em",
      lg: "2em",
    },
    extend: {
      screens: {
        xl: "1300px",
      },
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
        fadein: {
          "0%": { opacity: 0, transform: "translateY(1em)" },
          "100%": { opacity: 1, transform: "translateY(0em)" },
        },
      },
      animation: {
        fadein: "fadein 300ms ease-in forwards",
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
