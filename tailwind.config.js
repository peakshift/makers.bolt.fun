const THEME = require("./src/utils/theme");

module.exports = {
  content: [
    "./src/features/**/*.{html,js,ts,tsx,jsx}",
    "./src/pages/**/*.{html,js,ts,tsx,jsx}",
    "./src/Components/**/*.{html,js,ts,tsx,jsx}",
    "./src/utils/routing/layouts/**/*.{html,js,ts,tsx,jsx}",
    "./src/App.tsx",
    "./src/index.html",
  ],
  theme: {
    extend: {
      colors: THEME.colors,
      boxShadow: {
        xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        sm: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
        DEFAULT:
          "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        md: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        lg: "0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
        xl: " 0px 20px 24px -4px rgba(16, 24, 40, 0.1), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)",
        "2xl": "0px 24px 48px -12px rgba(16, 24, 40, 0.25)",
        "3xl": "0px 32px 64px -12px rgba(16, 24, 40, 0.2)",
        inner: "inset 0 2px 0px 2px rgba(0, 0, 0, 0.06)",
        none: "none",
      },
      fontSize: {
        h1: ["36px", "50px"],
        h2: ["32px", "44px"],
        h3: ["28px", "40px"],
        h4: ["22px", "31px"],
        h5: ["19px", "26px"],
        body1: ["24px", "30px"],
        body2: ["20px", "28px"],
        body3: ["18px", "25px"],
        body4: ["16px", "22px"],
        body5: ["14px", "19px"],
        body6: ["12px", "18px"],
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      fontWeight: {
        light: 400,
        regular: 500,
        bold: 600,
        bolder: 700,
      },

      spacing: {
        4: "4px",
        8: "8px",
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        20: "20px",
        24: "24px",
        32: "32px",
        36: "36px",
        40: "40px",
        42: "42px",
        48: "48px",
        52: "52px",
        64: "64px",
        80: "80px",
      },

      borderRadius: {
        0: "0",
        4: "4px",
        8: "8px",
        10: "10px",
        12: "12px",
        DEFAULT: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        48: "48px",
        full: "50%",
      },
      lineHeight: {
        inherit: "inherit",
        0: "0",
      },
      outline: {
        primary: ["2px solid #7B61FF", "1px"],
      },
      screens: {
        xs: "480px",
        "max-md": { max: THEME.screens.md + "px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
