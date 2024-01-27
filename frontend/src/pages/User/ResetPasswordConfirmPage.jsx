import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { resetPasswordConfirm } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../../components/navigation/Spinner'



const ResetPasswordConfirmPage = () => {

  const {uid, token} = useParams() 
  const [formData, setFormData] = useState({
    'new_password':'',
    're_new_password':''
  })

  const {new_password, re_new_password} = formData


  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
  })
    )
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const userData = {
      uid,
      token,
      new_password,
      re_new_password
    }

    dispatch(resetPasswordConfirm(userData))
  }

  useEffect( () => {
    if (isError){
      toast.error(message)
    }
    if (isSuccess){
      navigate("/auth/login")
      toast.success("Your Password was Reset Successfully.")
    }

  },[isError, isSuccess, message, navigate, dispatch])


  return (
  <div className='auth' style={{backgroundColor: '#92C7CF'}}>
    <form className="form">
    <h2 style={{ fontWeight: 500, fontSize: '1.5rem', margin: '20px 0', textAlign: 'center' }}>
          Reset Password
  </h2>
      {isLoading && <Spinner />}

      <div className="flex-column">
        <label>Re-enter password</label>
      </div>
      <div className="inputForm">
        <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
          <g id="Layer_3" data-name="Layer 3">
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
          </g>
        </svg>
        <input type="password" className="input" name='new_password' placeholder="Enter your password" onChange={handleChange} value={new_password} required />
      </div>

      <div className="flex-column">
        <label>Confirm re-password</label>
      </div>
      <div className="inputForm">
        <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
          <g id="Layer_3" data-name="Layer 3">
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
          </g>
        </svg>
        <input type="password" className="input" name='re_new_password' placeholder="confirm password" onChange={handleChange} value={re_new_password} required />
      </div>

      <button className="button-submit" onClick={handleSubmit}>Reset</button>
    </form>
  </div>
  )
}

export default ResetPasswordConfirmPage
