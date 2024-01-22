import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import './Styles/auth.scss'
import Navbar from './components/navigation/Navbar'
import Authenticator from './pages/Authenticator'
import ActivatePage from './pages/ActivatePage';
import PageNotFound from './pages/PageNotFound';
import UserWrapper from './wrapper/userWrapper';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    {/* <Navbar /> */}
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home/>} />
        <Route path="/auth/*" element={<Authenticator/>} /> */}
        
        <Route path="/account-activate" element={<ActivatePage/>} />
        <Route path="*" element={<UserWrapper/>} />
      </Routes>
    </Router>
    <ToastContainer />
    </div>
  )
}

export default App
