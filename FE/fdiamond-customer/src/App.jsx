import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from './pages/PageNotFound';


function App() {

    const ProductDetailsPage = React.lazy(() => import("./features/Products/pages/ProductDetailsPage"));
    const CategoryParent = React.lazy(() => import("./features/Products/pages/CategoryParent"));

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product">
                        <Route index element={<Navigate to="/product/diamond" replace />} />
                        <Route path=":category" element={<CategoryParent />} />
                        <Route path="product-details/:productId" element={<ProductDetailsPage />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </>

    );
}

export default App;
