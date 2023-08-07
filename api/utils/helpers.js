const { parseResolveInfo } = require("graphql-parse-resolve-info");
const { objectType, inputObjectType } = require("nexus");

/**
 * includeRelationFields
 * @param {object} infoObject the info object that is passed as the 4th parameter in a graphql resolver
 * @param {string} typeName - the typename of the current object (ie. "Project", "Story")
 * @param {object} fields - a map where the keys are which object to look for on the infoObject, & the values are which relating to include from the prisma query
 * @returns {object | undefined} an object that you can spread inside the `include` of a prisma query
 */
function includeRelationFields(infoObject, typeName, fields) {
  const parsedResolveInfo = parseResolveInfo(infoObject);
  const obj = parsedResolveInfo.fieldsByTypeName[typeName];
  if (!obj) return undefined;
  let res = {};
  for (const [key, relation] of Object.entries(fields)) {
    if (obj[key]) res[relation] = true;
  }

  if (Object.keys(res).length === 0) return undefined;

  return res;
}

function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Used to handle an issue caused by netlify-env-plugin
const getEnvVarRuntime = (name) => process.env[name];

const createCRUDType = (name, sharedFields) => {
  const Shared = objectType({
    name: name,
    definition(t) {
      t.nonNull.int("id");
      sharedFields(t);
    },
  });

  const CreateInput = inputObjectType({
    name: `Create${name}Input`,
    definition(t) {
      sharedFields(t);
    },
  });

  const UpdateInput = inputObjectType({
    name: `Update${name}Input`,
    definition(t) {
      t.int("id");
      sharedFields(t);
    },
  });

  return {
    Shared,
    CreateInput,
    UpdateInput,
  };
};

module.exports = {
  includeRelationFields,
  toSlug,
  getEnvVarRuntime,
  createCRUDType,
};
