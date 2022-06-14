const scalars = require('./_scalars')
const category = require('./category')
const project = require('./project')
const vote = require('./vote')
const post = require('./post')
const users = require('./users')
const hackathon = require('./hackathon')
const donation = require('./donation')
const tag = require('./tag')

module.exports = {
    ...tag,
    ...scalars,
    ...category,
    ...project,
    ...vote,
    ...post,
    ...users,
    ...hackathon,
    ...donation,
}