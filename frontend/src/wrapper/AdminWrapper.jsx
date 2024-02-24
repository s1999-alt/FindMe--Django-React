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



function AdminWrapper() {
  const routes = useRoutes([
    {
      element: (
        <ThemeProvider>
          <DashboardLayout>
            <Outlet />
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


        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      index: true ,
      element: <LoginPage />,
    },
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
