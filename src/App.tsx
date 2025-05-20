import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage.tsx'
import { MapPage } from './pages/MapPage.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  )
}

export default App
