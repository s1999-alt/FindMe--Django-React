import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './Styles/auth.scss'
import './App.css'
import UserWrapper from './wrapper/UserWrapper';
import AdminWrapper from './wrapper/AdminWrapper';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <GoogleOAuthProvider clientId="35803538916-7ul3bjrjijtkq25i4o3hessska71amdm.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="*" element={<UserWrapper/>} />
          <Route path="/admin/*" element={<AdminWrapper/>} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
    <ToastContainer />
    </div>
  )
}

export default App
