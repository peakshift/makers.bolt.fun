const { parseResolveInfo } = require("graphql-parse-resolve-info");


/**
 * includeRelationFields
 * @param {object} infoObject the info object that is passed as the 4th parameter in a graphql resolver
 * @param {string} typeName - the typename of the current object (ie. "Project", "Story")
 * @param {object} fields - a map where the keys are which object to look for on the infoObject, & the values are which relating to include from the prisma query
 * @returns {object} an object that you can spread inside the `include` of a prisma query
 */
function includeRelationFields(infoObject, typeName, fields) {
    const parsedResolveInfo = parseResolveInfo(infoObject)
    const obj = parsedResolveInfo.fieldsByTypeName[typeName];
    if (!obj) return {};
    let res = {};
    for (const [key, relation] of Object.entries(fields)) {
        if (obj[key]) res[relation] = true;
    }

    return res;
}

module.exports = {
    includeRelationFields
}