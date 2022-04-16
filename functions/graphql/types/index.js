const category = require('./category')
const project = require('./project')
const vote = require('./vote')
const post = require('./post')
const users = require('./users')

module.exports = {
    ...category,
    ...project,
    ...vote,
    ...post,
    ...users
}