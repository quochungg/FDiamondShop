import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from './pages/PageNotFound';
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './routes/ProtectedRoute';
import GuestRoute from './routes/GuestRoute';
import { LoginPage, RegisterPage, SuccessfulVerificationPage, EmailVerificationPage } from 'src/features/Authentication/index'
import { ProductNotFound } from 'src/features/Products/index';
import { LoadingSpinner } from './components/index';

function App() {

    const CategoryWrapper = React.lazy(() => import("./features/Products/wrapper/CategoryWrapper"));
    const ProductDetailsWrapper = React.lazy(() => import("./features/Products/wrapper/ProductDetailsWrapper"));

    const AccountDetailsPage = React.lazy(() => import("./features/Authentication/pages/AccountDetailsPage"));
    const CartPage = React.lazy(() => import("./features/Order/pages/CartPage"));
    const CheckoutPage = React.lazy(() => import("./features/Order/pages/CheckoutPage"));
    const OrderHistoryPage = React.lazy(() => import("./features/Order/pages/OrderHistoryPage"));
    const OrderDetailsPage = React.lazy(() => import("./features/Order/pages/OrderDetailsPage"));
    const SuccessfulPaymentPage = React.lazy(() => import("./features/Order/pages/SuccessfulPaymentPage"));
    const ProceedToPaypalPage = React.lazy(() => import("./features/Order/pages/ProceedToPaypalPage"));


    return (
        <>
            <Suspense fallback={<LoadingSpinner />}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/product">
                            <Route index element={<Navigate to="/product/diamond" replace />} />
                            <Route path=":category" element={<CategoryWrapper />} />
                            <Route path="product-details/:productId" element={<ProductDetailsWrapper />} />
                        </Route>
                        <Route path='/product-not-found' element={<ProductNotFound />} />
                        <Route />

                        <Route element={<ProtectedRoute />} >
                            <Route path='/cart' element={<CartPage />} />
                            <Route path='/checkout' element={<CheckoutPage />} />
                            <Route path='/account-details' element={<AccountDetailsPage />} />
                            <Route path='/order-history' element={<OrderHistoryPage />} />
                            <Route path='/order-details/:orderId' element={<OrderDetailsPage />} />
                            <Route path='/successful-payment' element={<SuccessfulPaymentPage />} />
                            <Route path='/proceed-to-paypal' element={<ProceedToPaypalPage />} />
                        </Route>

                        <Route element={<GuestRoute />} >
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/register' element={<RegisterPage />} />
                            <Route path='/verified-email' element={<SuccessfulVerificationPage />} />
                            <Route path='/confirm-email-link' element={<EmailVerificationPage />} />
                        </Route>


                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </AuthProvider>
            </Suspense>
        </>

    );
}

export default App;
