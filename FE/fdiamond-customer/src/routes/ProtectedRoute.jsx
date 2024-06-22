import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "src/context/AuthProvider";


const ProtectedRoute = () => {
    const location = useLocation();
    const { token } = useAuth();

    if (!token) {
        return <Navigate to='/login' state={{ previousUrl: location.state.previousUrl }} />
    }
    return <Outlet />

};

export default ProtectedRoute;
