import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom';
import AdminLogin from '../pages/Admin/AdminLogin';
import ThemeProvider from '../pages/Admin/MIUI/ThemeWagon';
import DashboardLayout from '../pages/Admin/AdminIndex';
import UserPage from '../pages/Admin/user'
import AppPage from '../pages/Admin/App'
import LoginPage from '../pages/Admin/login';
import ProductsPage from '../pages/Admin/products';
import AddPackageForm from '../pages/Admin/Section/products/view/AddPackageForm';
import PackageList from '../pages/Admin/Section/products/view/PackageList';
import EditPackageForm from '../pages/Admin/Section/products/view/EditPackageForm';
import AddCategoryForm from '../pages/Admin/Section/Categories/AddCategoryForm';
import CategoryList from '../pages/Admin/Section/Categories/CategoryList';
import EditCategoryForm from '../pages/Admin/Section/Categories/EditCategoryForm';
import AddHotelForm from '../pages/Admin/Section/Hotels/AddHotelForm';
import HotelList from '../pages/Admin/Section/Hotels/HotelList';
import EditHotelForm from '../pages/Admin/Section/Hotels/EditHotelForm';
import ResetPassword from '../pages/Admin/AdminForgotPassword/ResetPassword';
import ForgotPassword from '../pages/Admin/AdminForgotPassword/ForgotPassword';
import AdminRouter from '../route/AdminRouter';
import AdminBookingTable from '../pages/Admin/Section/AdminBookings/AdminBookingTable';
import AdminLoginRouter from '../route/AdminLoginRoute';
import AdminChatPage from '../pages/Admin/Section/AdminChat/AdminChatPage';
import AddItineraryForm from '../pages/Admin/Section/Itinararies/AddItineraryForm';
import ItineraryListPage from '../pages/Admin/Section/Itinararies/ItineraryListPage';
import AdminBookingDetailPage from '../pages/Admin/Section/AdminBookings/AdminBookingDetailPage';
import AddPackageImage from '../pages/Admin/Section/PackageImages/AddPackageImage';




function AdminWrapper() {
  const routes = useRoutes([
    {
      element: (
        <ThemeProvider>
          <DashboardLayout>
            <AdminRouter>
              <Outlet />
            </AdminRouter>
          </DashboardLayout>
        </ThemeProvider>
      ),
      children: [
        // {element: <AdminLogin/>, index: true },
        {path: "/", element: <h1>Hello</h1>},
        {path: 'index', element: <AppPage /> },
        {path: 'user', element: <UserPage /> },
        {path: 'products', element: <ProductsPage /> },        
        {path: 'AddPackages', element: <AddPackageForm/> },        
        {path: 'AdminPackageList', element: <PackageList/> },        
        {path: 'edit-package/:id', element: <EditPackageForm/> },        
        {path: 'add-category', element: <AddCategoryForm/> },        
        {path: 'categories', element: <CategoryList/> },        
        {path: 'edit-category/:id', element: <EditCategoryForm/> },
        {path: 'AddHotels', element: <AddHotelForm/> },
        {path: 'Hotels', element: <HotelList/> },
        {path: 'edit-hotel/:id', element: <EditHotelForm/> },
        {path: 'booking-table', element: <AdminBookingTable/> },
        {path: 'add-itineraries', element: <AddItineraryForm/> },
        {path: 'Itineraries', element: <ItineraryListPage/> },
        {path: 'AdminBookingDetails/:id', element: <AdminBookingDetailPage/> },
        {path: 'messages', element: <AdminChatPage/> },
        {path: 'AddPackageImages', element: <AddPackageImage/> }


        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      index: true ,
      element: <AdminLoginRouter><LoginPage /> </AdminLoginRouter>,
    },
    {path: 'forgot-password/', element: <ForgotPassword/> },
    {path: 'password-reset/:uid/:token/', element: <ResetPassword/> },
    // {
    //   path: '404',
    //   element: <Page404 />,
    // },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}

export default AdminWrapper
