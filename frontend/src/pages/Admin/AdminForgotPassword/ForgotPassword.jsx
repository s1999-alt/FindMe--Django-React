// ForgotPassword.js

import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './forgotPasswordStyles.css'
import { AdminAxios } from '../../../axios_instance/Axios_instance';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminAxios.post('api/v1/admin/reset-password/', { email });
      // axios.post('http://localhost:8000/api/v1/admin/reset-password/', { email });
      toast.success(response.data.message);
      
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="form-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;













// import axios from 'axios';
// import React, { useState } from 'react'
// import { toast } from 'react-toastify';


// const ForgotPassword = () => {

//   const [email, setEmail] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/admin/reset-password/', { email });
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   )
// }

// export default ForgotPassword
