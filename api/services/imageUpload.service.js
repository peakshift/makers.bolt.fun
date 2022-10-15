const { CONSTS } = require('../utils')
const axios = require('axios')
const FormData = require('form-data')
const { prisma } = require('../prisma')

const BASE_URL = 'https://api.cloudflare.com/client/v4'

const operationUrls = {
    'image.uploadUrl': `${BASE_URL}/accounts/${CONSTS.CLOUDFLARE_IMAGE_ACCOUNT_ID}/images/v2/direct_upload`,
    'image.delete': `${BASE_URL}/accounts/${CONSTS.CLOUDFLARE_IMAGE_ACCOUNT_ID}/images/v1/`,
}

function getAxiosConfig() {
    return {
        headers: {
            Authorization: `Bearer ${CONSTS.CLOUDFLARE_IMAGE_API_KEY}`,
        },
    }
}

async function getDirectUploadUrl() {
    const url = operationUrls['image.uploadUrl']

    const formData = new FormData()
    formData.append('requireSignedURLs', 'false')

    const config = {
        headers: {
            Authorization: `Bearer ${CONSTS.CLOUDFLARE_IMAGE_API_KEY}`,
            ...formData.getHeaders(),
        },
    }

    const result = await axios.post(url, formData, config)

    if (!result.data.success) {
        throw new Error(result.data, { cause: result.data.errors })
    }

    const data = result.data.result

    return { id: data.id, uploadURL: data.uploadURL, provider: 'cloudflare' }
}

async function deleteImageFromProvider(providerImageId) {
    try {
        const url = operationUrls['image.delete'] + providerImageId
        const result = await axios.delete(url, getAxiosConfig())

        if (!result.data.success) {
            throw new Error(result.data, { cause: result.data.errors })
        }
    } catch (error) {
        throw error
    }
}

async function deleteImage(hostedImageId) {
    if (!hostedImageId) throw new Error("argument 'hostedImageId' must be provider")

    const hostedImage = await prisma.hostedImage.findFirst({
        where: {
            id: hostedImageId,
        },
    })

    if (!hostedImage) throw new Error(`No HostedImage row found for HostedImage.id=${hostedImageId}`)
    if (hostedImage.provider_image_id && hostedImage.provider_image_id === '')
        throw new Error(`Field 'provider_image_id' for HostedImage.id=${hostedImageId} must not be empty. Current value '${hostedImage.provider_image_id}'`)

    // Set is_used to false in case of deletion fail from the hosting image provider. The scheduled job will try to delete the HostedImage row
    await prisma.hostedImage.update({
        where: {
            id: hostedImage.id,
        },
        data: {
            is_used: false,
        },
    })

    if (hostedImage.provider_image_id && hostedImage.provider_image_id !== '') {
        deleteImageFromProvider(hostedImage.provider_image_id)
            .then(async () => {
                await prisma.hostedImage.delete({
                    where: {
                        id: hostedImageId,
                    },
                })
            })
            .catch((error) => console.error(error))
    }
}

async function deleteImages(imagesIds) {
    const hostedImages = await prisma.hostedImage.findMany({
        where: {
            id: {
                in: imagesIds
            }
        },
        select: {
            id: true,
            provider_image_id: true,
        }
    });

    const imagesToDelete = [];
    const imagesFailedDeletion = []

    await Promise.all(hostedImages
        .filter(img => !!img.provider_image_id)
        .map(img => deleteImageFromProvider(img.provider_image_id)
            .then(imagesToDelete.push(img.id))
            .catch(err => {
                console.log(err);
                imagesFailedDeletion.push(img.id)
            })))

    await prisma.hostedImage.deleteMany({
        where: {
            id: {
                in: imagesToDelete
            }
        }
    })

    if (imagesFailedDeletion.length > 0)
        // Will be removed later by the scheduled job
        await prisma.hostedImage.updateMany({
            where: {
                id: {
                    in: imagesFailedDeletion
                }
            },
            data: {
                is_used: false
            }
        })
}

module.exports = {
    getDirectUploadUrl,
    deleteImage,
    deleteImages,
    deleteImageFromProvider,
}
