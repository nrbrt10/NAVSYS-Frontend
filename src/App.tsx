import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginScreen } from './components/login/LoginScreen'
import { CanvasWrapper } from './components/map/CanvasWrapper'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/components/login" element={<LoginScreen />} />
      </Routes>
    </Router>
    // <div style={{width: '100vw', height: '100vh'}}>
    //   <CanvasWrapper />
    // </div>
  )
}

export default App
