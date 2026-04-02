const upload = require('../config/multerConfig')

const singleUpload = upload.single('file')

module.exports = singleUpload