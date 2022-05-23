const screens = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
}

const MEDIA_QUERIES = {
    isSmall: `only screen and (min-width : ${screens.sm}px)`,
    isMedium: `only screen and (min-width : ${screens.md}px)`,
    isLarge: `only screen and (min-width : ${screens.lg}px)`,
    isXLarge: `only screen and (min-width : ${screens["2xl"]}px))`,
}

module.exports = {
    screens,
    MEDIA_QUERIES
}