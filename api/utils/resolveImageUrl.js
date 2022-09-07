const { CLOUDFLARE_IMAGE_ACCOUNT_HASH } = require('./consts')

const PROVIDERS = [
    {
        name: 'cloudflare',
        prefixUrl: `https://imagedelivery.net/${CLOUDFLARE_IMAGE_ACCOUNT_HASH}/`,
        variants: [
            {
                default: true,
                name: 'public',
            },
        ],
    },
]

/**
 * resolveImgObjectToUrl
 * @param {object} imgObject
 * @param {string} variant - List to be defined. DEFAULT TO 'public'
 * @returns {string} image url
 */
function resolveImgObjectToUrl(imgObject, variant = null) {
    if (!imgObject) throw new Error('Image not found')

    if (imgObject.provider === 'external') {
        return imgObject.url
    }

    const provider = PROVIDERS.find((p) => p.name === imgObject.provider)

    if (provider) {
        if (provider && provider.name === 'cloudflare') {
            const variantName = variant ?? provider.variants.find((v) => v.default).name
            return provider.prefixUrl + imgObject.provider_image_id + '/' + variantName
        }
    }

    throw new Error('Hosting images provider not supported')
}

module.exports = resolveImgObjectToUrl
