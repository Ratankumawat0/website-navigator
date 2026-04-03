import Gallery from './Gallery'
import FileUpload from './FileUpload'
import { useState } from 'react'

function App() {
  const [reload, setReload] = useState(false)

  const refresh = () => {
    setReload(!reload)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Image Upload App</h2>
      <FileUpload refresh={refresh} />
      <Gallery key={reload} />
    </div>
  )
}

export default App