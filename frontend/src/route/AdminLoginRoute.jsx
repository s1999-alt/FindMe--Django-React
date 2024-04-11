import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';
import { UserAxios } from '../axios_instance/Axios_instance';


function AdminLoginRouter({children}) {
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate()
  
  const {user, userInfo} = useSelector((state) => state.auth);
  
  useEffect(()=>{
    fetchisAdmin
    console.log("==================================",userInfo);
  if (user){
    setisAuthenticated(true)
  }
  },[])
  
  
const fetchisAdmin = async () => {
  const token = localStorage.getItem('access');
  
  try {
      await UserAxios.get(`api/v1/admin/user-details/${userInfo.id}`).then((res)=>{
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

  if (!isAuthenticated){
    return children
  }

  else{
    toast.warning('please Logout')
    return navigate('/admin/index')
  }
}

export default AdminLoginRouter
