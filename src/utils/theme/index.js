
const { colors } = require('./colors')
const { MEDIA_QUERIES, screens } = require('./media_queries');



const THEME = {
    colors,
    screens,
    MEDIA_QUERIES,
    injectStyles
}


// Inject variables in css
function injectStyles() {
    // let root = document.documentElement;
    // for (const [screen, value] of Object.entries(screens)) {
    //     console.log(`--screen-${screen}`, value + 'px');
    //     root.style.setProperty(`--screen-${screen}`, value + 'px')
    // }
}

module.exports = THEME
