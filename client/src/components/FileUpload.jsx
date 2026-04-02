import { useState } from 'react'

function FileUpload() {
  const [file, setFile] = useState(null)

  const handleUpload = async () => {
    if (!file) {
      alert('Select file first')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      console.log(data)

      if (res.ok) {
        alert('Upload success')
      } else {
        alert(data.message)
      }

    } catch (err) {
      console.log(err)
      alert('Upload failed')
    }
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default FileUpload