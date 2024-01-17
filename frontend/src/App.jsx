import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Register from './pages/Register'
import Home from './pages/Home'
import Navbar from './components/navigation/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
