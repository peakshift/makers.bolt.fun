const createGlobalModule = (name, factoryFn) => {
    if (!global[name]) {
        global[name] = factoryFn();
    }
    return global[name];
}

module.exports = createGlobalModule

