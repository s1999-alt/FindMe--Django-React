import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register'
import Home from './pages/Home'
import Navbar from './components/navigation/Navbar'
import Login from './pages/Login'
import Authenticator from './pages/Authenticator'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth/*" element={<Authenticator/>} />
      </Routes>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
