import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import Authenticator from '../pages/User/Authenticator'
import Home from '../pages/User/Home'
import Navbar from '../components/navigation/users/Navbar'
import PageNotFound from '../pages/User/PageNotFound'
import ActivatePage from '../pages/User/ActivatePage'
import ResetPasswordConfirmPage from '../pages/User/ResetPasswordConfirmPage'

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
      {path: "/activate/:uid/:token", element: <ActivatePage/>},
      {path: "/password/reset/:uid/:token", element: <ResetPasswordConfirmPage/>}
    ],
  },
  {
    element: <PageNotFound/>, path:'*'
  }
])
  return routes
}

export default UserWrapper
