const { Kind } = require("graphql")
const { scalarType } = require("nexus")

const DateScalar = scalarType({
    name: 'Date',
    asNexusMethod: 'date',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(value)
    },
    serialize(value) {
        return value.toISOString()
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value)
        }
        return null
    },
})

module.exports = {
    DateScalar
}