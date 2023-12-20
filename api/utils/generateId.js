const { nanoid } = require("nanoid");

const generateId = (length = 6) => nanoid(length);

module.exports = { generateId };
