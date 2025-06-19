import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Meet from './pages/Meet'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} caseSensitive></Route>
          <Route path="/room/:meetcode" element={<Meet />} caseSensitive></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
