import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register'
import Home from './pages/Home'
import Navbar from './components/navigation/Navbar'
import Login from './pages/Login'
import Authenticator from './pages/Authenticator'
import ActivatePage from './pages/ActivatePage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth/*" element={<Authenticator/>} />
        <Route path="/account-activate" element={<ActivatePage/>} />
      </Routes>
    </Router>
    <ToastContainer />
    </div>
  )
}

export default App
