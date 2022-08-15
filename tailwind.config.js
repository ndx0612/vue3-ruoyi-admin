module.exports = {
  important: true,
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    textColor: {
      primary: "#409EFF",
      success: "#67C23A",
      danger: "#f56c6c",
      grey: "#909399",
      default: "#303133",
    },
    screens: {
      1440: "1440px",
      1680: "1680px",
      1920: "1920px",
    },
  },
  plugins: [],
}
