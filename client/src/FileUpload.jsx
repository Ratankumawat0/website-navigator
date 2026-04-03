import { useState } from 'react'

function FileUpload({ refresh }) {
  const [file, setFile] = useState(null)

  const handleUpload = async () => {
    if (!file) return alert('Select file')

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('http://localhost:5001/api/upload', {
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      alert('Uploaded')
      refresh()
    } else {
      alert('Upload failed')
    }
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default FileUpload