const serverless = require('serverless-http')
const { createExpressApp } = require('../../modules')
const express = require('express')
const extractKeyFromCookie = require('../../utils/extractKeyFromCookie')
const { getUserByPubKey } = require('../../auth/utils/helperFuncs')
const { getDirectUploadUrl } = require('../../services/imageUpload.service')
const { prisma } = require('../../prisma')

const postUploadImageUrl = async (req, res) => {

    const userPubKey = await extractKeyFromCookie(req.headers.cookie ?? req.headers.Cookie)
    const user = await getUserByPubKey(userPubKey)

    if (!user) return res.status(401).json({ status: 'ERROR', reason: 'Not Authenticated' })

    const { filename } = req.body

    if (!filename) return res.status(422).json({ status: 'ERROR', reason: "The field 'filename' is required`" })

    try {
        const uploadUrl = await getDirectUploadUrl()

        const hostedImage = await prisma.hostedImage.create({
            data: {
                filename,
                url: uploadUrl.uploadURL,
                provider_image_id: uploadUrl.id,
                provider: uploadUrl.provider
            },
        })

        return res.status(200).json({ id: hostedImage.id, uploadURL: uploadUrl.uploadURL })
    } catch (error) {
        res.status(500).send('Unexpected error happened, please try again')
    }
}

let app

if (process.env.LOCAL) {
    app = createExpressApp()
    app.post('/upload-image-url', postUploadImageUrl)
} else {
    const router = express.Router()
    router.post('/upload-image-url', postUploadImageUrl)
    app = createExpressApp(router)
}

const handler = serverless(app)
exports.handler = async (event, context) => {
    return await handler(event, context)
}
