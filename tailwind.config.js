module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "1/3": "33.333333%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
