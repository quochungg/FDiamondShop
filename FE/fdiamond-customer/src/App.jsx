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
import { CartPage } from './features/Order/index';

function App() {

    const ProductDetailsPage = React.lazy(() => import("./features/Products/pages/ProductDetailsPage"));
    const CategoryParent = React.lazy(() => import("./features/Products/pages/CategoryParent"));

    return (
        <>
            <Suspense fallback={<LoadingSpinner />}>
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
