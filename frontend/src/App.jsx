import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './Styles/auth.scss'
import UserWrapper from './wrapper/userWrapper';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Router>
      <Routes>
        <Route path="*" element={<UserWrapper/>} />
      </Routes>
    </Router>
    <ToastContainer />
    </div>
  )
}

export default App
