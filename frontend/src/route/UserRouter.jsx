import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';


function UserRouter({children}) {
  const [isAuthenticated, setisAuthenticated] = useState(true)
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate()
  
  const {user, userInfo} = useSelector((state) => state.auth);
  
  useEffect(()=>{
    
    console.log("==================================",userInfo);
  if (!user){
    setisAuthenticated(false)
  }
  },[])


  if (isAuthenticated){
    return children
  }
  else{
    toast.warning('please Login')
    return navigate('/auth/login')
  }
}

export default UserRouter
