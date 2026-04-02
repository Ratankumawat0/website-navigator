const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')

const app = express()

app.use(cors())

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log('API HIT')
  console.log(req.file)

  if (!req.file) {
    return res.status(400).json({ message: 'File not received' })
  }

  res.json({
    message: 'Upload success',
    file: req.file.filename
  })
})

app.listen(5000, () => console.log('Server running on 5000'))