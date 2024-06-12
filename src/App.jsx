import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
// import SearchResultPage, { Category } from "./features/Products/pages/SearchResultPage";
import { Category } from "./features/Products/pages/SearchResultPage";



function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product">
                    <Route index element={<Navigate to="/product/diamond" replace />} />
                    <Route path=":category" element={<Category />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default App;
