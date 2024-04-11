import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './resetPasswordStyles.css'
import { AdminAxios } from '../../../axios_instance/Axios_instance';


const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminAxios.post(`api/v1/admin/password-reset/${uid}/${token}/`, { password });
      toast.success(response.data.message);
      navigate('/admin/')
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="form-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your new password" required />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
























// import axios from 'axios';
// import React, { useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ResetPassword = () => {
//   const { uid, token } = useParams();
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`http://localhost:8000/api/v1/admin/password-reset/${uid}/${token}/`, { password });
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your new password" required />
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   )
// }

// export default ResetPassword
