import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from 'src/context/AuthProvider';
import ProtectedRoute from 'src/routes/ProtectedRoute';
import GuestRoute from 'src/routes/GuestRoute';
import { LoadingSpinner } from 'src/components/index';

function App() {

    //General pages
    const Home = React.lazy(() => import("src/pages/Home"));

    //Wrapper components
    const CategoryWrapper = React.lazy(() => import("src/features/Products/wrapper/CategoryWrapper"));
    const ProductDetailsWrapper = React.lazy(() => import("src/features/Products/wrapper/ProductDetailsWrapper"));

    //Product pages
    const SearchBarPage = React.lazy(() => import("src/features/Products/pages/SearchBarPage"));

    //Authentication pages
    const LoginPage = React.lazy(() => import("src/features/Authentication/pages/LoginPage"));
    const RegisterPage = React.lazy(() => import("src/features/Authentication/pages/RegisterPage"));
    const SuccessfulVerificationPage = React.lazy(() => import("src/features/Authentication/pages/SuccessfulVerificationPage"));
    const EmailVerificationPage = React.lazy(() => import("src/features/Authentication/pages/EmailVerificationPage"));
    const AccountDetailsPage = React.lazy(() => import("src/features/Authentication/pages/AccountDetailsPage"));

    //Order pages
    const CartPage = React.lazy(() => import("src/features/Order/pages/Cart/CartPage"));
    const CheckoutPage = React.lazy(() => import("src/features/Order/pages/Order/Checkout/CheckoutPage"));
    const SuccessfulPaymentPage = React.lazy(() => import("src/features/Order/pages/Order/Checkout/SuccessfulPaymentPage"));
    const FailedPaymentPage = React.lazy(() => import("src/features/Order/pages/Order/Checkout/FailedPaymentPage"));
    const ProceedToPaypalPage = React.lazy(() => import("src/features/Order/pages/Order/Checkout/ProceedToPaypalPage"));
    const OrderHistoryPage = React.lazy(() => import("src/features/Order/pages/Order/OrderHistory/OrderHistoryPage"));
    const OrderDetailsPage = React.lazy(() => import("src/features/Order/pages/Order/OrderHistory/OrderDetailsPage"));
    const DiscountListPage = React.lazy(() => import("src/features/Order/pages/Discount/DiscountListPage"));

    //Error pages
    const PageNotFound = React.lazy(() => import("src/pages/PageNotFound"))
    const ProductNotFound = React.lazy(() => import("src/features/Products/pages/ProductNotFound"))
    const OrderNotFound = React.lazy(() => import("src/features/Order/pages/Order/OrderHistory/OrderNotFound"))
    const NoContentPage = React.lazy(() => import("src/pages/NoContentPage"))

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
                        <Route path="/search" element={<SearchBarPage />} />
                        <Route path='/promo-code' element={<DiscountListPage />} />

                        <Route path='no-content' element={<NoContentPage />} />
                        <Route path='/product-not-found' element={<ProductNotFound />} />
                        <Route path='/order-not-found' element={<OrderNotFound />} />
                        <Route />



                        <Route element={<ProtectedRoute />} >
                            <Route path='/account-details' element={<AccountDetailsPage />} />
                            <Route path='/cart' element={<CartPage />} />
                            <Route path='/checkout' element={<CheckoutPage />} />
                            <Route path='/successful-payment' element={<SuccessfulPaymentPage />} />
                            <Route path='/failed-payment' element={<FailedPaymentPage />} />
                            <Route path='/proceed-to-paypal' element={<ProceedToPaypalPage />} />
                            <Route path='/order-history' element={<OrderHistoryPage />} />
                            <Route path='/order-details/:orderId' element={<OrderDetailsPage />} />
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
