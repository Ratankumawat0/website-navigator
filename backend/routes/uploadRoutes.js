const express = require('express')
const router = express.Router()

const { uploadFile } = require('../controllers/uploadController')
const singleUpload = require('../middleware/uploadMiddleware')

router.post('/upload', singleUpload, uploadFile)

module.exports = router