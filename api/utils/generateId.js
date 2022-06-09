
const crypto = require('crypto');

const generateId = () => crypto.randomUUID({});

module.exports = generateId;