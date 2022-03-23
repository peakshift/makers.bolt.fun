const category = require('./category')
const project = require('./project')
const vote = require('./vote')

module.exports = {
    ...category,
    ...project,
    ...vote,
}