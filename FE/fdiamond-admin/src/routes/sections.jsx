import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect, useContext } from 'react';

import PrivateRoute from 'src/routes/PrivateRoute';

import DashboardLayout from 'src/layouts/dashboard';
import { AccountContext } from 'src/_mock/AccountContext';

const IndexPage = lazy(() => import('src/pages/app'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const LoginPage = lazy(() => import('src/pages/login'));
const ProductsPage = lazy(() => import('src/pages/products'));
const Page404 = lazy(() => import('src/pages/page-not-found'));
const CategoriesPage = lazy(() => import('src/pages/category'));
const NewProductPage = lazy(() => import('src/pages/newProduct'));
const EditProductPage = lazy(() => import('src/pages/EditProduct'));
const VoucherPage = lazy(() => import('src/pages/voucher'));
const AccountProfilePage = lazy(() => import('src/pages/profile'));
const OrderPage = lazy(() => import('src/pages/order'));
const OrderDetailPage = lazy(() => import('src/pages/orderDetail'));
const NewStaffPage = lazy(() => import('src/pages/creatNewStaff'));
const DeliveryOrderPage = lazy(() => import('src/pages/deliveryOrderPage'));
const OrderStaffPage = lazy(() => import('src/pages/orderStaffPage'));
const AssignToDeliveryPage = lazy(() => import('src/pages/assignToDeliveryPage'));
const DeliveryOrderDetailPage = lazy(() => import('src/pages/deliveryOrderDetailPage'));

const Router = () => {
  const { account } = useContext(AccountContext);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const newRoutes = [
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
            path: '/',
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
          ...(account.role === 'admin'
            ? [
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
              ]
            : []),
          ...(account.role === 'deliverystaff'
            ? [
                {
                  path: 'order-delivery',
                  element: (
                    <PrivateRoute>
                      <DeliveryOrderPage />
                    </PrivateRoute>
                  ),
                },
                {
                  path: 'order-delivery/:orderId',
                  element: (
                    <PrivateRoute>
                      <DeliveryOrderDetailPage />
                    </PrivateRoute>
                  ),
                },
              ]
            : []),
          ...(account.role === 'ordermanagementstaff'
            ? [
                {
                  path: 'order-prepare',
                  element: (
                    <PrivateRoute>
                      <OrderStaffPage />
                    </PrivateRoute>
                  ),
                },
                {
                  path: 'order-prepare/:orderId',
                  element: (
                    <PrivateRoute>
                      <AssignToDeliveryPage />
                    </PrivateRoute>
                  ),
                },
              ]
            : []),
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
    ];
    setRoutes(newRoutes);
  }, [account.role]);

  const routing = useRoutes(routes);

  return routing;
};

export default Router;
