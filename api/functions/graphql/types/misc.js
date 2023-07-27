const { inputObjectType } = require("nexus");

const ImageInput = inputObjectType({
  name: "ImageInput",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("url");
  },
});

module.exports = {
  // Types
  ImageInput,

  // Queries
};
