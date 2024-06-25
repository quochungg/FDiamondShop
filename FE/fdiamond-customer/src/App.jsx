import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from './pages/PageNotFound';
import { ProductNotFound } from 'src/features/Products/index';
import { LoginPage, RegisterPage } from 'src/features/Authentication/index'
import AuthProvider from './context/AuthProvider';
import CartPage from './features/Order/pages/CartPage';
// import CartItemPage from './features/Order/pages/CartItemPage';
import ProtectedRoute from './routes/ProtectedRoute';
import SuccessfulVerificationPage from './features/Authentication/pages/SuccessfulVerificationPage';
import EmailVerificationPage from './features/Authentication/pages/EmailVerificationPage';
import GuestRoute from './routes/GuestRoute';

function App() {

    const ProductDetailsPage = React.lazy(() => import("./features/Products/pages/ProductDetailsPage"));
    const CategoryParent = React.lazy(() => import("./features/Products/pages/CategoryParent"));

    // loginAPI().then(res => { console.log(res) })

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/product">
                            <Route index element={<Navigate to="/product/diamond" replace />} />
                            <Route path=":category" element={<CategoryParent />} />
                            <Route path="product-details/:productId" element={<ProductDetailsPage />} />
                        </Route>
                        <Route path='/product-not-found' element={<ProductNotFound />} />
                        <Route />

                        {/* 
                        <Route path='/cart' element={
                            <ProtectedRoute>
                                <CartPage />
                            </ProtectedRoute>
                        } /> */}

                        <Route element={<ProtectedRoute />} >
                            <Route path='/cart' element={<CartPage />} />
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
