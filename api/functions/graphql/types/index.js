const scalars = require('./_scalars')
const misc = require('./misc')
const category = require('./category')
const project = require('./project')
const vote = require('./vote')
const post = require('./post')
const users = require('./users')
const hackathon = require('./hackathon')
const tournament = require('./tournament')
const donation = require('./donation')
const tag = require('./tag')

module.exports = {
    ...misc,
    ...tag,
    ...scalars,
    ...category,
    ...project,
    ...vote,
    ...post,
    ...users,
    ...hackathon,
    ...tournament,
    ...donation,
}