const { CONSTS } = require('../../utils')
const axios = require('axios')
const FormData = require('form-data')

const BASE_URL = 'https://api.cloudflare.com/client/v4'

const operationUrls = {
    'image.uploadUrl': `${BASE_URL}/accounts/${CONSTS.CLOUDFLARE_IMAGE_ACCOUNT_ID}/images/v2/direct_upload`,
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
        throw new Error(result.data, { cause: error })
    }

    return result.data.result
}

module.exports = {
    getDirectUploadUrl,
}
