const scalars = require('./_scalars')
const category = require('./category')
const project = require('./project')
const vote = require('./vote')
const post = require('./post')
const users = require('./users')

module.exports = {
    ...scalars,
    ...category,
    ...project,
    ...vote,
    ...post,
    ...users
}