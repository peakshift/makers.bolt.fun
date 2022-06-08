
let sessionsStore;

if (!global.sessionsStore) {
    const session = require("express-session");
    var Store = require('connect-pg-simple')(session);
    console.log("New Sessions Store");
    global.sessionsStore = new Store({
        createTableIfMissing: true,
        tableName: "user_sessions",

    });
}
sessionsStore = global.sessionsStore;

module.exports = { sessionsStore };