import colors from "tailwindcss/colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  colors: {
    ...colors,
    black200: "#EAEAEA",
    black300: "#CBCBCB",
    black500: "#807E7E",
    black600: "#605F5F",
    black800: "#2B2B2B",
    black900: "#121212",
    red500: "#DC3545",
    teal600: "#1BA97F",
    yellow400: "#FFCB2F",
    orange50: "#FFEAD8",
    orange500: "#FD7E14",
    homeproductimgbg: "#FFF0F2",
    homeproductimgbuttonsbg: "rgba(255, 255, 255, 0.00))",
    textblue: "#3E3E59",
  },
};
