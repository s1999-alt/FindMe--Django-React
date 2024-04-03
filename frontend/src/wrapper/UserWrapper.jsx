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
import UserAccount from '../pages/User/UserAccount'

import Dashboard from '../pages/User/Dashboard'
import BookingTable from '../pages/User/BookingTable'
import BookingDetailPage from '../pages/User/BookingDetailPage'
import Wallet from '../pages/User/Wallet'
import ChatArea from '../components/user/chat/ChatArea'
import ChatPage from '../components/user/chat/ChatPage'
import WalletTransactionList from '../pages/User/WalletTransactions'
import WalletTransactions from '../pages/User/WalletTransactions'

function UserWrapper() {
  const routes = useRoutes([
    {
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
      {path: "/bookingconfirm/:bookingId", element:<UserRouter><BookingConfirm/></UserRouter> },
      {path: "/userChat/:id", element:<ChatPage/>},
      {path: "/success", element: <SuccessPage/>},
      
    ],
  },
  // New ......
    {
    element: (
      <>
      <Navbar/>
      <UserAccount>

        <Outlet/>

      </UserAccount>
        
      <Footer/>
      </>
    ),
    children:[
      {path: "/userAccount/", element: <Dashboard/>},
      {path: "/userAccount/bookings", element: <BookingTable/>},
      {path: "/userAccount/bookings/:id", element: <BookingDetailPage/>},
      {path: "/userAccount/wallet/:id", element: <Wallet/>},
      {path: "/userAccount/wallet/:id/transactions", element: <WalletTransactions/>},
    ],
  },
  {
    element: <PageNotFound/>, path:'*'
  }
])
  return routes
}

export default UserWrapper
