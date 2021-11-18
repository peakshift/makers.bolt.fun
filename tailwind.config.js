module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{html,js,ts,tsx,jsx}",
    "./src/Components/**/*.{html,js,ts,tsx,jsx}",
    "./src/layouts/**/*.{html,js,ts,tsx,jsx}",
    "./src/index.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#E4E7EC",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
        },
        primary: {
          25: "#FAF8FF",
          50: "#F5F2FF",
          100: "#E6DFFF",
          200: "#B3A0FF",
          300: "#B3A0FF",
          400: "#9E88FF",
          500: "#7B61FF",
          600: "#5C46DB",
          700: "#4230B7",
          800: "#2C1E93",
          900: "#1C127A",
        },
        sucess: {
          300: "#6CE9A6",
          400: "#32D583",
          500: "#12B76A",
          600: "#039855",
          700: "#027A48",
        },

        // Custom Colors
        thunder: "#ffd400",
        fire: "#ff6a00",
      },
      fontSize: {
        h1: ["36px", "30px"],
        h2: ["28px", "30px"],
        h3: ["24px", "30px"],
        h4: ["21px", "30px"],
        h5: ["18px", "30px"],
        body1: ["24px", "20px"],
        body2: ["21px", "20px"],
        body3: ["18px", "20px"],
        body4: ["16px", "20px"],
        body5: ["14px", "20px"],
        body6: ["12px", "20px"],
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
        8: "8px",
        10: "10px",
        12: "12px",
        DEFAULT: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        full: "50%",
      },
      outline: {
        primary: ["2px solid #7B61FF", "1px"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
