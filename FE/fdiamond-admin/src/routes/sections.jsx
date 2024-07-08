import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import PrivateRoute from 'src/routes/PrivateRoute';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const CategoriesPage = lazy(() => import('src/pages/category'));
export const NewProductPage = lazy(() => import('src/pages/newProduct'));
export const EditProductPage = lazy(() => import('src/pages/EditProduct'));
export const VoucherPage = lazy(() => import('src/pages/voucher'));
export const AccountProfilePage = lazy(() => import('src/pages/profile'));
export const OrderPage = lazy(() => import('src/pages/order'));
export const OrderDetailPage = lazy(() => import('src/pages/orderDetail'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: (
            <PrivateRoute>
              <IndexPage />
            </PrivateRoute>
          ),
          index: true,
        },
        {
          path: '/profile/:userId',
          element: (
            <PrivateRoute>
              <AccountProfilePage />
            </PrivateRoute>
          ),
        },
        {
          path: 'user',
          element: (
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'products',
          element: (
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'category',
          element: (
            <PrivateRoute>
              <CategoriesPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'order',
          element: (
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'order/:orderId',
          element: (
            <PrivateRoute>
              <OrderDetailPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'blog',
          element: (
            <PrivateRoute>
              <BlogPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'voucher',
          element: (
            <PrivateRoute>
              <VoucherPage />
            </PrivateRoute>
          ),
        },
        {
          path: '/products/new',
          element: (
            <PrivateRoute>
              <NewProductPage />
            </PrivateRoute>
          ),
        },
        {
          path: '/edit-product/:id',
          element: (
            <PrivateRoute>
              <EditProductPage />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
