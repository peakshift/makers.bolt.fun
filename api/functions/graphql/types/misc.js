const { inputObjectType } = require("nexus");

const ImageInput = inputObjectType({
  name: "ImageInput",
  description:
    "When you want to connect to an already uploaded image, either include the `id` field or the `provider_id` field.",
  definition(t) {
    t.string("id");
    t.string("provider_id");
    t.string("name");
    t.string("url");
  },
});

module.exports = {
  // Types
  ImageInput,

  // Queries
};
