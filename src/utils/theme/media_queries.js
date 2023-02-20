const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const MEDIA_QUERIES = {
  isMinSmall: `only screen and (min-width : ${screens.sm}px)`,
  isMinMedium: `only screen and (min-width : ${screens.md}px)`,
  isMinLarge: `only screen and (min-width : ${screens.lg}px)`,
  isMinXLarge: `only screen and (min-width : ${screens["2xl"]}px))`,
  isMaxSmall: `only screen and (max-width : ${screens.sm}px)`,
  isMaxMedium: `only screen and (max-width : ${screens.md}px)`,
  isMaxLarge: `only screen and (max-width : ${screens.lg}px)`,
  isMaxXLarge: `only screen and (max-width : ${screens["2xl"]}px))`,
};

module.exports = {
  screens,
  MEDIA_QUERIES,
};
