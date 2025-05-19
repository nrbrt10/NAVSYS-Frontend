import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginScreen } from './components/login/LoginScreen'

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
