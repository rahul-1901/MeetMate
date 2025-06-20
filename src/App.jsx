import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Meet from './pages/Meet'
import Login from './pages/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Login></Login>
      </GoogleOAuthProvider>
    )
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} caseSensitive></Route>
          <Route path="/room/:meetcode" element={<Meet />} caseSensitive></Route>
          <Route path="/login" element={<GoogleAuthWrapper/>} caseSensitive></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
