const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', (req, res) => {
  res.send('Backend working')
})

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
  if (!req.file) {
    return res.status(400).json({ message: 'File not received' })
  }

  res.json({
    message: 'Upload success',
    file: req.file.filename,
    url: `http://localhost:5001/uploads/${req.file.filename}`
  })
})

app.get('/api/images', (req, res) => {
  const files = fs.readdirSync('uploads')

  const images = files.map(file => ({
    name: file,
    url: `http://localhost:5001/uploads/${file}`
  }))

  res.json(images)
})

app.delete('/api/delete/:name', (req, res) => {
  const filePath = `uploads/${req.params.name}`

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
    return res.json({ message: 'Deleted successfully' })
  }

  res.status(404).json({ message: 'File not found' })
})

app.listen(5001, () => {
  console.log('Server running on 5001')
})