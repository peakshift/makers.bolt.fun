const { prisma } = require("../prisma");
const { CLOUDFLARE_IMAGE_ACCOUNT_HASH } = require("./consts");

const PROVIDERS = [
  {
    name: "cloudflare",
    prefixUrl: `https://imagedelivery.net/${CLOUDFLARE_IMAGE_ACCOUNT_HASH}/`,
    variants: [
      {
        default: true,
        name: "public",
      },
    ],
  },
];

/**
 * resolveImgObjectToUrl
 * @param {object} imgObject
 * @param {string} variant - List to be defined. DEFAULT TO 'public'
 * @returns {string} image url
 */
function resolveImgObjectToUrl(imgObject, variant = null) {
  if (!imgObject) return null;

  if (imgObject.provider === "external") {
    return imgObject.url;
  }

  return getUrlFromProvider(
    imgObject.provider,
    imgObject.provider_image_id,
    variant
  );
}

function getUrlFromProvider(provider, providerImageId, variant = null) {
  const p = PROVIDERS.find((p) => p.name === provider);

  if (p) {
    if (p && p.name === "cloudflare") {
      const variantName = variant ?? p.variants.find((v) => v.default).name;
      return p.prefixUrl + providerImageId + "/" + variantName;
    }
  }

  throw new Error("Hosting images provider not supported");
}

function findHostedImageById({ id, providerId }) {
  if (id && !Number.isNaN(Number(id)))
    return prisma.hostedImage.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (providerId)
    return prisma.hostedImage.findFirst({
      where: {
        provider_image_id: providerId,
      },
    });
}

module.exports = {
  resolveImgObjectToUrl,
  getUrlFromProvider,
  findHostedImageById,
};
