const createGlobalModule = require("../utils/createGlobalModule");

let sessionsStore;

const createSessionStore = () => {
    const session = require("express-session");
    var Store = require('connect-pg-simple')(session);
    console.log("New Sessions Store");
    return new Store({
        createTableIfMissing: true,
        tableName: "user_sessions",

    })
}


sessionsStore = createGlobalModule('sessions-store', createSessionStore);

module.exports = sessionsStore;