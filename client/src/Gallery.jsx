import { useEffect, useState } from 'react'

function Gallery() {
  const [images, setImages] = useState([])

  const fetchImages = async () => {
    const res = await fetch('http://localhost:5001/api/images')
    const data = await res.json()
    setImages(data)
  }

  const deleteImage = async (name) => {
    await fetch(`http://localhost:5001/api/delete/${name}`, {
      method: 'DELETE'
    })
    fetchImages()
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div>
      <h3>Gallery</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {images.map((img) => (
          <div key={img.name}>
            <img src={img.url} width="150" />
            <br />
            <button onClick={() => deleteImage(img.name)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery