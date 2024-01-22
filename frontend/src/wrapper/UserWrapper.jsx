import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import Authenticator from '../pages/Authenticator'
import Home from '../pages/Home'
import Navbar from '../components/navigation/Navbar'

function UserWrapper() {
  const routes = useRoutes([{
    element: (
      <>
      <Navbar/>
      <Outlet/>
      </>
    ),
    children:[
      {path: "/auth/*", element:<Authenticator/>},
      {path: "/", element: <Home/>}
    ],
  },
  {
    element: <div> not found 404</div>, path:'*'
  }
])
  return routes
}

export default UserWrapper
