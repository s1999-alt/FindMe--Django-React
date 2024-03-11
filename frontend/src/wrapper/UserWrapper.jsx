import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import Authenticator from '../pages/User/Authenticator'
import Home from '../pages/User/Home'
import Navbar from '../components/navigation/users/Navbar'
import Footer from '../components/user/footer/Footer'
import PageNotFound from '../pages/User/PageNotFound'
import ActivatePage from '../pages/User/ActivatePage'
import ResetPasswordConfirmPage from '../pages/User/ResetPasswordConfirmPage'
import TourDetails from '../pages/User/TourDetails'
import UserRouter from '../route/userRouter'
import BookingConfirm from '../components/user/BookingConfirm/BookingConfirm'
import SuccessPage from '../components/user/BookingSuccess/SuccessPage'

function UserWrapper() {
  const routes = useRoutes([{
    element: (
      <>
      <Navbar/>
      
        <Outlet/>
        
      <Footer/>
      </>
    ),
    children:[
      {path: "/auth/*", element:<Authenticator/>},
      {path: "/", element: <Home/>},
      {path: "/activate/:uid/:token", element: <ActivatePage/>},
      {path: "/password/reset/:uid/:token", element: <ResetPasswordConfirmPage/>},
      {path: "/packages/:id", element: <UserRouter><TourDetails/></UserRouter>},
      {path: "/bookingconfirm/:bookingId", element: <BookingConfirm/>},
      {path: "/success", element: <SuccessPage/>},
      
    ],
  },
  {
    element: <PageNotFound/>, path:'*'
  }
])
  return routes
}

export default UserWrapper
