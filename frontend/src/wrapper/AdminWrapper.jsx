import React, { lazy } from 'react'
import { Outlet, useRoutes } from 'react-router-dom';
import ThemeProvider from '../pages/Admin/MIUI/ThemeWagon';
import DashboardLayout from '../pages/Admin/AdminIndex';

export const IndexPage = lazy(() => import('../pages/Admin/App'));
export const UserPage = lazy(() => import('../pages/Admin/user'));
export const ProductsPage = lazy(() => import('../pages/Admin/products'));
export const LoginPage = lazy(() => import('../pages/Admin/login'));


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
        {path: 'index', element: <IndexPage /> },
        {path: 'user', element: <UserPage /> },
        {path: 'products', element: <ProductsPage /> },
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
