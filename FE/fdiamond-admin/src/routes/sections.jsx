import { lazy, Suspense, useContext } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import PrivateRoute from 'src/routes/PrivateRoute';

import DashboardLayout from 'src/layouts/dashboard';
import { AccountContext } from 'src/_mock/AccountContext';

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
export const NewStaffPage = lazy(() => import('src/pages/creatNewStaff'));
export const DeliveryOrderPage = lazy(() => import('src/pages/deliveryOrderPage'));

const Router = () => {
  const { account } = useContext(AccountContext);

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
        account.role === 'admin' && [
          {
            path: '/profile/:userId',
            element: (
              <PrivateRoute>
                <AccountProfilePage />
              </PrivateRoute>
            ),
          },
          {
            path: 'staff',
            element: (
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            ),
          },
          {
            path: 'staff/new',
            element: (
              <PrivateRoute>
                <NewStaffPage />
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
            path: 'discountCode',
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
        account.role === 'deliverystaff' && [
          {
            path: 'order-delivery',
            element: (
              <PrivateRoute>
                <DeliveryOrderPage />
              </PrivateRoute>
            ),
          },
        ],
      ].flat(),
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
};

export default Router;
