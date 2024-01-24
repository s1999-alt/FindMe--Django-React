import React, { useEffect } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import '../Styles/ActivatePage.scss'
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { activate, reset } from '../features/auth/authSlice';
import Spinner from '../components/navigation/Spinner';
import { useNavigate, useParams } from 'react-router-dom';




const ActivatePage = () => {

  const {uid, token} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      uid,
      token
    }
    dispatch(activate(userData))
    toast.success("Your Account has been activated! You can login now")
  };


  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      navigate("/auth/login/")
    }
    dispatch(reset())

  },[isError, isSuccess, navigate, dispatch])


  return (
    <div className="activate-container">
      <div className="activate-content">
        <h1 className="activate-heading">Activate Account <FaUserCheck /></h1>
        {isLoading && <Spinner/>}
        <button className="button-activate" onClick={handleSubmit}>
          Activate
        </button>
      </div>
    </div>
  );
};

export default ActivatePage;