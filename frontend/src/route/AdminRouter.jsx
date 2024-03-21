import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';


function AdminRouter({children}) {
  const [isAuthenticated, setisAuthenticated] = useState(true)
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate()
  
  const {user, userInfo} = useSelector((state) => state.auth);
  
  useEffect(()=>{
    fetchisAdmin
    console.log("==================================",userInfo);
  if (!user){
    setisAuthenticated(false)
  }
  },[])
  
  
const fetchisAdmin = async () => {
  const token = localStorage.getItem('access');
  
  try {
      await axios.get(`http://127.0.0.1:8000/api/v1/admin/user-details/${userInfo.id}`).then((res)=>{
        if(!res.data.is_superuser){
          navigate('/')
        }
      }).catch((err)=>{
        
      })

      return res.data.is_superuser;

  } catch (error) {
      return false;
  }
};


  if (isAuthenticated){
    return children
  }

  else{
    toast.warning('please Login')
    return navigate('/admin/')
  }
}

export default AdminRouter
