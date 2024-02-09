import React, { lazy } from 'react'
import { Outlet, useRoutes } from 'react-router-dom';
import AdminLogin from '../pages/Admin/AdminLogin';
import ThemeProvider from '../pages/Admin/MIUI/ThemeWagon';
import DashboardLayout from '../pages/Admin/AdminIndex';
import UserPage from '../pages/Admin/user'
import AppPage from '../pages/Admin/App'
import LoginPage from '../pages/Admin/App'
import ProductsPage from '../pages/Admin/products';
import AddPackageForm from '../pages/Admin/Section/products/view/AddPackageForm';


// export const IndexPage = lazy(() => import('../pages/Admin/App'));
// export const UserPage = lazy(() => import('../pages/Admin/user'));
// export const ProductsPage = lazy(() => import('../pages/Admin/products'));
// export const LoginPage = lazy(() => import('../pages/Admin/login'));


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
