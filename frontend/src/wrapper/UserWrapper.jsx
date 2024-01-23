import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import Authenticator from '../pages/Authenticator'
import Home from '../pages/Home'
import Navbar from '../components/navigation/Navbar'
import PageNotFound from '../pages/PageNotFound'
import ActivatePage from '../pages/ActivatePage'

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
      {path: "/", element: <Home/>},
      {path: "/activate/:uid/:token", element: <ActivatePage/>}
    ],
  },
  {
    element: <PageNotFound/>, path:'*'
  }
])
  return routes
}

export default UserWrapper
