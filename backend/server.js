const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173'
}))

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

  if (!req.file) {
    return res.status(400).json({ message: 'File not received' })
  }

  res.json({
    message: 'Upload success',
    file: req.file.filename
  })
})

app.listen(5000, () => {
  console.log('Server running on 5000')
})